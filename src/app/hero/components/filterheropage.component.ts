import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroModel } from '../models/hero.models';
import { HeroService } from '../services/hero.service';
import { InformationDialogComponent } from '../dialog/information-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-heropage',
  template: `
<div>
  <mat-toolbar color="primary">
      <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
        <mat-icon>star</mat-icon>
      </button>
      <span>Hero App</span>
      <span class="example-spacer"></span>
      <button mat-raised-button color="basic" [routerLink]="['home']">Home</button>
    </mat-toolbar>

    <div class="container">
      <div style="margin-top: 10px;">
          <mat-form-field>
            <mat-label>Filter by ID</mat-label>
            <input matInput (keyup)="filterById($event)" placeholder="Write the ID and press enter" #input>
          </mat-form-field>

          <div class="mat-elevation-z8">
            <table mat-table [dataSource]="heroes">
 
              <ng-container matColumnDef="id">
                <th mat-header-cell *matHeaderCellDef > ID </th>
                <td mat-cell *matCellDef="let row"> {{row.id}} </td>
              </ng-container>

              <ng-container matColumnDef="hero">
                <th mat-header-cell *matHeaderCellDef > Hero </th>
                <td mat-cell *matCellDef="let row"> {{row.hero}} </td>
              </ng-container>

              <ng-container matColumnDef="description">
                <th mat-header-cell *matHeaderCellDef > Description </th>
                <td mat-cell *matCellDef="let row"> {{row.description}} </td>
              </ng-container>

              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef > Name </th>
                <td mat-cell *matCellDef="let row"> {{row.name}} </td>
              </ng-container>

              <ng-container matColumnDef="category">
                <th mat-header-cell *matHeaderCellDef > Category </th>
                <td mat-cell *matCellDef="let row"> {{row.category}} </td>
              </ng-container>

              <ng-container matColumnDef="link">
                <th mat-header-cell *matHeaderCellDef > Link </th>
                <td mat-cell *matCellDef="let row"><a [href]="row.link" target="_blank">{{row.link}}</a> </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

              <!-- Row shown when there is no matching data. -->
              <tr class="mat-row" *matNoDataRow>
                <td class="mat-cell" colspan="4">No data matching the filter "{{input.value}}"</td>
              </tr>
            </table>

          </div>
    </div>   
    <p [ngStyle]="{'color': 'red', 'margin': '20px'}">{{infoValue}}</p>
  </div>
</div>

 `,
  styleUrls: ['./heropage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterHeropageComponent{
  displayedColumns: string[] = ['id', 'hero', 'description', 'name', 'category', 'link'];
  public heroes: HeroModel[]
  public infoValue : string;

  constructor(
    private service: HeroService,
    private dialog: MatDialog
    ) {
    this.heroes= []
    this.infoValue = ''
  }

  filterById(event: Event){
    const id = parseInt((event.target as HTMLInputElement).value)
    if(id){
    this.service.getHeroById(id)
    .subscribe({
      next: ((response)=>{
      this.infoValue = ''
      this.heroes = [response]
    }),
      error: (error) => {
        if(error.status === 404){
          this.infoValue = 'We can not find the ID, please introduce a valid ID'
        }else {
          setTimeout(()=> {                     
            this.dialog.open(InformationDialogComponent, {
              width: '30%',
              data: {
                title: 'Error',
                paragraph: 'An error has ocurred'
              }
            })}, 1000);
        }
      }
    })
    } else{
      this.infoValue = 'Please introduce a valid ID'
    }
  }

}
