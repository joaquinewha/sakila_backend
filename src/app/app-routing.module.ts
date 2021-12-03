import { CarritoComponent } from './carrito/carrito.component';
import { FilmCarritoComponent } from './film-carrito/film-carrito.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { StoreComponent } from './store/store.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'store/:country/inventory',
    component:InventoryComponent
  },
  {
    path:'store/:country/customer',
    component:RegistroComponent
  },
  {
    path:'store/:country/login',
    component:LoginComponent
  },
  {
    path:'store/:country/carrito',
    component:CarritoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
