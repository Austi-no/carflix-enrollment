import { AppService } from './../../service/app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import 'firebase/auth'
import "firebase/firestore"
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


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
  constructor(private router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService, private service: AppService) { }

  ngOnInit() {

    firebase.initializeApp(config)

  }

  sendVerificationCode() {
    this.submitted = true
    console.log(this.phoneNumber);

    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("sign-in-button", { size: 'invisible' })
    firebase.auth().signInWithPhoneNumber(this.phoneNumber, this.recaptchaVerifier).then(result => {
      console.log(result);
      localStorage.setItem("verificationId", JSON.stringify(result.verificationId))
      this.router.navigate(['/verifyCode'])
      this.submitted = false
    }).catch((error: any) => {
      this.submitted = false
      this.toastr.error("", error)
    })




  }



}
