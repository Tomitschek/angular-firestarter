import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PumpDialogComponent } from '../dialogs/pump-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { RackService } from '../rack.service';
import { Pump } from '../rack.model';
import { timer } from 'rxjs';
import {PumpDialogService} from '../pump-dialog.service';

@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.scss']
})

export class RackComponent {
  @Input() rack;
  heartBeat = timer(0,1000);

  pumpDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.rack.pumps, event.previousIndex, event.currentIndex);
    this.rackService.updatePumps(this.rack.id, this.rack.pumps);
  }

  handleDelete() {
    this.rackService.deleteRack(this.rack.id);
  }

  openDialog() {
    this.pumpdialogService.openPumpDialog(this.rack)
  }

  constructor(private rackService: RackService,private pumpdialogService: PumpDialogService) {

  }


}
