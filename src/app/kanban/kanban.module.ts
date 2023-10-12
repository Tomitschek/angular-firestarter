import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { WardComponent } from './boards-list/ward.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { RackComponent } from './board/rack.component';
import { FormsModule } from '@angular/forms';
import { RackDialogComponent } from './dialogs/rack-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PumpDialogComponent } from './dialogs/pump-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PumpComponent } from './board/pump/pump.component';
import {PumpDialogService} from './pump-dialog.service';

@NgModule({
  declarations: [
    WardComponent,
    RackComponent,
    RackDialogComponent,
    PumpDialogComponent,
    PumpComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        KanbanRoutingModule,
        FormsModule,
        DragDropModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatProgressBarModule,
    ],
  entryComponents: [RackDialogComponent, PumpDialogComponent],
  providers: [PumpDialogService]
})
export class KanbanModule {}
