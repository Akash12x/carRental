import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking-service';
import { APIResponse } from '../../model/car';

@Component({
  selector: 'app-booking',
  standalone: true, // 👈 important
  imports: [CommonModule, ReactiveFormsModule], // 👈 include here
  templateUrl: './booking.html',
  styleUrls: ['./booking.css'],
})
export class Booking implements OnInit {
  bookingService = inject(BookingService);
  bookingList: any = [];
  carList: any = [];
  bookingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      customerName: ['', Validators.required],
      customerCity: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      carId: ['', Validators.required],
      discount: [0],
      bookingDate: ['', Validators.required],
      totalBillAmount: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe((res: APIResponse) => {
      this.bookingList = res.data;
    });
    this.bookingService.getAllCars().subscribe((res: APIResponse) => {
      this.carList = res.data;
    });
  }

  onSaveBooking() {}

  onDelete(event: any) {
    console.log(event);
  }
}
