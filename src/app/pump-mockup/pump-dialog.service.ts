import { Injectable } from '@angular/core';
import {Pump, Rack} from './rack.model';
import {PumpDialogComponent} from './dialogs/pump-dialog.component';
import {RackService} from './rack.service';
import {MatDialog} from '@angular/material/dialog';
import {PumpMockupModule} from './pump-mockup.module';

@Injectable({
  providedIn: 'any'
})
export class PumpDialogService {

  constructor(private rackservice: RackService, private dialog: MatDialog) { }

  openPumpDialog(rack: Rack, pump?: Pump, idx?: number): void {
    const newPump = { label: 'purple' };
    const dialogRef = this.dialog.open(PumpDialogComponent, {
      width: '500px',
      data: pump
        ? { pump: { ...pump }, isNew: false, rackId: rack.id, idx }
        : { pump: newPump, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.rackservice.updatePumps(rack.id, [
            ...rack.pumps,
            result.pump
          ]);
        } else {
          const update = rack.pumps;
          update.splice(result.idx, 1, result.pump);
          this.rackservice.updatePumps(rack.id, rack.pumps);
        }
      }
    });
  }
}
