import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  template: `
  <div class="content" >
    <h1 mat-dialog-title  [align]="'center'" [innerHTML]="title"></h1>
    <div mat-dialog-content [align]="'center'" [innerHTML]="paragraph"></div>
    <div mat-dialog-actions [align]="'center'">
      <button mat-raised-button mat-dialog-close color="primary">Close</button>
    </div>
  <div >

  `,
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformationDialogComponent {
  public title: string | undefined;
  public paragraph: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) data: { title?: string; paragraph?: string; } = {},
    public dialogRef: MatDialogRef<InformationDialogComponent>,
  ) {
    this.title = data.title;
    this.paragraph = data.paragraph;
  }
}
