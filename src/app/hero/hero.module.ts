import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FilterHeropageComponent } from './components/filterheropage.component';
import { HeropageComponent } from './components/heropage.component';
import { DeleteDialogComponent } from './dialog/delete-dialog.component';
import { DialogComponent } from './dialog/form-dialog.component';
import { InformationDialogComponent } from './dialog/information-dialog.component';
import { HeroRoutingModule } from './hero-routing.module';



const COMPONENTS = [
  HeropageComponent,
  DialogComponent,
  DeleteDialogComponent,
  InformationDialogComponent,
  FilterHeropageComponent
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HeroRoutingModule
  ],
  exports: [HeropageComponent]
})
export class HeroModule { }
