import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Topping } from '../models/topping.model';

@Injectable({
  providedIn: 'root'
})
export class ToppingsService {
  constructor(private http: HttpClient) {}

  getToppings(): Observable<Topping[]> {
    return this.http
      .get<Topping[]>(`/api/toppings`)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
