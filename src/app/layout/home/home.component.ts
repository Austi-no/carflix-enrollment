import { Enrollment } from './../../model/enrollment.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  refID: string = location.pathname.substring(5, 10)
  agent: any;
  itemsCollection: any;
  items: any;
  date = new Date('2022-02-20T00:00:00');
  constructor(private service: AppService, private fireStore: AngularFirestore) { }

  ngOnInit() {
    // this.service.getAgentById(this.refID).then(function (doc: any) {
    //   if (doc.exists) {
    //     console.log(doc.data());
    //   } else {
    //     console.log("There is no document!");
    //   }
    // }).catch(function (error: any) {
    //   console.log("There was an error getting your document:", error);
    // });


    // this.service.getAgentByRefID(this.refID)

    // this.fireStore.collection('enrollment').doc(this.refID).get().subscribe((doc: any) => {
    //   console.log(doc.data());
    //   if (doc.exists) {
    //     console.log(doc.data());

    //   } else {
    //     console.log("No such doument exist");

    //   }
    // })

    this.itemsCollection = this.fireStore.collection('enrollment', ref => ref.where("RefID", "==", this.refID));

    this.items = this.itemsCollection.valueChanges().map((changes: any) => {
      return changes.map((a: any) => {
        const data = a.payload.doc.data() as Enrollment;
        data.id = a.payload.doc.id;
        return data;
      });
    });



  }


  triggerFunction() {
    console.log('Timer Ended');
  }
}
