import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RackDialogComponent } from '../dialogs/rack-dialog.component';
import { Rack } from '../rack.model';
import { RackService } from '../rack.service';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.scss']
})
export class WardComponent implements OnInit, OnDestroy {

  boards: Rack[];
  sub: Subscription;

  constructor(public rackService: RackService, public dialog: MatDialog) {}

  ngOnInit() {
    this.sub = this.rackService
      .getUserRacks()
      .subscribe(boards => (this.boards = boards));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.rackService.sortRacks(this.boards);
  }

  openRackDialog(): void {
    const dialogRef = this.dialog.open(RackDialogComponent, {
      width: '400px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rackService.createRack({
          title: result,
          priority: this.boards.length
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
