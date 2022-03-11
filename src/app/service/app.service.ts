import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import * as firebase from "firebase"
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl: string = environment.baseUrl + 'dealer/';
  userData: any = new Observable<firebase.default.User>();
  dada: any

  private collection!: AngularFirestoreCollection;
  user: any = null || '';
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private afa: AngularFireAuth, private router: Router, private toastr: ToastrService, private firestore: AngularFirestore) {

    this.userData = afa.authState;
    /* Saving user data in sessionStorage when
    logged in and setting up null when logged out */
    // this.afa.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     sessionStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(sessionStorage.getItem('user')!);
    //   } else {
    //     sessionStorage.setItem('user', 'null');
    //     JSON.parse(sessionStorage.getItem('user')!);
    //   }
    // });
  }


  signUp(value: any): any {
    return this.http.post(this.baseUrl + "add", value)
  }


  addAgent(value: any, id: any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("enrollment").doc(JSON.stringify(id)).set(value).then(res => {
        this.toastr.success("", "Agent Added Successfully!")
      }, (err: any) => {
        reject(err);
        this.toastr.success("", "An Error Occurred!")
      })

    });
  }

  getAllAgents(): any {
    return this.firestore.collection("enrollment")
  }


  getAgentByRefID(refID: any): any {

    return this.firestore.collection('enrollment', ref => ref.where("RefID", "==", refID)).get().subscribe((ss: any) => {
      // console.log(ss);

      if (ss.docs.length === 0) {
        console.log('Document not found! Try again!');
      } else {
        ss.docs.forEach((doc: any) => {

          // console.log(doc.data());

        })
      }
    })
  }



  // async login(email: string, password: string) {
  //   var result = await this.firestore.auth.signInWithEmailAndPassword(email, password)
  //   this.router.navigate(['agent']);
  // }

  // async logout() {
  //   await this.firestore.auth.signOut();
  //   sessionStorage.removeItem('user');
  //   this.router.navigate(['login']);
  // }

  /* Sign in */
  login(email: string, password: string) {
    this.spinner.show()
    this.afa.signInWithEmailAndPassword(email, password).then((user: any) => {

      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.spinner.hide()
        this.router.navigate(['agent'])
        this.toastr.success("", "You are Successfully logged in")
      } else {
        this.spinner.hide()
        sessionStorage.setItem('user', "null");
      }



    }).catch((err: any) => {
      this.spinner.hide()
      this.toastr.error("Something went wrong", err.message)
      console.log('Something is wrong:', err.message);
      sessionStorage.setItem('user', "null");
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
    // console.log(this.user);

    return this.user !== "null" ? true : false;
  }

  sigoutOut() {
    this.afa.signOut();
    sessionStorage.removeItem('user');
  }


}
