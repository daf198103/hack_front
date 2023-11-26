import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  postQuestion(selectedData: any): Promise<any> {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.baseUrl}/api/v1/create/chatgpt`, { headers: reqHeader, params: selectedData })
      .toPromise()
      .then(response => response);
  }
  
}
