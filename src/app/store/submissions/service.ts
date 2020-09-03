import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Submissions } from './models';

@Injectable({
  providedIn: 'root'
})
export class SubmissionsHttpService {
  private ApiURL: string = 'assets/responses.json';
  constructor(private httpclient: HttpClient) { }

  getSubmissions(): Observable<Submissions[]> {
    return this.httpclient.get<Submissions[]>(this.ApiURL);
  }

  createSubmissions(payload: Submissions): Observable<Submissions> {
    return this.httpclient.post<Submissions>(this.ApiURL, JSON.stringify(payload));
  }
}
