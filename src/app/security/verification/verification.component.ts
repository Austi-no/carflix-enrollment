import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from './../../service/app.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from "firebase"
import 'firebase/auth'
import "firebase/firestore"
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WhiteValidator } from 'src/app/custom-validation/white-space.validation';


var config = {
  apiKey: "AIzaSyBhD0qRZdtAajO0mY7X_kImREC0dELQyTI",
  authDomain: "carflix-auto0.firebaseapp.com",
  projectId: "carflix-auto0",
  storageBucket: "carflix-auto0.appspot.com",
  messagingSenderId: "513909391098",
  appId: "1:513909391098:web:75cd05ecb3121b1f415343",
  measurementId: "G-1C3ZGWX7KK"
}


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  submitted!: boolean

  phoneNumber: any
  recaptchaVerifier: any
  windowRef: any;
  referralAgent: any = {};
  form!: FormGroup
  constructor(private router: Router, private zone: NgZone, private fb: FormBuilder, private spinner: NgxSpinnerService, private toastr: ToastrService, private service: AppService) { }

  ngOnInit() {
    this.referralAgent = JSON.parse(sessionStorage.getItem('agent') || '')


    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(config)
    } else {
      firebase.default.app(); // if already initialized, use that one
    }

    this.form = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+23-?)|0)?[0-9]{11}$"), WhiteValidator.noWhiteSpace]],
    })

  }
  get f() {
    return this.form.controls;
  }
  sendVerificationCode() {
    this.spinner.show()
    this.submitted = true
    if (this.form.invalid || this.form.errors) {

      const invalid = [];
      const controls = this.form.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          invalid.push(name);
        }
      }
      this.submitted = false
      this.toastr.error('The Following fields are Invalid: ' + invalid, 'Invalid Fields');
      return;

    }

    var formattedPhoneNumber = this.form.value.phoneNumber.replace(/0/, '+234');
    this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier("sign-in-button", { size: 'invisible' })
    firebase.default.auth().signInWithPhoneNumber(formattedPhoneNumber, this.recaptchaVerifier).then(result => {
      console.log(result);

      sessionStorage.setItem("verificationId", JSON.stringify(result.verificationId))
      this.zone.run(() => {
        this.router.navigate(['verifyCode'])
      });
      this.spinner.hide()
      // setTimeout(() => {
      //   this.router.navigate(['verifyCode'])
      //   this.spinner.hide()
      // }, 2000);
    }).catch((error: any) => {
      this.spinner.hide()
      this.toastr.error("", error)
    })




  }



}
