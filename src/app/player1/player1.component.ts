import { Component, OnInit, Input, AfterViewInit, ElementRef, NgZone, ViewChild } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDragMove

} from "@angular/cdk/drag-drop";
import { HttpClient } from "@angular/common/http";
import * as States from "../store/game/state";
import { Observable } from "rxjs/Observable";
import { Store, select } from "@ngrx/store";
import { map } from "rxjs/operators";
// import { MatDialogRef } from '@angular/material';

// Game round and prompt
import GameState from "../store/game/state";
import * as GameActions from "../store/game/actions";
import { state } from "@angular/animations";


// Submissions
import * as SubmissionsActions from '../store/submissions/actions';
import { Submissions } from '../store/submissions/models';
import { SubmissionsState } from '../store/submissions/state';
import { SubmissionsReducer } from '../store/submissions/reducer';
import { Subscription } from 'rxjs';
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

  @ViewChild('resizeBox') resizeBox: ElementRef;
  @ViewChild('dragHandleCorner') dragHandleCorner: ElementRef;
  @ViewChild('dragHandleRight') dragHandleRight: ElementRef;
  @ViewChild('dragHandleBottom') dragHandleBottom: ElementRef;

  get resizeBoxElement(): HTMLElement {
    return this.resizeBox.nativeElement;
  }


  get dragHandleCornerElement(): HTMLElement {
    return this.dragHandleCorner.nativeElement;
  }

  get dragHandleRightElement(): HTMLElement {
    return this.dragHandleRight.nativeElement;
  }

  get dragHandleBottomElement(): HTMLElement {
    return this.dragHandleBottom.nativeElement;
  }

  fragmentsData: Fragments[];

  submissions$: Observable<SubmissionsState>;
  round$: Observable<GameState>;
  SubmissionsSubscription: Subscription;
  SubmissionsList: Submissions[] = [];
  submissionsError: Error = null;
  userResponse: string = '';
  userName: string = '';
  submittedAnswers = [];
  // game$: Observable<any>;
  // promptAndOptions$: Observable<any>;
  // beginnings = ["1", "1", "1", "1", "1", "1"];
  // middles = ["2", "2", "2", "2", "2", "2"];
  // ends = ["3", "3", "3", "3", "3", "3"];
  // prompt = "";


  constructor(
    private httpClient: HttpClient,
    private ngZone: NgZone,
    // dialogRef: MatDialogRef<Player1Component>,
    private store: Store<{ tab: any, round: GameState, submissions: SubmissionsState }>
  ) {
    this.getFragList();
    this.submissions$ = store.pipe(select("submissions"));
    this.round$ = store.pipe(select("round"));
  }

  // constructor(private store: Store<{ promptOptions: any }>) {
  //   this.promptOptions$ = store.pipe(select("promptOptions"));
  // }

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
  // constructor(private store: Store<AppState>) {
  //   this.promptAndOptions = store.select("promptOptions");
  //   // this.prompt = this.promptAndOptions.prompt;
  // }



  ngOnInit() {
    this.itemsWithOrder = this.response;
    // this.getFragList();

    // this.SubmissionsSubscription = this.submissions$
    //   .pipe(
    //     map(x => {
    //       this.SubmissionsList = x.Submissions;
    //     })
    //   )
    //   .subscribe();

    // this.store.dispatch(SubmissionsActions.BeginGetSubmissionsAction());
  }


  ngAfterViewInit() {
    this.setAllHandleTransform();
  }

  setAllHandleTransform() {
    const rect = this.resizeBoxElement.getBoundingClientRect();
    this.setHandleTransform(this.dragHandleCornerElement, rect, 'both');
    this.setHandleTransform(this.dragHandleRightElement, rect, 'x');
    this.setHandleTransform(this.dragHandleBottomElement, rect, 'y');
  }

  setHandleTransform(
    dragHandle: HTMLElement,
    targetRect: ClientRect | DOMRect,
    position: 'x' | 'y' | 'both'
  ) {
    const dragRect = dragHandle.getBoundingClientRect();
    const translateX = targetRect.width - dragRect.width;
    const translateY = targetRect.height - dragRect.height;

    if (position === 'x') {
      dragHandle.style.transform = `translate3d(${translateX}px, 0, 0)`;
    }

    if (position === 'y') {
      dragHandle.style.transform = `translate3d(0, ${translateY}px, 0)`;
    }

    if (position === 'both') {
      dragHandle.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    }
  }

  dragMove(dragHandle: HTMLElement, $event: CdkDragMove<any>) {
    this.ngZone.runOutsideAngular(() => {
      this.resize(dragHandle, this.resizeBoxElement);
    });
  }

  resize(dragHandle: HTMLElement, target: HTMLElement) {
    const dragRect = dragHandle.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const width = dragRect.left - targetRect.left + dragRect.width;
    const height = dragRect.top - targetRect.top + dragRect.height;

    target.style.width = width + 'px';
    target.style.height = height + 'px';

    var choicesList = document.getElementsByClassName("choices-list");
    console.log('choicesList', choicesList)

    var col1 = document.getElementById("col1");
    var col2 = document.getElementById("col2");
    var col3 = document.getElementById("col3");

    var items1 = document.getElementById("beginning-list-item");
    var items2 = document.getElementById("middle-list-item");
    var items3 = document.getElementById("end-list-item");

    var bg = document.getElementById("beginning-options").children;
    var md = document.getElementById("middle-options").children;
    var en = document.getElementById("end-options").children;


    // col1.style.width = width / 3 + "px";
    // col2.style.width = width / 3 + "px";
    // col3.style.width = width / 3 + "px";

    // bg.style.width = width / 3 + "px";
    // bg.style.height = height + "px";

    for (var i = 0; i < bg.length; i++) {
      // bg[i].width = width / 3 + "px";
      // md[i].style.width = width / 3 + "px";
      // en[i].style.width = width / 3 + "px";

      bg[i].style.height = height / 8 + "px";
      md[i].style.height = height / 8 + "px";
      en[i].style.height = height / 8 + "px";

    }
    // col1.style.height = height + "px";
    // col2.style.height = height + "px";
    // col3.style.height = height + "px";
    // items1.style.height = height / 9 + "px";
    // items2.style.height = height / 9 + "px";
    // items3.style.height = height / 9 + "px";

    // for (var i = 0; i < choicesList.length; i++) {
    //   console.log('choicesList[i]', choicesList[i])
    //   choicesList[i].style.height = height / 9 + "px";
    // }

    this.setAllHandleTransform();
  }



  // ngAfterViewInit() {
  //   var handler = document.querySelector(".handler");
  //   var hhandler = document.querySelector(".hhandler");
  //   var wrapper = handler.closest(".wrapper");
  //   var hwrapper = hhandler.closest(".wrapper");
  //   // var wrapper = document.getElementsByClassName("wrapper");
  //   // var wrapper = document.getElementById("wrapper1");
  //   var boxChoices = wrapper.querySelector(".box");
  //   // var boxBeginnings = wrapper.querySelector("#beginning-options");
  //   // var boxMiddles = wrapper.querySelector("#middle-options");
  //   // var boxEndings = wrapper.querySelector("#end-options");
  //   var isHandlerDragging = false;
  //   var isHHandlerDragging = false;

  //   document.addEventListener("mousedown", function (e) {

  //     // If mousedown event is fired from .handler, toggle flag to true
  //     if (e.target === handler) {
  //       console.log("mousedown e.target:", e.target)
  //       isHandlerDragging = true;
  //     } else if (e.target === hhandler) {
  //       console.log("mousedown e.target:", e.target)
  //       isHHandlerDragging = true;
  //     }
  //   });

  //   document.addEventListener("mousemove", function (e) {


  //     if (!isHandlerDragging && !isHHandlerDragging) {
  //       return false;
  //     }
  //     console.log("mousemove e.target:", e.target)

  //     if (isHandlerDragging) {
  //       console.log('wrapper', wrapper)
  //       console.log(' wrapper.offsetLeft', wrapper.offsetLeft)
  //       var containerOffsetLeft = wrapper.offsetLeft;
  //       var pointerRelativeXpos = e.clientX - containerOffsetLeft;
  //       var boxChoicesminWidth = 60;
  //       boxChoices.style.width = Math.max(boxChoicesminWidth, pointerRelativeXpos - 8) + "px";
  //     }


  //     if (isHHandlerDragging) {
  //       console.log('hwrapper', hwrapper)
  //       console.log(' hwrapper.offsetLeft', hwrapper.offsetLeft)
  //       var hcontainerOffsetLeft = hwrapper.offsetLeft;
  //       var hpointerRelativeXpos = e.clientX - hcontainerOffsetLeft;
  //       var hboxChoicesminWidth = 60;
  //       boxChoices.style.width = Math.max(hboxChoicesminWidth, hpointerRelativeXpos - 8) + "px";
  //     }


  //     boxChoices.style.flexGrow = 0;

  //   });




  //   document.addEventListener("mouseup", function (e) {
  //     console.log("mouseup e.target:", e.target)
  //     isHandlerDragging = false;
  //     isHHandlerDragging = false;

  //   });

  // }

  submissionsTab() {
    console.log('this.SubmissionsList', this.SubmissionsList)
    const submissions: Submissions = { userResponse: this.userResponse, userName: this.userName };
    // this.store.dispatch(SubmissionsActions.BeginCreateSubmissionsAction({ payload: submissions }));

    this.SubmissionsSubscription = this.submissions$
      .pipe(
        map(x => {
          this.SubmissionsList = x.Submissions;
        })
      )
      .subscribe();

    this.store.dispatch(SubmissionsActions.BeginGetSubmissionsAction());
    this.userResponse = '';


    for (var i = 0; i < this.SubmissionsList.length; i++) {
      this.submittedAnswers.push(this.SubmissionsList[i])
    }

    this.store.subscribe(function () {
      localStorage.setItem('state', JSON.stringify(this.store.getState()));
    })

    // const array = createFormArrayState('userSubmission', ['']);
    // const updatedArray = setValue(['userSubmission'])(Submissions[]);
    // const updatedArrayUncurried = setValue(array, ['userSubmission']);
    // const updatedArrayViaAction = SubmissionsReducer(array, new SubmissionsActions.BeginCreateSubmissionsAction(array.id, ['userSubmission']));
    console.log('this.submittedAnswers', this.submittedAnswers)
    console.log('this.store', this.store)

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
