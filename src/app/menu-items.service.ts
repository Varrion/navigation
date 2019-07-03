import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {


  constructor(private http: HttpClient) { }

  getAllMenuItems(){
    return this.http.get('assets/Navigation.csv', {responseType:'text'})

  }
}
