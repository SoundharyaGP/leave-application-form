import { Component } from '@angular/core';
import {NgForm,FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LeaveService } from '../leave.service';
import { leave } from '../leave';


@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.css']
})
export class LeaveApplicationComponent {
  
  constructor(private _leaveServ:LeaveService) {
  }
  
  // name: string = '';
  // email: string = '';
  // dellemail: string = '';
  // deloitteemail: string = '';
  // leaveType: string = '';
  // startDate: string = '';
  // endDate: string = '';
  // reason: string = '';

  // // Method to handle form submission
  // submitForm() {
  //   // Handle form submission logic here (e.g., send data to the backend)
  //   console.log('Form submitted:', this.name, this.email, this.dellemail, this.deloitteemail, this.leaveType, this.startDate, this.endDate, this.reason); 
  // }

  l:leave = new leave('','','','','','','','');

  post(post:any){
    this._leaveServ.postLeave(this.l).subscribe(data=>{
      console.log(data);
    })
  }

  onClick(userForm:NgForm){
    this.post(userForm)
    console.log(userForm.value);
  }

  
  model: any={
    leave: ''
  };

  // exportToExcel() {
  //   const dataToExport = [
  //     ['Name', 'Email', 'Dell Email', 'Approver Email', 'Leave Type', 'Start Date', 'End Date', 'Reason'],
  //     [this.name, this.email, this.dellEmail, this.deloitteemail, this.leaveType, this.startDate, this.endDate, this.reason],
  //   ];

  //   const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataToExport);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'LeaveApplicationData');
  //   XLSX.writeFile(wb, 'leave_application_data.xlsx');
  // }
}
