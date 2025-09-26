import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Credito } from '../models/credito.model';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  private readonly apiUrl = 'http://localhost:8080/api/creditos';

  constructor(private http: HttpClient) { }

  
  buscarPorNumeroNfse(numeroNfse: string): Observable<Credito[]> {
    return this.http.get<Credito[]>(`${this.apiUrl}/${numeroNfse}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  buscarPorNumeroCredito(numeroCredito: string): Observable<Credito> {
    return this.http.get<Credito>(`${this.apiUrl}/credito/${numeroCredito}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  buscarPorTipoCredito(tipoCredito: string): Observable<Credito[]> {
    return this.http.get<Credito[]>(`${this.apiUrl}/tipo/${tipoCredito}`)
      .pipe(
        catchError(this.handleError)
      );
  }

 
  verificarExistenciaCredito(numeroCredito: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/existe/${numeroCredito}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  healthCheck(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/health`)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
   
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      
      if (error.status === 404) {
        errorMessage = 'Nenhum resultado encontrado para a consulta';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || 'Dados inválidos fornecidos';
      } else if (error.status === 500) {
        errorMessage = 'Erro interno do servidor';
      } else {
        errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}