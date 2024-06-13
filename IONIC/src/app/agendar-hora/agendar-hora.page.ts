import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendar-hora',
  templateUrl: './agendar-hora.page.html',
  styleUrls: ['./agendar-hora.page.scss'],
})
export class AgendarHoraPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  navigateToPage(page: string) {
    this.router.navigate([page]);
  }
}
