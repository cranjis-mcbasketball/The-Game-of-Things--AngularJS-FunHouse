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
  selector: "player3",
  templateUrl: "./table.html",
  styleUrls: ["./player3.component.scss"],
})
export class Player3Component {
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

        for (var i = 0; i < 8; i++) {
          var j = Math.floor(Math.random() * Math.floor(list.length));
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

  ngOnInit() {
    this.itemsWithOrder = this.response;

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
