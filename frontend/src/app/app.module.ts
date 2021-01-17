import { CriarReceitaComponent } from './body/receitas/criar-receita/criar-receita.component';
import { ReceitasComponent } from './body/receitas/receitas.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/services/login.service';
import { CriarReceitaService } from './body/receitas/services/criar-receita.service';
import { ReceitaComponent } from './body/receitas/receita/receita.component';

import { HttpClientModule } from '@angular/common/http';
import { EditarReceitaComponent } from './body/receitas/editar-receita/editar-receita.component';

@NgModule({
  declarations: [			
    AppComponent,
    HeaderComponent,
      BodyComponent,
      ReceitasComponent,
      ReceitaComponent,
      CriarReceitaComponent,
      EditarReceitaComponent,
      LoginComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LoginService, CriarReceitaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
