import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../model/car';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  apiURL: string = 'https://freeapi.miniprojectideas.com/api/CarRentalApp/';
  username = new BehaviorSubject<string | null>(null);
  constructor(private _http: HttpClient) {}

  getAllBookings() {
    return this._http.get<APIResponse>(this.apiURL + 'geAllBookings');
  }

  getAllCars() {
    return this._http.get<APIResponse>(this.apiURL + 'GetCars');
  }

  deleteBookingById(ID: string) {
    return this._http.delete<APIResponse>(this.apiURL + 'DeletBookingById?id=' + ID);
  }

  createNewBooking(obj: any) {
    return this._http.post<APIResponse>(this.apiURL + 'CreateNewBooking', obj);
  }
}
