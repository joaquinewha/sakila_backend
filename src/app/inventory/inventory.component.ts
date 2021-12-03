import { CarritoComponent } from './../carrito/carrito.component';
import { RestService } from './../rest.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilmsCarritoService } from '../films-carrito.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  public films:any= []
  public NewFilms:any= []
  public HorrorFilms:any= []
  public Sci_FiFilms:any= []

  public formulario!: FormGroup;

  public options: any[] | undefined;
  public selected:string | undefined;

  public aux:string | undefined;

  public carrito:any= [];

  public filmscarrito:any= []

  constructor(private route:ActivatedRoute, private RestService:RestService, private formBuilder: FormBuilder, private FilmToCarrito:FilmsCarritoService, private router:Router) { }

  ngOnInit(): void {

    this.FilmToCarrito.disparadorCarrito.subscribe(data =>{
        //console.log("Reciviendo la data ",data);
        
        console.log(this.carrito,"Tamaño de el carrito",this.carrito.length)
        if(this.carrito.length==4){
          console.log("Tamaño maximo del carrito alcanzado, no se puede agregar mas peliculas")
        }else{
          this.carrito.push(data);
        }
      }
    )
    
    this.options=[
      {
        value: "name_film",
        Option: "Title"
      },
      {
        value: "name_actor",
        Option: "Actor"
      }
    ]
    this.selected="name_film";
    

    this.formulario = this.formBuilder.group({
      busqueda: ['',Validators.required]
    });

    this.route.paramMap.subscribe( (paramMap:any) =>{
      const {params} = paramMap
      this.aux=params.country;
      console.log(params.country);
      this.ObtenerDatos(params.country);
      this.PeliculasMasNuevas(params.country);
      this.PeliculasHorror(params.country);
      this.PeliculaSciFi(params.country);
    });
    
  }

  public ObtenerDatos(country:string){
    this.RestService.get("http://localhost:3000/store/"+country+"/inventory/film")
    .subscribe(respuesta => {
      this.films =respuesta;
    })
  }

  public PeliculasMasNuevas(country:string){
    this.RestService.get("http://localhost:3000/store/"+country+"/inventory/film/new")
    .subscribe(respuesta => {
      this.NewFilms =respuesta;
    })
  }
  

  public PeliculasHorror(country:string){
    this.RestService.get("http://localhost:3000/store/"+country+"/inventory/film/category/Horror")
    .subscribe(respuesta => {
      this.HorrorFilms =respuesta;
    })
  }

  public PeliculaSciFi(country:string){
    this.RestService.get("http://localhost:3000/store/"+country+"/inventory/film/category/Sci-Fi")
    .subscribe(respuesta => {
      this.Sci_FiFilms =respuesta;
    })
  }

  public Busqueda(){    
    this.RestService.get("http://localhost:3000/store/"+this.aux+"/inventory/film?"+this.selected+"="+this.formulario.value.busqueda)
    .subscribe(respuesta =>{
      this.films =respuesta;
    })
  }
  public MandarDataCarrito(){

    this.FilmToCarrito.carrito=this.carrito;
    console.log("dato mandado "+this.carrito)
    this.router.navigate(['/', 'store',this.aux,'carrito' ])
  }

}
