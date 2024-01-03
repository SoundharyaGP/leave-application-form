import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LeaveService } from '../leave.service';
import { leave } from '../leave';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


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

  @ViewChild('pdfTable') pdfTable!: ElementRef;
  selectedYear: string = '';
  selectedMonths: { [key: string]: boolean } = {};
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

        this.details = Object.entries(result).map(([key, value]) => ({
          key,
          value: (value as any).map((innerValue: any) => ({
            key: Object.keys(innerValue)[0],
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

  downloadAsPDF() {
    const pdf = new jsPDF();

    const autoTableConfig: { head: string[][], body: (string[] | { hline: true })[] } = {
      head: [['Year', 'Month', 'Name', 'Email', 'Dell Email', 'Approver Email', 'Leave', 'Start Date', 'End Date', 'Reason']],
      body: [],
    };

    this.details.forEach(year => {
      year.value.forEach(monthDetails => {
        const yearMonthData = [year.key, monthDetails.key];
        monthDetails.value.forEach((event: any) => {
          const rowData: (string[] | { hline: true }) = yearMonthData.concat([
            event?.name,
            event?.email,
            event?.dellemail,
            event?.approveremail,
            event?.leave,
            event?.startDate ? new Date(event.startDate).toLocaleDateString() : '',
            event?.endDate ? new Date(event.endDate).toLocaleDateString() : '',
            event?.reason,
          ]);
          autoTableConfig.body.push(rowData);
        });
      });
    });

    const year = this.selectedYear;
    const monthName = Object.keys(this.selectedMonths).filter(month => this.selectedMonths[month]);
    (pdf as any).autoTable(autoTableConfig);
    const fileName = `${monthName}${year ? `_${year}` : ''}_Leavepdf.pdf`;
    pdf.save(fileName);
  }


}