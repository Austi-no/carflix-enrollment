import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm:any=FormGroup;


  constructor( private formBuilder:FormBuilder) { }

  

  ngOnInit(): void {

    this.signUpForm=this.formBuilder.group({

      firstName: ['', [Validators.required,]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      location:['', [Validators.required]]


    })
  }

}
