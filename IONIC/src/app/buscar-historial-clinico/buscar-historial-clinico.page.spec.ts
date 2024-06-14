import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarHistorialClinicoPage } from './buscar-historial-clinico.page';

describe('BuscarHistorialClinicoPage', () => {
  let component: BuscarHistorialClinicoPage;
  let fixture: ComponentFixture<BuscarHistorialClinicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarHistorialClinicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
