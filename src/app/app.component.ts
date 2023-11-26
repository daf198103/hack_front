import { Component, OnInit } from '@angular/core';
import { Codechallenge } from './codechallenge';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'testCreator_front';

  private baseUrl = 'http://localhost:8080';


  codechallenge: Codechallenge = new Codechallenge();
  submitted = false;
  dadosCodechallenge!: FormGroup;

  selectedLanguage: any = '';
  selectedVersion: any = '';
  selectedSeniority: any = '';
  selectedIdiom: any = '';
  responseText: any = '';

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  private createFormGroup() {
    this.dadosCodechallenge = new FormGroup({
      language:new FormControl(''),
      version: new FormControl(''),
      seniority:new FormControl(''),
      idiom:new FormControl(''),
      responseText: new FormControl('')
    });
  }

  onSubmit() {
    this.codechallenge.language = this.dadosCodechallenge.value.language;
    this.codechallenge.version = this.dadosCodechallenge.value.version;
    this.codechallenge.seniority = this.dadosCodechallenge.value.version;
    this.codechallenge.idiom = this.dadosCodechallenge.value.idiom;
    this.callPostQuestion(this.codechallenge);
  }

  callPostQuestion(codechallenge:Codechallenge): Promise<any>  {
    const selectedData = {
      language: this.codechallenge.language,
      version: this.codechallenge.version,
      seniority: this.codechallenge.seniority,
      idiom: this.codechallenge.idiom
    };
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.baseUrl}/api/v1/create/chatgpt`, { headers: reqHeader, params: selectedData })
      .toPromise()
      .then(response => response);
  }
}
