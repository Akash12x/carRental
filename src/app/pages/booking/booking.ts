import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking-service';
import { APIResponse, BookingResponse, CarReponse } from '../../model/car';

@Component({
  selector: 'app-booking',
  standalone: true, // 👈 important
  imports: [CommonModule, ReactiveFormsModule], // 👈 include here
  templateUrl: './booking.html',
  styleUrls: ['./booking.css'],
})
export class Booking implements OnInit {
  bookingService = inject(BookingService);
  bookingList: BookingResponse[] = [];
  carList: CarReponse[] = [];
  bookingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      customerName: ['', Validators.required],
      customerCity: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      carId: [0, Validators.required],
      discount: [0],
      bookingDate: ['', Validators.required],
      totalBillAmount: [0, Validators.required],
      bookingId: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getbookingList();
    this.getCarList();
  }

  onSaveBooking() {
    const formValue = this.bookingForm.value;
    formValue.carId = Number(formValue.carId);
    this.bookingService.createNewBooking(formValue).subscribe({
      next: (res: APIResponse) => {
        alert(res.message);
        this.getbookingList();
      },
      error: (err: APIResponse) => alert(err.message),
    });
  }

  onDelete(event: BookingResponse) {
    this.bookingService.deleteBookingById(event.bookingId.toString()).subscribe({
      next: (res: APIResponse) => {
        alert('Booking successfully deleted');
        this.getbookingList();
      },
      error: (err) => alert(err),
    });
  }

  getbookingList() {
    this.bookingService.getAllBookings().subscribe((res: APIResponse) => {
      this.bookingList = res.data;
    });
  }

  getCarList() {
    this.bookingService.getAllCars().subscribe((res: APIResponse) => {
      this.carList = res.data;
    });
  }
}
