import { Component, OnInit } from '@angular/core';
import { TestService } from '../test-service.service';
import { Codechallenge } from './codechallenge';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  // standalone: true,
  //imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  //styleUrl: './app.component.css',
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

  constructor(private testService: TestService, private http: HttpClient, private fb:FormBuilder) {

  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  private createFormGroup() {
    this.dadosCodechallenge = this.fb.group({
      language: ['', Validators.required],
      version: ['', Validators.required],
      seniority: ['', Validators.required],
      idiom: ['', Validators.required],
      responseText: ['']
    });
  }

  onSubmit() {
    this.codechallenge.language = this.dadosCodechallenge.value.language;
    this.codechallenge.version = this.dadosCodechallenge.value.version;
    this.codechallenge.seniority = this.dadosCodechallenge.value.version;
    this.codechallenge.idiom = this.dadosCodechallenge.value.idiom;
    this.callPostQuestion(this.codechallenge);
  }

  callPostQuestion(codechallenge:Codechallenge): void {
    const selectedData = {
      language: codechallenge.language,
      version: codechallenge.version,
      seniority: codechallenge.seniority,
      idiom: codechallenge.idiom
    };

    this.testService.postQuestion(selectedData)
      .then(response => {
        // Set the response to the responseText property
        this.responseText = response as string;
        console.log('Response from postQuestion:', response);
      })
      .catch(error => {
        // Handle errors
        console.error('Error calling postQuestion:', error);
      });
  }
}
