import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Store, select } from "@ngrx/store";
// import { Observable } from "rxjs/Observable";
import { Observable, Subscription } from "rxjs/Rx";
import { map } from "rxjs/operators";

// Tabs
import { tabChangedAction } from "../store/tabs/tabs.actions";

// Game round and prompt
import GameState from "../store/game/state";
import * as GameActions from "../store/game/actions";
import { state } from "@angular/animations";

// Submissions
import * as SubmissionsActions from '../store/submissions/actions';
import { Submissions } from '../store/submissions/models';
import { SubmissionsState } from '../store/submissions/state';
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
  submissions$: Observable<SubmissionsState>;
  round$: Observable<GameState>;
  GameSubscription: Subscription;


  SubmissionsSubscription: Subscription;
  prompt: string = "Nothing to see here";
  roundNum: number = 0;
  gameError: Error = null;
  currentInt = Math.random() * Math.floor(11);
  SubmissionsList: Submissions[] = [];
  submissionsError: Error = null;
  Title: string = '';
  IsCompleted: boolean = false;
  submittedAnswers = [];

  constructor(
    private _store: Store<{ tab: any, round: GameState, submissions: SubmissionsState }>, // private _store: Store<AppState>, // private httpClient: HttpClient,
  ) {
    this.tab$ = _store.pipe(select("tab"));
    this.submissions$ = _store.pipe(select("submissions"));
    this.round$ = _store.pipe(select("round"));
  }

  ngOnInit() {
    console.log('this.store', this._store)
    this.SubmissionsSubscription = this.submissions$
      .pipe(
        map(x => {
          this.SubmissionsList = x.Submissions;
          this.submissionsError = x.SubmissionsError;
        })
      )
      .subscribe();

    this._store.dispatch(SubmissionsActions.BeginGetSubmissionsAction());
  }

  onChangeTab(event) {
    this._store.dispatch(tabChangedAction({ selectedTab: event }));
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

  submissionsTab() {
    const submissions: Submissions = { Title: this.Title, IsCompleted: this.IsCompleted };
    this._store.dispatch(SubmissionsActions.BeginCreateSubmissionsAction({ payload: submissions }));
    this.Title = '';
    this.IsCompleted = false;


    for (var i = 0; i < this.SubmissionsList.length; i++) {
      this.submittedAnswers.push(this.SubmissionsList[i])
    }


  }

  // ngOnDestroy() {
  //   if (this.SubmissionsSubscription) {
  //     this.SubmissionsSubscription.unsubscribe();
  //   }
  // }
}
