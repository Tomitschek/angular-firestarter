import {Component, Input, OnInit} from '@angular/core';
import {Rack, Pump} from '../../rack.model';
import { timer } from 'rxjs';

import {RackService} from '../../rack.service';
import {PumpDialogService} from '../../pump-dialog.service';


@Component({
  selector: 'app-pump',
  templateUrl: './pump.component.html',
  styleUrls: ['./pump.component.scss']
})
export class PumpComponent implements OnInit {
  @Input()
    pump: Pump;
  @Input()
    rack: Rack;
  @Input()
    i: number

  heartBeat = timer(0,1000);
  totalVolumen = 0;

  constructor(private rackService: RackService, private pumpdialogService: PumpDialogService) {

  }

  ngOnInit(): void {
   this.heartBeat.subscribe(val => this.updateState());
  }

  deletePump(task: Pump) {
    this.rackService.removePump(this.rack.id, task);
  }

  startBolus(task: Pump) {
    if (!task.isBolusLockout) {
      task.bolusInProgress = true;
      const source = timer(task.bolusTime || 2000);
      source.subscribe(val => {
        task.bolusInProgress = false
        this.totalVolumen = this.totalVolumen + 4;
        this.startLockout(task)
      });
    }
  }

  startLockout(task: Pump) {
    task.isBolusLockout = true;
    const source = timer(task.bolusLockoutTime || 4000);
    source.subscribe(val => {
      task.isBolusLockout = false;

    });
  }

  toggleIsRunning(pump1: Pump) {
    pump1.isRunning = !pump1.isRunning
    if (pump1.isRunning) {
      // const subscribe = this.heartBeat.subscribe(val => {

      // });
    }
  }


  openDialog(pump?: Pump, idx?: number): void {
    this.pumpdialogService.openPumpDialog(this.rack, pump, idx)
  }

  private updateState() {
    if (this.pump.isRunning) {
      this.totalVolumen ++
    }
  }
}
