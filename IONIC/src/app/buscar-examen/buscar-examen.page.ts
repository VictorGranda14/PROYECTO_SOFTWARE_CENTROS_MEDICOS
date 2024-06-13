import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-examen',
  templateUrl: './buscar-examen.page.html',
  styleUrls: ['./buscar-examen.page.scss'],
})
export class BuscarExamenPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  navigateToPage(page: string) {
    this.router.navigate([page]);
  }
}
