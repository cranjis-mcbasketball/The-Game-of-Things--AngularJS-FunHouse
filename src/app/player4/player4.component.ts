import { Component} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';


export interface Fragments {
  order: number;
  beginning: string;
  middle: string;
  end: string;
}
@Component({
  selector: 'player4',
  templateUrl: './player4.component.html',
  styleUrls: ['./player4.component.scss']
})
export class Player4Component {

  beginnings = [
    'Beginning 1',
    'Beginning 2',
    'Beginning 3',
    'Beginning 4'
  ];

  middles = [
    'Middle 1',
    'Middle 2',
    'Middle 3',
    'Middle 4'
  ];

  ends = [
    'End 1',
    'End 2',
    'End 3',
    'End 4'
  ];

  response = [

  ];

  itemsWithOrder: any;

  ngOnInit() {
    this.itemsWithOrder = this.response;
  }


}
