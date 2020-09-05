import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Submissions } from './models';
import { SubmissionsState } from './state';
import { Store, select } from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class SubmissionsHttpService {
  private ApiURL: string = 'assets/responses.json';
  constructor(private httpclient: HttpClient, private store: Store<{ submissions: SubmissionsState }>) { }

  getSubmissions(): Observable<Submissions[]> {
    this.store.subscribe(function () {
      localStorage.setItem('state', JSON.stringify(this.store.getState()));
    })
    return this.httpclient.get<Submissions[]>(this.ApiURL);
  }

  createSubmissions(payload: Submissions): Observable<Submissions> {
    this.store.subscribe(function () {
      localStorage.setItem('state', JSON.stringify(this.store.getState()));
    })
    return this.httpclient.post<Submissions>(this.ApiURL, JSON.stringify(payload));
  }
}
