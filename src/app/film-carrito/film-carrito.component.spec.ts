import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCarritoComponent } from './film-carrito.component';

describe('FilmCarritoComponent', () => {
  let component: FilmCarritoComponent;
  let fixture: ComponentFixture<FilmCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmCarritoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
