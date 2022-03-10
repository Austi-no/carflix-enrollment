import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
// import { User } from 'firebase';
import { Router } from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl: string = environment.baseUrl + 'dealer/';
  // user!: User;
  private collection!: AngularFirestoreCollection;
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private firestore: AngularFirestore) {
    // this.firestore.authState.subscribe(user => {
    //   if (user) {
    //     this.user = user;
    //     sessionStorage.setItem('user', JSON.stringify(this.user));
    //   } else {
    //     sessionStorage.setItem('user', null);
    //   }
    // })
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

  // getAgentById(id: any): any {
  //   return this.firestore.collection("enrollment").doc(id).ref.get()

  // }

  getAgentByRefID(refID: any): any {
    // return (this.firestore.doc(`enrollment/${refID}`).ref.get())

    return this.firestore.collection('enrollment', ref => ref.where("RefID", "==", refID)).get().subscribe((ss: any) => {
      console.log(ss);

      if (ss.docs.length === 0) {
        console.log('Document not found! Try again!');
      } else {
        ss.docs.forEach((doc: any) => {

          console.log(doc.data());

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
}
