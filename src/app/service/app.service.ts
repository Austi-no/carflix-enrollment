import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl: string = environment.baseUrl + 'dealer/';
  private collection!: AngularFirestoreCollection;
  constructor(private http: HttpClient, private toastr: ToastrService, private firestore: AngularFirestore) { }


  signUp(value: any): any {
    return this.http.post(this.baseUrl + "add", value)
  }


  addAgent(value: any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("enrollment").add(value).then(res => {
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
}
