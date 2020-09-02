// export const ADD_RESPONSE = "ADD_RESPONSE";

// export class NewRound implements Action {
//   readonly type = NEW_ROUND;

//   constructor(public payload: PromptAndOptions) {}
// }

// export class NewGame implements Action {
//   readonly type = NEW_GAME;

//   constructor(public payload: PromptAndOptions) {}
// }

// export const NewRoundAction = createAction(
//   "[NewRound action] NewRoundAction",
//   props<{ game_id: number; round: number; prompt: string }>(),
// );

// export const newGameAction = createAction(
//   "[NewGame action] newGameAction",
//   props<{ game_id: number; round: 1; prompt: string }>(),
// );

// export type Actions = NewRound | NewGame;

// @Injectable()
// export class ThingsService {
//   fragmentsData: FragmentItem[];
//   promptData: PromptItem[];

//   constructor(private httpClient: HttpClient) {
//     this.getFragList();
//     this.getPrompt();
//     this.promptAndOptions();
//   }
//   getFragList() {
//     this.httpClient
//       .get<FragmentItem[]>("assets/fragments.json")
//       .subscribe((res) => {
//         // this.fragmentsData = res;
//         console.log("got fragments in service file");
//         // return res;
//         var selectedFragmentsArr = [
//           {
//             player1: {
//               beginnings: [],
//               middles: [],
//               ends: [],
//             },
//           },
//           {
//             player2: {
//               beginnings: [],
//               middles: [],
//               ends: [],
//             },
//           },
//           {
//             player3: {
//               beginnings: [],
//               middles: [],
//               ends: [],
//             },
//           },
//           {
//             player4: {
//               beginnings: [],
//               middles: [],
//               ends: [],
//             },
//           },
//         ];
//         for (var p = 0; p < selectedFragmentsArr.length; p++) {
//           // var beginnings = [];
//           // var middles = [];
//           // var ends = [];
//           // var all = [];
//           for (var i = 0; i < 6; i++) {
//             var j = Math.floor(Math.random() * Math.floor(24));
//             var k = Math.floor(Math.random() * Math.floor(24));
//             var l = Math.floor(Math.random() * Math.floor(24));
//             selectedFragmentsArr[p][`player${p + 1}`].beginnings.push(
//               res[j].beginning,
//             );
//             selectedFragmentsArr[p][`player${p + 1}`].middles.push(
//               res[k].middle,
//             );
//             selectedFragmentsArr[p][`player${p + 1}`].ends.push(res[l].end);
//           }
//         }

//         return selectedFragmentsArr;
//       });
//   }

//   getPrompt() {
//     this.httpClient
//       .get<PromptItem[]>("assets/prompts.json")
//       .subscribe((res) => {
//         var j = Math.floor(Math.random() * Math.floor(11));
//         return res[j].prompt;
//       });
//   }

//   promptAndOptions() {
//     var result = {
//       prompt: this.getPrompt(),
//       options: this.getFragList(),
//     };
//     console.log(result);
//     return result;
//   }
// }

//     constructor(private http : Http){}

//     fetchPosts(reddit : string){
//       return this.http
//     .get("assets/fragments.json")
//     ((res) => res.json()
//         var beginnings = [];

//         var middles = [];

//         var ends = [];

//         for (var i = 0; i < 6; i++) {
// var j = Math.floor(Math.random() * Math.floor(24));
// var k = Math.floor(Math.random() * Math.floor(24));
// var l = Math.floor(Math.random() * Math.floor(24));
// beginnings.push(res[j].beginning);
// middles.push(res[k].middle);
// ends.push(res[l].end);
//         }

//       });
