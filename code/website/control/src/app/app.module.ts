import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogContent, MatDialogActions} from "@angular/material/dialog"
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component'
import { EventListComponent, EventListEditDialog, EventListCreateDialog } from './event-list/event-list.component'

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    EventListComponent,
    EventListEditDialog,
    EventListCreateDialog
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
