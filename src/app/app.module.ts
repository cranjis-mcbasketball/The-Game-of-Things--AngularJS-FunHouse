import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { tabsReducer } from './store/tabs/tabs.reducer';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SubmitTabsComponent } from './submit-tabs/submit-tabs.component';
import { StatsTabsComponent } from './stats-tabs/stats-tabs.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { Player1Component } from './player1/player1.component';
import { Player2Component } from './player2/player2.component';
import { Player3Component } from './player3/player3.component';
import { Player4Component } from './player4/player4.component';

const appRoutes: Routes = [
  { path: '', component: SubmitTabsComponent },
  { path: 'instructions', component: InstructionsComponent },
  { path: '**', component: SubmitTabsComponent }
];


@NgModule({
  declarations: [AppComponent, SubmitTabsComponent, StatsTabsComponent, InstructionsComponent, Player1Component, Player2Component, Player3Component, Player4Component],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    DragDropModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ tab: tabsReducer })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: []
})

export class AppModule { }