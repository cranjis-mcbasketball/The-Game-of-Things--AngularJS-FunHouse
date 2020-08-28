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
  selector: "player1",
  templateUrl: "./player1.component.html",
  styleUrls: ["./player1.component.scss"],
})
export class Player1Component {
  beginnings = [
    "Beginning 1",
    "Beginning 2",
    "Beginning 3",
    "Beginning 4",
    "Beginning 5",
    "Beginning 6",
  ];

  middles = [
    "Middle 1",
    "Middle 2",
    "Middle 3",
    "Middle 4",
    "Middle 5",
    "Middle 6",
  ];

  ends = ["End 1", "End 2", "End 3", "End 4", "End 5", "End 6"];

  response = [];

  itemsWithOrder: any;

  ngOnInit() {
    this.itemsWithOrder = this.response;
  }

  viewOrderRes() {
    this.response.map((item, index) => {
      console.log("this.response", this.response);
      item = { ...item, order: index };
      var itemVal = Object.values(item).join("");
      itemVal = itemVal.slice(0, itemVal.length - 1);
      if (this.beginnings.indexOf(itemVal) !== -1) {
        this.response[0] = item;
      } else if (this.middles.indexOf(itemVal) !== -1) {
        this.response[1] = item;
      } else if (this.ends.indexOf(itemVal) !== -1) {
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
      console.log(
        "this.beginnings, event.previousContainer.data",
        this.beginnings,
        event.previousContainer.data,
      );

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
      if (event.currentIndex !== 1) {
        event.currentIndex = 1;
      }

      if (event.previousContainer.data.length < 6) {
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
      if (event.currentIndex !== 2) {
        event.currentIndex = 2;

        if (event.previousContainer.data.length < 6) {
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
        this.viewOrderRes();
      }
    }
  }
}
