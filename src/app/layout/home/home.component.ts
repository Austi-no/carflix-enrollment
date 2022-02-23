import { ToastrService } from 'ngx-toastr';
import { Enrollment } from './../../model/enrollment.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { map } from 'rxjs/operators';
import { interval, Observable, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  refID: string = location.pathname.substring(5, 10)
  agent: any;

  private subscription!: Subscription;
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
  constructor(private service: AppService, private toastr: ToastrService, private fireStore: AngularFirestore) {

  }

  ngOnInit() {

    this.getTimeDifference()
    console.log(JSON.stringify(this.secondsToDday))
    console.log(location.origin);
    console.log(location.href);
    console.log(location.pathname);

    // this.service.getAgentByRefID(this.refID)

    this.fireStore.collection('enrollment').doc("70488").ref.get().then((doc: any) => {
      if (doc.exists) {
        console.log(doc.data());

      } else {
        this.toastr.error("", "No Agent with such ID")
      }
    }).catch((error) => {
      this.toastr.error("error", error)
    })






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
