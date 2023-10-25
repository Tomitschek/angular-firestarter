import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PumpMockupRoutingModule } from './pump-mockup-routing.module';
import { WardComponent } from './ward/ward.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { RackComponent } from './rack/rack.component';
import { FormsModule } from '@angular/forms';
import { RackDialogComponent } from './dialogs/rack-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { PumpDialogComponent } from './dialogs/pump-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PumpComponent } from './rack/pump/pump.component';
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
        PumpMockupRoutingModule,
        FormsModule,
        DragDropModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatProgressBarModule,
    ],
  entryComponents: [RackDialogComponent, PumpDialogComponent],
  providers: [PumpDialogService]
})
export class PumpMockupModule {}
