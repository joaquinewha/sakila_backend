import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsCarritoService } from '../films-carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  //@Input() data:any=[];

  public filmscarrito:any= []

  public aux:string | undefined;

  public total:Number | undefined;


  constructor(private route:ActivatedRoute, private FilmToCarrito:FilmsCarritoService,private ngZone: NgZone) { }
  

  ngOnInit(): void {
    this.FilmToCarrito.disparadorCarrito.subscribe(data =>{
      this.ngZone.run(()=>{
        
        this.filmscarrito=[1,2]
      })
    })
    this.filmscarrito=this.FilmToCarrito.carrito;
    console.log("Valor de films ",this.filmscarrito);

    this.route.paramMap.subscribe( (paramMap:any) =>{
      const {params} = paramMap
      this.aux=params.country;
      console.log(params.country);
    });
    this.total=this.Total();
  }
  public getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  public Total(){
    let sum = 0;
    console.log(this.filmscarrito.data);
    for (let film of this.filmscarrito) {
      sum=sum+film.data.rental_rate
    }
    return sum;
  }

  /*public descuento(sumtotal: Number){
    let des = 0;
    if(sumtotal>=10.0 && sumtotal<15.0){
      des=sumtotal/10;
    }
    else{
      if(sumtotal>15.0 && sumtotal<20.0)(
        des=sumtotal/10;
      )
      else{
        des=sumtotal/15;
      }
    }
  }*/

}
