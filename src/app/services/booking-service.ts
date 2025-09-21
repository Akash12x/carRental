import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../model/car';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private _http: HttpClient) {}

  getAllBookings() {
    return this._http.get<APIResponse>(
      'https://freeapi.miniprojectideas.com/api/CarRentalApp/geAllBookings'
    );
  }

  getAllCars() {
    return this._http.get<APIResponse>(
      'https://freeapi.miniprojectideas.com/api/CarRentalApp/GetCars'
    );
  }
}
