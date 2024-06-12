import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarExamenPage } from './buscar-examen.page';

describe('BuscarExamenPage', () => {
  let component: BuscarExamenPage;
  let fixture: ComponentFixture<BuscarExamenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarExamenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
