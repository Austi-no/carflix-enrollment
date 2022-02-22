import { Enrollment } from './../../model/enrollment.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { map } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  refID: string = location.pathname.substring(5, 10)
  agent: any;
  itemsCollection: any;
  items: any;

  private subscription!: Subscription;

  public dateNow = new Date();
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference: any
  public secondsToDday: any
  public minutesToDday: any
  public hoursToDday: any
  public daysToDday: any

  private allocateTimeUnits(timeDifference: number) {
    this.secondsToDday = Math.floor((timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) % this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute)) % this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay)
    );
  }
  constructor(private service: AppService, private datePipe: DatePipe, private fireStore: AngularFirestore) { }

  ngOnInit() {

    this.getTimeDifference()
    // console.log(this.refID)
    // console.log(location.origin);
    // console.log(location.href);
    // console.log(location.pathname);
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

    // this.itemsCollection = this.fireStore.collection('enrollment', ref => ref.where("RefID", "==", this.refID));

    // this.items = this.itemsCollection.valueChanges().map((changes: any) => {
    //   return changes.map((a: any) => {
    //     const data = a.payload.doc.data() as Enrollment;
    //     data.id = a.payload.doc.id;
    //     return data;
    //   });
    // });



  }

  ngAfterViewInit() {
    this.subscription = interval(1000).subscribe((x) => {
      this.getTimeDifference();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTimeDifference() {
    this.timeDifference = new Date('Mar 01 2022 00:00:00').getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);

  }



}
