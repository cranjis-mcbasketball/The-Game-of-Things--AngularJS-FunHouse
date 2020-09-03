import { Component } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { HttpClient } from "@angular/common/http";

export interface Fragments {
  order: number;
  beginning: string;
  middle: string;
  end: string;
}
@Component({
  selector: "player2",
  templateUrl: "./player2.component.html",
  styleUrls: ["./player2.component.scss"],
})
export class Player2Component {
  fragmentsData: Fragments[];

  constructor(private httpClient: HttpClient) {
    this.getFragList();
  }

  beginnings = [];

  middles = [];

  ends = [];

  getFragList() {
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
        return list;
      });
  }

  response = [];

  itemsWithOrder: any;

  ngOnInit() {
    this.itemsWithOrder = this.response;
  }

  viewOrderRes() {
    this.response.map((item, index) => {
      ;
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
    }
  }
}
