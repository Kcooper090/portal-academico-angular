import { Routes } from '@angular/router';
import { Cursos } from './cursos/cursos';
import { Dashboard } from './dashboard/dashboard';
import { Notas } from './notas/notas';
import { Alunos } from './alunos/alunos';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'notas', component: Notas },   
  { path: 'cursos', component: Cursos },
  { path: 'alunos', component: Alunos },
];