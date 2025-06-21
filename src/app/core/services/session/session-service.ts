import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private userData = new BehaviorSubject<any | null>(null);

  constructor() { }

  setUser(data: any) {
    this.userData.next(data);
  }

  getUser() {
    return this.userData.value;
  }

  clearUser() {
    this.userData.next(null);
  }

  getUserObservable(): Observable<any | null> {
    return this.userData.asObservable();
  }

}
