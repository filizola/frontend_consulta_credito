import { Routes } from '@angular/router';
import { ConsultaCreditoComponent } from './components/consulta-credito/consulta-credito';

export const routes: Routes = [
  { path: '', component: ConsultaCreditoComponent },
  { path: 'consulta', component: ConsultaCreditoComponent },
  { path: '**', redirectTo: '' }
];
