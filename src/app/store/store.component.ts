import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {  

  @Input() data:any;

  public high=Math.round(this.getRandomArbitrary(250,200));
  public width=Math.round(this.getRandomArbitrary(250,200))
 
  public image:string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.image = "https://picsum.photos/"+this.high+"/"+this.width+""      
  }

  public getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

}
