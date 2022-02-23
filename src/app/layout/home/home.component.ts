import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  // var refID = url2.substr(url2.length - 5)
  refID: string = (location.href).substring((location.href).length - 5)
  agent: any;
  validRefID!: boolean
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
  constructor(private router: Router, private toastr: ToastrService, private spinner: NgxSpinnerService, private fireStore: AngularFirestore) {

  }

  ngOnInit() {
    this.spinner.show()
    this.getTimeDifference()

    // this.service.getAgentByRefID(this.refID)

    this.fireStore.collection('enrollment').doc(this.refID).ref.get().then((doc: any) => {
      this.spinner.hide()
      if (doc.exists) {
        this.validRefID = true
        sessionStorage.setItem("agent", JSON.stringify(doc.data()))

      } else {
        this.toastr.error("", "No Agent with ID: " + this.refID)
        this.router.navigate(['**'])
      }
    }).catch((error) => {
      this.toastr.error("error", error)
      this.spinner.hide()
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

  proceed() {

    this.router.navigate(["verifyPhone"])
  }

}
