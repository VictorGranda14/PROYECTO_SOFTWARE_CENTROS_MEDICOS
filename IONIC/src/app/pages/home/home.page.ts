import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface ReservedHour {
  day: string;
  time: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  reservedHours: ReservedHour[] = [
    { day: 'Miércoles 10', time: '3:45' },
    { day: 'Jueves 23', time: '1:30' },
    { day: 'Lunes 30', time: '4:30' }
  ];

  constructor(private router: Router) { }

  ngOnInit() { }

  cancelReservation(index: number) {
    this.reservedHours.splice(index, 1);
  }

  navigateToPage(page: string) {
    localStorage.removeItem('token');
    this.router.navigate([page]);
  }
}
