import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store, select } from "@ngrx/store";
// import { Observable } from "rxjs/Observable";
import { Observable, Subscription } from "rxjs/Rx";
import { map } from "rxjs/operators";
import { tabChangedAction } from "../store/tabs/tabs.actions";
import GameState from "../store/game/state";
import * as GameActions from "../store/game/actions";
import { state } from "@angular/animations";
import { HttpClient } from "@angular/common/http";

import { PromptItem } from "../store/game/models";

@Component({
  selector: "stats-tabs",
  templateUrl: "./stats-tabs.component.html",
  styleUrls: ["./stats-tabs.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class newRound {
//   constructor(private httpClient: HttpClient) {
//     this.newRound();
//     // this.promptAndOptions();
//   }
//   newRound() {
//     this.httpClient
//       .get<PromptItem[]>("assets/prompts.json")
//     .subscribe((res) => {
//       var j = Math.floor(Math.random() * Math.floor(11));
//       return res[j].prompt;
//     });
// }
// }
export class StatsTabsComponent implements OnInit {
  public tab$: Observable<any>;
  // public round$: Observable<CurrentRound>;
  // private round: number = 0;
  // public currentPrompt;
  round$: Observable<GameState>;
  GameSubscription: Subscription;
  // prompt;
  prompt: string = "Nothing to see here";
  roundNum: number = 0;
  gameError: Error = null;
  currentInt = Math.random() * Math.floor(11);
  constructor(
    private store: Store<{ tab: any }>,
    private _store: Store<{ round: GameState }>, // private _store: Store<AppState>, // private httpClient: HttpClient,
  ) {
    this.tab$ = store.pipe(select("tab"));
    this.round$ = _store.pipe(select("round"));
  }

  ngOnInit() {
    console.log("GameState", GameState);
    console.log("prompt", this.prompt);
    console.log("roundNum", this.roundNum);
    console.log("round$", this.round$);
  }

  onChangeTab(event) {
    this.store.dispatch(tabChangedAction({ selectedTab: event }));
  }

  newRound() {
    this.currentInt = this.currentInt;
    this.GameSubscription = this.round$
      .pipe(
        map((x, i) => {
          console.log("x", x);
          this.prompt = x.prompt.prompt;
          this.gameError = x.gameError;
          if (i === 2) {
            this.roundNum = x.roundNum++;
          }
        }),
      )
      .subscribe();

    this._store.dispatch(GameActions.NewRoundAction());
    this._store.dispatch(GameActions.BeginnewPromptAction());
  }

  newGame() {
    this._store.dispatch(GameActions.NewGameAction());
    this._store.dispatch(GameActions.BeginnewPromptAction());
  }

  // ngOnDestroy() {
  //   if (this.GameSubscription) {
  //     this.GameSubscription.unsubscribe();
  //   }
  // }
}
