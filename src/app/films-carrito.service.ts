import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilmsCarritoService {
  @Output() disparadorCarrito:EventEmitter<any> = new EventEmitter()
  constructor() { }
  carrito:any;  
}
