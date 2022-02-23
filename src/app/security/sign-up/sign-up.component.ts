import { AngularFirestore } from '@angular/fire/firestore';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AppService } from './../../service/app.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  dealerID = JSON.parse(sessionStorage.getItem('dealerID') || '')
  phone = JSON.parse(sessionStorage.getItem('phoneNumber') || '')
  agent = JSON.parse(sessionStorage.getItem('agent') || '')
  signUpForm: any = FormGroup;
  submitted!: boolean
  data: any;

  constructor(
    private formBuilder: FormBuilder, private spinner: NgxSpinnerService,
    private fireStore: AngularFirestore, private router: Router,
    private service: AppService, private toastr: ToastrService
  ) { }

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
    this.spinner.show()
    this.submitted = true
    this.signUpForm.get('dealerId').setValue(this.dealerID)

    this.service.signUp(this.signUpForm.value).subscribe((res: any) => {
      console.log(res)

      this.submitted = false
      this.spinner.hide()
      if (res.code == "200" || res.code == "201") {
        sessionStorage.setItem("savedUser", JSON.stringify(this.signUpForm.value.firstName + " " + this.signUpForm.value.lastName))
        this.toastr.success(res.message, res.data)
        this.update(this.agent.RefID, this.signUpForm.value.firstName + " " + this.signUpForm.value.lastName)
        this.router.navigate(['thank-you'])
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
        this.spinner.hide()
      }

  }

  update(_id: string, _value: string) {
    this.fireStore.collection('enrollment').doc(`${_id}`).ref.get().then((doc: any) => {
      var data = doc.data()

      var userArray: string[] = data.enrolledUsers; // if not excisting.

      userArray.push(_value); // or just add it if it's.

      if (doc.exists) {

        this.fireStore.collection('enrollment').doc(`${_id}`).update({ enrolledUsers: userArray });


      } else {
        this.toastr.error("", "No Agent with ID: " + `${_id}`)

      }
    }).catch((error) => {
      this.toastr.error("error", error)

    })



  }
}
