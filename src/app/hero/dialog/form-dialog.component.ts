import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HeroService } from '../services/hero.service';
import { InformationDialogComponent } from './information-dialog.component';

@Component({
  selector: 'app-dialog',
  template: `
    <h1 mat-dialog-title>Add Hero Form</h1>

    <form [formGroup]="form" (ngSubmit)="submit()">
      <div mat-dialog-content>

        <mat-form-field appearance="outline">
          <mat-label>Hero</mat-label>
          <input formControlName="hero" matInput placeholder="Hero">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input [ngStyle]="{'text-transform': 'uppercase'}"formControlName="name" matInput placeholder="Name">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Category</mat-label>
            <mat-select formControlName="category" matNativeControl>
              <mat-option value="hero" selected>Heroes</mat-option>
              <mat-option value="villains">Villains</mat-option>
            </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Link</mat-label>
          <input formControlName="link" matInput placeholder="Link">
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Description</mat-label>
          <textarea formControlName="description" matInput></textarea>
        </mat-form-field>

      </div>
      <mat-error *ngIf="errors()">Please fill in all fields</mat-error>

      <div mat-dialog-actions [align]="'center'">
        <button mat-raised-button color="warn" mat-dialog-close >Close</button>
        <button mat-raised-button color="primary" [disabled]="form.invalid" type="submit">{{actionButton}}</button>
      </div>
    </form>
  `,
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {

  form = new FormGroup({
    hero: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  public actionButton: string = "Add hero";

  ngOnInit(){
    if(this.editData){
      this.actionButton = "Edit hero"
      this.form.controls['hero'].setValue(this.editData.hero)
      this.form.controls['name'].setValue(this.editData.name)
      this.form.controls['category'].setValue(this.editData.category)
      this.form.controls['link'].setValue(this.editData.link)
      this.form.controls['description'].setValue(this.editData.description)
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private service: HeroService, 
    private dialogRef: MatDialogRef<DialogComponent>,
    private dialog: MatDialog
    ){}


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

    submit() {
    if(this.form.valid && !this.editData){
      this.service.addNewHero(this.form.value)
      .subscribe({
        next: ((response)=>{
        this.form.reset();
        this.dialogRef.close('save');
        this.openInformationDialog('Hero Added', 'Your hero has been added' )
      }),
        error: (error) => {
          this.openInformationDialog('Error', 'An error has ocurred' )
        }
      })
    } else {
        this.editHero()
    }
  }

    editHero(){
      this.service.editHero(this.form.value, this.editData.id)
      .subscribe({
        next: ((response)=>{
        this.form.reset();
        this.dialogRef.close('update');
        this.openInformationDialog('Hero Edited', 'Your hero has been edited')
      }),
        error: (error) => {
          this.openInformationDialog('Error', 'An error has ocurred' )
        }
      })
    }

    errors():  boolean  {
      if(this.form.get('name')?.dirty && this.form.get('name')?.touched) 
        return true
        else {
          return false
        }
    }


}
