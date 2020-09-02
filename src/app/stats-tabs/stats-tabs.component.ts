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
// export class getPrompt {
//   constructor(private httpClient: HttpClient) {
//     this.getPrompt();
//     // this.promptAndOptions();
//   }
//   getPrompt() {
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
  prompt: PromptItem[] = [];
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

    this.getPrompt();
  }

  onChangeTab(event) {
    console.log("this.tab$", this.tab$);
    console.log("prompt changetab", this.prompt);
    console.log("new tab event", event);
    this.store.dispatch(tabChangedAction({ selectedTab: event }));
  }

  getPrompt() {
    console.log("GameState", GameState);
    console.log("prompt getPrompt", this.prompt);
    console.log("roundNum", this.roundNum);
    console.log("round$", this.round$);
    this.currentInt = this.currentInt;
    this.GameSubscription = this.round$
      .pipe(
        map((x) => {
          console.log("x", x);
          this.roundNum = x.roundNum++;
          this.prompt = x.prompt;
          this.gameError = x.gameError;
        }),
      )
      .subscribe();
    this._store.dispatch(GameActions.BeginGetPromptAction());

    this._store.dispatch(GameActions.NewRoundAction());
  }
}
