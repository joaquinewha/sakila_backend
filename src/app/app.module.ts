import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { FilmComponent } from './film/film.component';
import { HttpClientModule } from '@angular/common/http';
import { InventoryComponent } from './inventory/inventory.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FilmCarritoComponent } from './film-carrito/film-carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    FilmComponent,
    InventoryComponent,
    HomeComponent,
    RegistroComponent,
    LoginComponent,
    CarritoComponent,
    FilmCarritoComponent
  ],  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
