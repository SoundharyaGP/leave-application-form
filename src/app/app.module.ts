import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import jsPDF from 'jspdf';


@NgModule({
  declarations: [
    AppComponent,
    LeaveApplicationComponent,
    // ModalComponent,
    // ExistingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    MatDialogModule,
    MatTableModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
