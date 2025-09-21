import { Component, inject, OnInit } from '@angular/core';
import { APIResponse, carModel } from '../../model/car';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vehicles',
  imports: [FormsModule],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css',
})
export class Vehicles implements OnInit {
  newCarObj: carModel;
  http = inject(HttpClient);
  carList: carModel[] = [];

  constructor() {
    this.newCarObj = new carModel();
  }

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars() {
    this.http
      .get<APIResponse>('https://freeapi.miniprojectideas.com/api/CarRentalApp/GetCars')
      .subscribe({
        next: (res: APIResponse) => {
          this.carList = res.data;
        },
        error: (err) => {
          alert(err);
        },
      });
  }

  onSaveCar() {
    this.http
      .post<APIResponse>(
        'https://freeapi.miniprojectideas.com/api/CarRentalApp/CreateNewCar',
        this.newCarObj
      )
      .subscribe({
        next: (res: APIResponse) => {
          console.log(res);
          if (res.result) {
            alert('Car created successfully');
            this.getAllCars();
          } else {
            alert(res.message);
          }
        },
        error: (err) => {
          console.error('API error:', err);
          alert('Something went wrong while creating the car');
        },
      });
  }

  onEdit(car: carModel) {
    this.newCarObj = car;
  }

  onUpdateCar() {
    this.http
      .put('https://freeapi.miniprojectideas.com/api/CarRentalApp/UpdateCar', this.newCarObj)
      .subscribe((res) => {
        alert('Car Details are update');
        this.getAllCars();
      });
  }

  onDeleteCar(car: carModel) {
    if (confirm('Are you sure you want to delete this car?')) {
      this.http
        .delete(
          'https://freeapi.miniprojectideas.com/api/CarRentalApp/DeleteCarbyCarId?carid=' +
            car.carId
        )
        .subscribe((res) => {
          alert('The selected car has been deleted');
          this.getAllCars();
        });
    }
  }
}
