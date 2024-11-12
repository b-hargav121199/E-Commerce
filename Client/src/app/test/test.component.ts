import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {

  baseUrl=environment.baseUrl;

  constructor(private http:HttpClient){

    console.log(this.baseUrl);
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  get404method()
  {
    this.http.get(this.baseUrl + 'products/42').subscribe(res=>{
      console.log(res)
    },
    err=>{
      console.log(err)
    })
  }

  get500method()
  {
    this.http.get(this.baseUrl + 'buggy/servererror').subscribe(res=>{
      console.log(res)
    },
    err=>{
      console.log(err)
    })
  }

  get400method()
  {
    this.http.get(this.baseUrl + 'buggy/badrequest').subscribe(res=>{
      console.log(res)
    },
    err=>{
      console.log(err)
    })
  }

  get400validationerrormethod()
  {
    this.http.get(this.baseUrl + 'products/abcd').subscribe(res=>{
      console.log(res)
    },
    err=>{
      console.log(err)
    })
  }
  

  
}
