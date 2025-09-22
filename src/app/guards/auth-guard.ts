import { CanActivateFn, Router } from '@angular/router';
import { BookingService } from '../services/booking-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let userDetails = inject(BookingService);
  const username = userDetails.username.getValue();
  if (!username) {
    // alert('You must log in to access this page');
    router.navigateByUrl('/');
    return false;
  }
  return true;
};
