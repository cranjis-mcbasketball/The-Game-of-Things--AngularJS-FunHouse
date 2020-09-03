import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tabChangedAction } from '../store/tabs/tabs.actions';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import GameState from "../store/game/state";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  tab$: Observable<any>;
  round$: Observable<GameState>;


  constructor(private store: Store<{ tab: any }>) {
    this.tab$ = store.pipe(select('tab'));
    this.round$ = store.pipe(select("round"));
  }



  items: any = [
    { name: "HSBC" },
    { name: "Nubank" },
    { name: "Banco do Brasil" },
    { name: "Deutsche Bank" },
    { name: "Santander" }
  ];

  itemsWithOrder: any;



  // items: any = [
  //   { name: "HSBC" },
  //   { name: "Nubank" },
  //   { name: "Banco do Brasil" },
  //   { name: "Deutsche Bank" },
  //   { name: "Santander" }
  // ];



  ngOnInit() {
    this.itemsWithOrder = this.items
  }

  onChangeTab(event) {
    this.store.dispatch(tabChangedAction({ selectedTab: event }));
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      this.viewOrder();
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // copy array of items to other and add order property
  viewOrder() {
    this.itemsWithOrder = [];
    this.items.map((item, index) => {
      item = { ...item, order: index };
      this.itemsWithOrder.push(item);
    });
  }

}
