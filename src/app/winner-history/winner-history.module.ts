import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { WinnerReducer } from '../store/winner-history/winner-history.reducer';

import { WinnerHistoryComponent } from './winner-history.component';
import { WinnersViewComponent } from './winner-view/view-winner.component';
import { AddWinnerComponent } from './winner-add/add-winner.component';

@NgModule({
  declarations: [
    WinnersViewComponent,
    AddWinnerComponent,
    WinnerHistoryComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ winners: WinnerReducer })
  ],
  providers: [],
  bootstrap: [WinnerHistoryComponent]
})
export class AppModule { }
