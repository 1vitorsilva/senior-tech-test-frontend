import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospedesComponent } from './hospedes.component';
import { MatTableModule } from '@angular/material/table';
import { HospedeFormComponent } from './hospede-form/hospede-form.component';
import { MatButtonModule } from "@angular/material/button";
import { AppRoutingModule } from "src/app/app-routing.module";
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HospedesService } from 'src/app/services/hospedes/hospedes.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';






@NgModule({
  declarations: [HospedesComponent, HospedeFormComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule

  ],
  exports: [
    HospedesComponent
  ],
  providers: [HospedesService]
})
export class HospedesModule { }
