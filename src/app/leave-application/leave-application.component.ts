import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LeaveService } from '../leave.service';
import { leave } from '../leave';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.css'],
  providers: [MatDialog]
})
export class LeaveApplicationComponent {

  showModal = false;
  leaveType: string = '';
  leaveTypeTouched: boolean = false;
  StartDate: string = '';
  EndDate: string = '';
  filteredData: any[] = [];
  defaultYear: string = 'Year';
  details: { key: string; value: { key: string; value: any }[] }[] = [];

  
  selectedYear: string = '';
  selectedMonths: {[key: string]: boolean} = {};
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 
  
  constructor(private _leaveServ: LeaveService, public dialog: MatDialog, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    console.log('Details:', this.details);
  }

  openModal() {
    console.log('Modal opened');
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }


  post(leaveData: leave) {
    this._leaveServ.postLeave(leaveData).subscribe(data => {
      console.log(data);
    });
  }

  onClick(userForm: NgForm) {
    if (this.isEndDateBeforeStartDate()) {
      alert('End date must be greater than start date');
    }
    else {
      const formData = userForm.value;
      const leaveData: leave = {
        name: formData.name,
        email: formData.email,
        dellemail: formData.dellemail,
        approveremail: formData.approveremail,
        leave: formData.leave,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason
      };
      this.post(leaveData);
      console.log(formData);
      userForm.resetForm();
    }
  }

  leaveTypeRequiredError(): boolean {
    return this.leaveTypeTouched && !this.leaveType;
  }

  isEndDateBeforeStartDate(): boolean {
    return !!(this.StartDate && this.EndDate && new Date(this.EndDate) < new Date(this.StartDate));
  }

  get(): void {
    const formattedMonths = Object.keys(this.selectedMonths).filter(month => this.selectedMonths[month]);
    const expectedInput = [[this.selectedYear, formattedMonths]];
  
    console.log('Expected Input:', expectedInput);
  
    this._leaveServ.fetchData(expectedInput).subscribe(
      (result: any) => {
        console.log("Result", result);
  
        // Assuming result has the expected structure
        this.details = Object.entries(result).map(([key, value]) => ({
          key,
          value: (value as any).map((innerValue: any) => ({
            key: Object.keys(innerValue)[0], // Assuming there's only one key in innerValue
            value: innerValue[Object.keys(innerValue)[0]]
          }))
        }));
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  

  onSubmit() {
    console.log('Selected Year:', this.selectedYear);
    console.log('Selected Months:', this.selectedMonths);

    this.get();
    this.closeModal();
  }

}