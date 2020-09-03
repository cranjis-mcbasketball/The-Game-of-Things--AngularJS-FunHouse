import { Component } from "@angular/core";
import {
    CdkDragDrop,
    moveItemInArray,
    transferArrayItem,
} from "@angular/cdk/drag-drop";
import { HttpClient } from "@angular/common/http";

export interface Responses {
    name: string;
    response: string;
    date: Date;
}
@Component({
    selector: "judge-stuff",
    templateUrl: "./judge.component.html",
    styleUrls: ["./judge.component.scss"],
})
export class JudgeComponent {
    responsesData: Responses[];
    responseArr = [];

    constructor(private httpClient: HttpClient) {
        this.getResponses();
    }

    itemsWithOrder: any;


    names = [];

    responses = [];

    dates = [];

    getResponses() {
        this.httpClient
            .get<Responses[]>("assets/responses.json")
            .subscribe((list) => {
                this.responsesData = list;
                for (var i = 0; i < 4; i++) {
                    this.names.push(list[i].name);
                    this.responses.push(list[i].response);
                    this.dates.push(list[i].date);
                }
                return list;
            });
    }





    ngOnInit() {
        this.itemsWithOrder = this.responses
    }

    viewOrder() {
        this.itemsWithOrder = [];
        this.responses.map((item, index) => {
            item = { ...item, order: index };
            this.itemsWithOrder.push(item);
        });
    }

    drop(event: CdkDragDrop<string[]>) {

        console.log('event.container.data', event.container)
        console.log('event.previousIndex, event.currentIndex', event.previousIndex, event.currentIndex)


        moveItemInArray(this.responses, event.previousIndex, event.currentIndex);

        this.viewOrder();


    }
}
