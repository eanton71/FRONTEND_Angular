import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';


/**
 * Decorador 
 */
@NgModule({
  //Lista de componentes, directivas, ...
  declarations: [
    AppComponent,
    ProductListComponent,
    TopBarComponent

  ],
  //carga de los modulos que se usaran
  imports: [
    BrowserModule,
    AppRoutingModule,   
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
