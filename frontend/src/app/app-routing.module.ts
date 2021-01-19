import { LoginComponent } from './login/login.component';
import { ReceitasComponent } from './body/receitas/receitas.component';
import { EditarReceitaComponent } from './body/receitas/editar-receita/editar-receita.component';
import { CriarReceitaComponent } from './body/receitas/criar-receita/criar-receita.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceitaComponent } from './body/receitas/receita/receita.component';

const routes: Routes = [
  { path: 'receitas', component: ReceitasComponent },
  { path: 'receita/:id', component: ReceitaComponent },
  { path: 'criarReceita', component: CriarReceitaComponent },
  { path: 'editarReceita/:id', component: EditarReceitaComponent },
  { path: 'login', component: LoginComponent },
  {path: '', redirectTo: '/receitas', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
