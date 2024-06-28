import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() homeRoute: string = '/home';
  userName: string = '';

  constructor(private router: Router) {}

  ngOnInit() {}
  
  navigateToPage(page: string) {
    if (page === '/login') {
      localStorage.removeItem('token');
    } else if (page === 'home') {
      this.router.navigate([this.homeRoute]);
      return;
    }
    this.router.navigate([page]);
  }
}
