import { RestService } from './../rest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public stores:any= []

  constructor(private RestService:RestService) { }


  ngOnInit(): void {
    this.ObtenerDatos();    
  }

  public ObtenerDatos(){
    this.RestService.get("http://localhost:3000/store")
    .subscribe(respuesta => {
      this.stores =respuesta;
      console.log(respuesta);
    })
  }

}
