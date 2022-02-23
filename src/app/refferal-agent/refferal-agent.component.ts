import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AppService } from './../service/app.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-refferal-agent',
  templateUrl: './refferal-agent.component.html',
  styleUrls: ['./refferal-agent.component.css']
})
export class RefferalAgentComponent implements OnInit {
  refID: any
  form: any = FormGroup
  enrolledUsers: any = []
  agentList: any = [];
  baseURL: any
  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, private service: AppService, private toastr: ToastrService) { }

  ngOnInit() {

    this.getAgents()
    this.baseURL = location.origin
    this.form = this.fb.group({
      RefID: ['', Validators.required],
      name: ['', Validators.required],
      enrolledUsers: []
    })


    // console.log(location.origin);
    // console.log(location.href);
    // console.log(location.pathname);
  }

  getAgents() {
    this.spinner.show()
    this.service.getAllAgents().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map((c: any) =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        ))
    ).subscribe((data: any) => {
      this.agentList = data
      console.log(this.agentList)
      this.spinner.hide()

    });
  }

  addAgent() {
    this.refID = Math.floor(Math.random() * 90000) + 10000
    this.form.get('RefID').setValue(this.refID)
    this.form.get('enrolledUsers').setValue(this.enrolledUsers)
    this.service.addAgent(this.form.value, this.refID)
    this.getAgents()


  }

}
