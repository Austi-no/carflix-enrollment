import { Router } from '@angular/router';
import { AppService } from './../../service/app.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  dealerID = JSON.parse(localStorage.getItem('dealerID') || '')
  phone = JSON.parse(localStorage.getItem('phoneNumber') || '')
  signUpForm: any = FormGroup;
  submitted!: boolean

  constructor(private formBuilder: FormBuilder, private router: Router, private service: AppService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required,]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [this.phone, [Validators.required]],
      location: ['', [Validators.required]],
      dealerId: ['', [Validators.required]],

    })
  }

  signUp() {
    this.submitted = true
    this.signUpForm.get('dealerId').setValue(this.dealerID)
    this.service.signUp(this.signUpForm.value).subscribe((res: any) => {
      console.log(res)

      this.submitted = false
      if (res.code == "200" || res.code == "201") {
        this.toastr.success(res.message, res.data)
        this.router.navigate(['/thank-you'])
      }
      if (res.code == "300") {
        this.toastr.error(res.message, res.data)
      }
      if (res.code == "400") {
        this.toastr.error(res.message, res.data)
      }

      if (res.code == "401") {
        this.toastr.error(res.message, res.data)
      }

      if (res.code == "403") {
        this.toastr.error(res.message, res.data)
      }

      if (res.code == "404") {
        this.toastr.error(res.message, res.data)
      }

      if (res.code == "500") {
        this.toastr.error(res.message, res.data)
      }



    }),
      (error: any) => {
        console.log('', error)
        this.toastr.error('Error!');
        this.submitted = false
      }

  }

}
