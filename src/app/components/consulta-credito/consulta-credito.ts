import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreditoService } from '../../services/credito.service';
import { Credito } from '../../models/credito.model';

@Component({
  selector: 'app-consulta-credito',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './consulta-credito.html',
  styleUrl: './consulta-credito.scss'
})
export class ConsultaCreditoComponent implements OnInit {
  consultaForm: FormGroup;
  creditos: Credito[] = [];
  loading = false;
  errorMessage = '';

  displayedColumns: string[] = [
    'numeroCredito',
    'numeroNfse',
    'dataConstituicao',
    'tipoCredito',
    'valorIssqn',
    'simplesNacional',
    'aliquota',
    'valorFaturado',
    'valorDeducao',
    'baseCalculo'
  ];

  constructor(
    private fb: FormBuilder,
    private creditoService: CreditoService
  ) {
    this.consultaForm = this.fb.group({
      tipoConsulta: ['', Validators.required],
      numeroConsulta: ['']
    });
  }

  ngOnInit(): void {
  
    this.consultaForm.get('tipoConsulta')?.valueChanges.subscribe((tipoConsulta) => {
      this.limparResultados();
      this.consultaForm.get('numeroConsulta')?.setValue('');
      
      
      const numeroConsultaControl = this.consultaForm.get('numeroConsulta');
      if (tipoConsulta && tipoConsulta !== '') {
        numeroConsultaControl?.setValidators([Validators.required, Validators.minLength(1)]);
      } else {
        numeroConsultaControl?.clearValidators();
      }
      numeroConsultaControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.consultaForm.valid) {
      this.realizarConsulta();
    }
  }

  private realizarConsulta(): void {
    const tipoConsulta = this.consultaForm.get('tipoConsulta')?.value;
    const numeroConsulta = this.consultaForm.get('numeroConsulta')?.value?.trim();

    this.loading = true;
    this.errorMessage = '';
    this.creditos = [];

    if (tipoConsulta === 'nfse') {
      this.consultarPorNfse(numeroConsulta);
    } else if (tipoConsulta === 'credito') {
      this.consultarPorCredito(numeroConsulta);
    } else if (tipoConsulta === 'tipo') {
      this.consultarPorTipo(numeroConsulta);
    }
  }

  private consultarPorNfse(numeroNfse: string): void {
    this.creditoService.buscarPorNumeroNfse(numeroNfse).subscribe({
      next: (creditos) => {
        this.creditos = creditos;
        this.loading = false;
        if (creditos.length === 0) {
          this.errorMessage = 'Nenhum crédito encontrado para a NFS-e informada.';
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message || 'Erro ao consultar créditos por NFS-e.';
        console.error('Erro na consulta por NFS-e:', error);
      }
    });
  }

  private consultarPorCredito(numeroCredito: string): void {
    this.creditoService.buscarPorNumeroCredito(numeroCredito).subscribe({
      next: (credito) => {
        this.creditos = [credito];
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message || 'Erro ao consultar crédito.';
        console.error('Erro na consulta por crédito:', error);
      }
    });
  }

  private consultarPorTipo(tipoCredito: string): void {
    this.creditoService.buscarPorTipoCredito(tipoCredito).subscribe({
      next: (creditos) => {
        this.creditos = creditos;
        this.loading = false;
        if (creditos.length === 0) {
          this.errorMessage = 'Nenhum crédito encontrado para o tipo informado.';
        }
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message || 'Erro ao consultar créditos por tipo.';
        console.error('Erro na consulta por tipo:', error);
      }
    });
  }

  limparConsulta(): void {
    this.consultaForm.reset();
    this.limparResultados();
  }

  private limparResultados(): void {
    this.creditos = [];
    this.errorMessage = '';
  }

  getTipoConsultaLabel(): string {
    const tipoConsulta = this.consultaForm.get('tipoConsulta')?.value;
    switch (tipoConsulta) {
      case 'nfse':
        return 'Número da NFS-e';
      case 'credito':
        return 'Número do Crédito';
      case 'tipo':
        return 'Tipo de Crédito';
      default:
        return 'Número';
    }
  }

  getTipoConsultaPlaceholder(): string {
    const tipoConsulta = this.consultaForm.get('tipoConsulta')?.value;
    switch (tipoConsulta) {
      case 'nfse':
        return 'Digite o número da NFS-e';
      case 'credito':
        return 'Digite o número do crédito';
      case 'tipo':
        return 'Selecione o tipo de crédito';
      default:
        return 'Selecione o tipo de consulta primeiro';
    }
  }

  formatDate(data: string): string {
    if (!data) return '';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  }

  formatCurrency(valor: number): string {
    if (valor === null || valor === undefined) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  formatPercentage(valor: number): string {
    if (valor === null || valor === undefined) return '0,00%';
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(valor / 100);
  }
}
