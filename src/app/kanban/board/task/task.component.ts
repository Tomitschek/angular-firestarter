import {Component, Input, OnInit} from '@angular/core';
import {Board, Task} from '../../board.model';
import { timer } from 'rxjs';

import {MatDialog} from '@angular/material/dialog';
import {BoardService} from '../../board.service';
import {TaskDialogComponent} from '../../dialogs/task-dialog.component';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input()
    task: Task;
  @Input()
    board: Board;
  @Input()
    i: number

  heartBeat = timer(0,1000);
  totalVolumen = 0;

  constructor(private boardService: BoardService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
   this.heartBeat.subscribe(val => this.updateState());
  }

  deleteTask(task: Task) {
    this.boardService.removeTask(this.board.id, task);
  }

  startBolus(task: Task) {
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

  startLockout(task: Task) {
    task.isBolusLockout = true;
    const source = timer(task.bolusLockoutTime || 4000);
    source.subscribe(val => {
      task.isBolusLockout = false;

    });
  }

  toggleIsRunning(task: Task) {
    task.isRunning = !task.isRunning
    if (task.isRunning) {
      // const subscribe = this.heartBeat.subscribe(val => {

      // });
    }
  }


  openDialog(task?: Task, idx?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
        : { task: newTask, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.boardService.updateTasks(this.board.id, [
            ...this.board.tasks,
            result.task
          ]);
        } else {
          const update = this.board.tasks;
          update.splice(result.idx, 1, result.task);
          this.boardService.updateTasks(this.board.id, this.board.tasks);
        }
      }
    });
  }

  private updateState() {
    if (this.task.isRunning) {
      this.totalVolumen ++
    }
  }
}
