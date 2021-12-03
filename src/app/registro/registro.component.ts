import { ActivatedRoute } from '@angular/router';
import { RestService } from './../rest.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public citys: any = [];
  public country: any = [];
  public address: any = [];

  public selected:string | undefined;
  public formulario!: FormGroup;


  public hoy = new Date();
  public fecha = this.hoy.getFullYear() + '-' + ( this.hoy.getMonth() + 1 ) + '-' + this.hoy.getDate();
  public  hora = this.hoy.getHours() + ':' + this.hoy.getMinutes() + ':' + this.hoy.getSeconds();
  public fechaYHora = this.fecha + ' ' + this.hora;

  constructor(private route:ActivatedRoute, private formBuilder: FormBuilder, private RestService:RestService) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      email: ['',Validators.required, Validators.email],
      city_id: ['', Validators.required],
      adress: ['',Validators.required],
      adress2: ['',],
      district: ['',Validators.required],
      postal_code:['',Validators.required, Validators.maxLength(5)],
      phone: ['',Validators.required],
    });

    this.route.paramMap.subscribe( (paramMap:any) =>{
      const {params} = paramMap
      console.log(params.country);
      this.ObtenerCity(params.country);
      this.BuscarCountrybyName(params.country);
      this.ObtenerAddress();
    });
    this.selected=this.citys.city;
  }

  public ObtenerCity(country:string){
    this.RestService.get("http://localhost:3000/store/"+country+"/city")
    .subscribe(respuesta => {
      this.citys = respuesta;
    })
  }
  public ObtenerAddress(){
    this.RestService.get("http://localhost:3000/address")
    .subscribe(respuesta => {
      this.address = respuesta;
    })
  }
  public BuscarCountrybyName(name:string){
    this.RestService.get("http://localhost:3000/store/"+name)
    .subscribe(respuesta => {
      this.country = respuesta;
    })
  }
  public CrearCliente(){  
    this.CrearNewAddress();    
    this.CrearNewCustomer();
    this.formulario.reset;    
  }

  public CrearNewAddress(){
    this.RestService.post("http://localhost:3000/store/"+this.country.country+"/address",
    {
      address:this.formulario.value.adress,
      address2:this.formulario.value.adress2,
      district:this.formulario.value.district,
      city_id:this.selected,
      postal_code:this.formulario.value.postal_code,
      phone:this.formulario.value.phone,
      last_update:this.fechaYHora,
      location:[
          {
              x: "153.1913094",
              y: "-27.6333373"
          }
      ]
  }
    )
    .subscribe(respuesta => {
      console.log("Direccion Registrado")  
    })
  
  }

  public CrearNewCustomer(){
    this.RestService.post("http://localhost:3000/store/"+this.country.country+"/customer",
    {
      store_id: this.country[0].store_id,
      first_name: this.formulario.value.first_name,
      last_name: this.formulario.value.first_name, 
      adress_id: this.address[0].address_id+1,   
      active: "1",
      create_date: this.fechaYHora,
      last_update: this.fechaYHora
    }
    )
    .subscribe(respuesta => { 
      console.log("Cliente Registrado")    
    })
  }

}
