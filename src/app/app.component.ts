import { Component, OnInit } from '@angular/core';
import { Codechallenge } from './codechallenge';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
    RouterOutlet, 
    ReactiveFormsModule, 
    HttpClientModule, 
    FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'testCreator_front';

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
    console.log("Teste");
    this.codechallenge.language = this.dadosCodechallenge.value.language;
    this.codechallenge.version = this.dadosCodechallenge.value.version;
    this.codechallenge.seniority = this.dadosCodechallenge.value.version;
    this.codechallenge.idiom = this.dadosCodechallenge.value.idiom;
    this.callPostQuestion();
  }

  callPostQuestion(): Promise<any>  {
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`http://localhost:8080/api/v1/create/chatgpt?language=`+this.dadosCodechallenge.value.language+`&version=`+
    this.dadosCodechallenge.value.version+`&seniority=`+this.dadosCodechallenge.value.version
    +`&idiom=`+this.dadosCodechallenge.value.idiom , { headers: reqHeader })
      .toPromise()
      .then((response) => {
        this.responseText = response;
        console.log("RRESPOSTA"+this.responseText);
      });
  }
}
