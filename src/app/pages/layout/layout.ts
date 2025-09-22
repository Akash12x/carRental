import { Component, inject, OnInit } from '@angular/core';
import { RedirectCommand, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { BookingService } from '../../services/booking-service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit {
  router = inject(Router);
  userDetails = inject(BookingService);
  username = '';
  ngOnInit(): void {
    this.userDetails.username.subscribe((res) => {
      this.username = res ?? 'Guest';
    });
  }

  onLogout() {
    this.userDetails.username.next(null);
    this.router.navigateByUrl('/');
  }
}
