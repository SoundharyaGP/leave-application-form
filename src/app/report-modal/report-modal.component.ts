import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { LeaveService } from 'app/leave.service';


@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent {
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  selectedMonths: string[] = [];
  monthDetails: any[]=[];

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  // openReportModal() {
  //   const modalRef = this.modalService.open(ReportModalComponent, {
  //     size: 'lg', // Adjust the size based on your needs
  //   });
    
  selectMonth(month: string) {
    // Toggle the selection of the month
    const index = this.selectedMonths.indexOf(month);
    if (index !== -1) {
      this.selectedMonths.splice(index, 1);
    } else {
      this.selectedMonths.push(month);
    }
  }
  submit() {
    this.activeModal.close(this.selectedMonths);
  }

  close() {
    this.activeModal.dismiss();
  }
}
