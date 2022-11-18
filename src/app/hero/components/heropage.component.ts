import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialogComponent } from '../dialog/delete-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';
import { HeroModel } from '../models/hero.models';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heropage',
  template: `
 <mat-toolbar color="primary">
    <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
      <mat-icon>star</mat-icon>
    </button>
    <span>Hero App</span>
    <span class="example-spacer"></span>
    <button mat-raised-button color="warn"(click)="openDialog()">Add Hero</button>
  </mat-toolbar>

  <div class="container">
    <div style="margin-top: 10px;">
          <mat-form-field>
            <mat-label>Filter</mat-label>
            <input matInput (keyup)="applyFilter($event)" placeholder="write the filter" #input>
          </mat-form-field>

          <div class="mat-elevation-z8">
            <table mat-table [dataSource]="dataSource" matSort>

  
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> ID </th>
                <td mat-cell *matCellDef="let row"> {{row.id}} </td>
              </ng-container>


              <ng-container matColumnDef="hero">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Hero </th>
                <td mat-cell *matCellDef="let row"> {{row.hero}} </td>
              </ng-container>


              <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Description </th>
                <td mat-cell *matCellDef="let row"> {{row.description}} </td>
              </ng-container>


              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
                <td mat-cell *matCellDef="let row"> {{row.name}} </td>
              </ng-container>

              <ng-container matColumnDef="category">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Category </th>
                <td mat-cell *matCellDef="let row"> {{row.category}} </td>
              </ng-container>

              <ng-container matColumnDef="link">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Link </th>
                <td mat-cell *matCellDef="let row"><a [href]="row.link" target="_blank">{{row.link}}</a> </td>
              </ng-container>

              <ng-container matColumnDef="action">
                <th mat-header-cell *matHeaderCellDef mat-sort-header> Action </th>
                <td mat-cell *matCellDef="let row">
                  <button mat-icon-button color="primary" (click)="editHero(row)">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn"  (click)="deleteHero(row.id)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

              <!-- Row shown when there is no matching data. -->
              <tr class="mat-row" *matNoDataRow>
                <td class="mat-cell" colspan="4">No data matching the filter "{{input.value}}"</td>
              </tr>
            </table>

            <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page of users"></mat-paginator>
          </div>
    </div>
  </div>

 `,
  styleUrls: ['./heropage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeropageComponent implements OnInit{
  displayedColumns: string[] = ['id', 'hero', 'description', 'name', 'category', 'link', 'action'];
  dataSource!: MatTableDataSource<Object>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private service: HeroService) {

  }

  ngOnInit(): void {
    this.getAllHeroes()
  }

  getAllHeroes(){
    this.service.getHeroes()
    .subscribe({
      next: ((response)=>{
      this.dataSource = new MatTableDataSource(response)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    }),
      error: (error) => {
        alert('Se ha producido un error al cargar los heroes')
      }
    })
  }

  openDialogGeneric(dialog: any, value: string, data?: HeroModel | number){
    this.dialog.open(dialog, {
      width: '30%',
      data: data
    }).afterClosed().subscribe(val =>{
      if(val === value){
        this.getAllHeroes()
      }
    })
  }

  openDialog() {
  this.openDialogGeneric(DialogComponent, 'save')
  }

  editHero(data: HeroModel){
    this.openDialogGeneric(DialogComponent, 'update', data)
  }

  deleteHero(data: number){
    this.openDialogGeneric(DeleteDialogComponent, 'delete', data)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
