import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RackService } from '../rack.service';

@Component({
  selector: 'app-pump-dialog',
  styleUrls: ['./dialog.scss'],
  template: `
    <h1 mat-dialog-title>Task</h1>
    <div mat-dialog-content class="content">
      <div>Pump Nr. {{data.idx}}</div>
      <mat-form-field>
        <textarea
          placeholder="Pump description"
          matInput
          [(ngModel)]="data.pump.description"
        ></textarea>
      </mat-form-field>
      <br/>
      <mat-button-toggle-group
        #group="matButtonToggleGroup"
        [(ngModel)]="data.pump.label"
      >
        <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
          <mat-icon [ngClass]="opt">{{
            opt === 'gray' ? 'check_circle' : 'lens'
            }}</mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="data" cdkFocusInitial>
        {{ data.isNew ? 'Add Pump' : 'Update Pump' }}
      </button>

      <app-delete-button
        (delete)="handlePumpDelete()"
        *ngIf="!data.isNew"
      ></app-delete-button>
    </div>
  `
})
export class PumpDialogComponent {
  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  constructor(
    public dialogRef: MatDialogRef<PumpDialogComponent>,
    private rackService: RackService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('PumpDialog Data', data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handlePumpDelete() {
    this.rackService.removePump(this.data.boardId, this.data.pump);
    this.dialogRef.close();
  }
}
