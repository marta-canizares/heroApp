import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroService } from '../services/hero.service';
import { InformationDialogComponent } from './information-dialog.component';

@Component({
  selector: 'app-dialog-delete',
  template: `
  <div class="content" >
    <h1 mat-dialog-title [align]="'center'">Delete Hero</h1>
    <div mat-dialog-content [align]="'center'">Are you sure to delete the hero?</div>
    <div mat-dialog-actions [align]="'center'">
      <button mat-raised-button mat-dialog-close color="primary">Close</button>
      <button mat-raised-button color="warn" (click)="deleteHero(id)">Delete</button>
    </div>
  <div >

  `,
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public id: number,
    private service: HeroService, 
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private dialog: MatDialog){
    }

    openInformationDialog(title: string, paragraph: string){
      setTimeout(()=> {                     
        this.dialog.open(InformationDialogComponent, {
          width: '30%',
          data: {
            title: title,
            paragraph: paragraph
          }
        })}, 1000);
    }

    deleteHero(id: number){
      this.service.deleteHero(id)
      .subscribe({
        next: ((response)=>{
        this.dialogRef.close('delete');
        this.openInformationDialog('Hero deleted', 'Your hero has been deleted')
      }),
        error: (error) => {
          this.openInformationDialog('Error', 'An error has ocurred' )
        }
      })
    }

}
