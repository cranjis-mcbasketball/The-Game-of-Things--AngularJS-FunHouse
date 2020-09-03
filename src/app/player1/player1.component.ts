import { Component, OnInit, Input } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { HttpClient } from "@angular/common/http";
import * as States from "../store/game/state";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
// import {
//   NewRoundAction,
//   newGameAction,
// } from "../store/game/fragments.actions";

export interface Fragments {
  order: number;
  beginning: string;
  middle: string;
  end: string;
}
@Component({
  selector: "player1",
  templateUrl: "./player1.component.html",
  styleUrls: ["./player1.component.scss"],
})
export class Player1Component implements OnInit {
  // round$: Observable<any>;
  // game$: Observable<any>;
  // promptAndOptions$: Observable<any>;
  // beginnings = ["1", "1", "1", "1", "1", "1"];
  // middles = ["2", "2", "2", "2", "2", "2"];
  // ends = ["3", "3", "3", "3", "3", "3"];
  // prompt = "";
  fragmentsData: Fragments[];

  constructor(
    private httpClient: HttpClient,
    private store: Store<{ round: any; game: any }>,
  ) {
    this.getFragList();
    // this.game$ = store.pipe(select("game"));
    // this.round$ = store.pipe(select("round"));
  }

  // constructor(private store: Store<{ promptOptions: any }>) {
  //   this.promptOptions$ = store.pipe(select("promptOptions"));
  // }

  beginnings = [];

  middles = [];

  ends = [];

  getFragList() {
    this.beginnings = [];

    this.middles = [];

    this.ends = [];
    this.httpClient
      .get<Fragments[]>("assets/fragments.json")
      .subscribe((list) => {
        this.fragmentsData = list;
        for (var i = 0; i < 6; i++) {
          var j = Math.floor(Math.random() * Math.floor(24));
          this.beginnings.push(list[j].beginning);
          this.middles.push(list[j].middle);
          this.ends.push(list[j].end);
        }
        // list.forEach((item, i) => {
        //   this.beginnings.push(item.beginning);
        //   this.middles.push(item.middle);
        //   this.ends.push(item.end);
        // })
        return list;
      });
  }
  response = [];

  itemsWithOrder: any;
  // dataData: any;
  // constructor(private store: Store<AppState>) {
  //   this.promptAndOptions = store.select("promptOptions");
  //   // this.prompt = this.promptAndOptions.prompt;
  // }

  ngOnInit() {
    this.itemsWithOrder = this.response;
    this.getFragList();
    // this.beginnings = this.promptAndOptions.options[0].player1.beginnings;
    // this.middles = this.promptAndOptions.options[0].player1[0].middles;
    // this.ends = this.promptAndOptions.options[0].player1.ends;
    // this.dataData = this.getFragList();
  }

  viewOrderRes() {
    this.response.map((item, index) => {
      console.log("this.response", this.response);
      item = { ...item, order: index };
      var itemVal = Object.values(item).join("");
      itemVal = itemVal.slice(0, itemVal.length - 1);
      if (this.response[0] === undefined) {
        this.response[0] = " ";
      }
      if (this.response[1] === undefined) {
        this.response[1] = " ";
      }
      if (this.response[2] === undefined) {
        this.response[2] = " ";
      }
      if (this.beginnings.indexOf(itemVal) !== -1) {
        this.response[0] = item;
      }
      if (this.middles.indexOf(itemVal) !== -1) {
        this.response[1] = item;
      }
      if (this.ends.indexOf(itemVal) !== -1) {
        this.response[2] = item;
      }
    });
    console.log("this.itemsWithOrder", this.itemsWithOrder);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (
      event.previousContainer.id === "beginning-options" &&
      event.container.id === "response-submission"
    ) {
      if (event.previousContainer.data.length < 6) {
        if (event.currentIndex !== 0) {
          event.currentIndex = 0;
        }

        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          0,
          event.previousContainer.data.length,
        );
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        0,
      );
    } else if (
      event.previousContainer.id === "middle-options" &&
      event.container.id === "response-submission"
    ) {
      if (event.previousContainer.data.length < 6) {
        if (event.currentIndex !== 1) {
          // if(event.container.data.length === 0){
          //   event.currentIndex = 0;
          // } else {}
          event.currentIndex = 1;
        }
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          1,
          event.previousContainer.data.length,
        );
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        1,
      );
    } else if (
      event.previousContainer.id === "end-options" &&
      event.container.id === "response-submission"
    ) {
      if (event.previousContainer.data.length < 6) {
        if (event.currentIndex !== 2) {
          event.currentIndex = 2;
        }
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          2,
          event.previousContainer.data.length,
        );
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        2,
      );
      // this.viewOrderRes();
    }
  }
}
