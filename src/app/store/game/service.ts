import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PromptItem } from "./models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GameHttpService {
  private ApiURL: string = "assets/prompts.json";
  constructor(private httpclient: HttpClient) {}

  getPrompts(): Observable<PromptItem[]> {
    return this.httpclient.get<PromptItem[]>(this.ApiURL);
  }
}

// @Injectable()
// export class GameService {
//   public currentPrompt;
//   constructor(public httpClient: HttpClient) {
//     this.getPrompt();

//     // this.promptAndOptions();
//   }
//   ngOnInit() {
//     // this.itemsWithOrder = this.items;
//     this.getPrompt();
//   }
//   getPrompt() {
//     this.httpClient
//       .get<PromptItem[]>("assets/prompts.json")
//       .subscribe((res) => {
//         var j = Math.floor(Math.random() * Math.floor(11));
//         this.currentPrompt = res[j].prompt;
//         return res[j].prompt;
//       });
//   }
// }
