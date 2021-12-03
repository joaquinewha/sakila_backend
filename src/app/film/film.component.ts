import { Component, OnInit, Input } from '@angular/core';
import { FilmsCarritoService } from '../films-carrito.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  @Input() data:any;

  public image:string | undefined;
  public aux:Number= 0;

  public high=Math.round(this.getRandomArbitrary(200,150));
  public width=Math.round(this.getRandomArbitrary(200,150))

  
  constructor(private FilmToCarrito:FilmsCarritoService) { }

  ngOnInit(): void {
    this.image = "https://picsum.photos/"+this.high+"/"+this.width
  }
  
  public MandarData(){
    this.aux=1;
    this.FilmToCarrito.disparadorCarrito.emit({
      data:this.data
    })
  }
  public getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }


}
