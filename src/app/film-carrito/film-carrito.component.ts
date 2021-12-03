import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-film-carrito',
  templateUrl: './film-carrito.component.html',
  styleUrls: ['./film-carrito.component.css']
})
export class FilmCarritoComponent implements OnInit {
  @Input() data:any;

  public image:string | undefined;
  
  public high=Math.round(this.getRandomArbitrary(200,150));
  public width=Math.round(this.getRandomArbitrary(200,150))

  constructor() { }

  ngOnInit(): void{ 
    this.image = "https://picsum.photos/"+this.high+"/"+this.width
  }

  public getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
