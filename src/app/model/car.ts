export class carModel {
  carId: number;
  brand: string;
  model: string;
  year: number;
  color: string;
  dailyRate: number;
  carImage: string;
  regNo: string;

  constructor() {
    this.carId = 0;
    this.year = 0;
    this.dailyRate = 0;
    this.brand = '';
    this.model = '';
    this.color = '';
    this.carImage = '';
    this.regNo = '';
  }
}

export interface APIResponse {
  message: string;
  result: boolean;
  data: any;
}
