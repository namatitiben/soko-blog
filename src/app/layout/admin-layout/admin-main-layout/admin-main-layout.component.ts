import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-main-layout',
  templateUrl: './admin-main-layout.component.html',
  styleUrls: ['./admin-main-layout.component.scss']
})
export class AdminMainLayoutComponent implements OnInit {
  user: any;
  constructor(private router: Router) {}

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  /**
   * Logout function
   */
  logout() {
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigate(['/admin']);
  }
}
