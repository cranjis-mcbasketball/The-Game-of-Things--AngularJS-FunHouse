// var getFragTest = function () {
//   var beginnings = [];
//   var middles = [];
//   var ends = [];
//   var all = [];
//   for (var i = 0; i < 8; i++) {
//     var j = Math.floor(Math.random() * Math.floor(list.length));
//     var k = Math.floor(Math.random() * Math.floor(list.length));
//     var l = Math.floor(Math.random() * Math.floor(list.length));
//     beginnings.push(j);
//     middles.push(k);
//     ends.push(l);
//   }
//   all.push(beginnings);
//   all.push(middles);
//   all.push(ends);
//   console.log(beginnings);
//   console.log(all[0]);
//   console.log(all[2]);
//   console.log(all);
//   return all;
// };
// var test = getFragTest();

// const prompts = [
//   "things you wouldn't do on an airplane",
//   "things that you wouldn't say to your teacher",
//   "things you want to do when quarantine is over",
//   "things you tell the priest at confession",
//   "things a grandparent would have said when they were your age",
//   "things you don't say to highway patrol when you get pulled over",
//   "things you wouldn't want your boss walking in on you saying",
//   "things that indicate you live a healthy lifestyle",
//   "things not to do in a hospital",
//   "things you wouldn't say when the border officer asks you why you're visiting the country",
//   "things you shouldn't do in prison",
//   "things that will get the guy sitting next to you on the plane to get up and leave",
// ];
// var json = [];
// for (var i = 0; i < prompts.length; i++) {
//   var obj = {
//     order: i + 1,
//     prompt: prompts[i],
//   };
//   json.push(obj);
// }

// console.log(json);
// import { HttpClient } from "@angular/common/http";

// import {
//   FragmentItem,
//   PromptItem,
//   PromptAndOptions,
//   AppState,
// } from "./fragments.models";

// var frags2 = function() {
// this.httpClient
// .get<FragmentItem[]>("assets/fragments.json")
// .subscribe((res) => {
//   // this.fragmentsData = res;
//   console.log("got fragments in service file");
//   // return res;
//   var selectedFragmentsArr = [
//     {
//       player1: {
//         beginnings: [],
//         middles: [],
//         ends: [],
//       },
//     },
//     {
//       player2: {
//         beginnings: [],
//         middles: [],
//         ends: [],
//       },
//     },
//     {
//       player3: {
//         beginnings: [],
//         middles: [],
//         ends: [],
//       },
//     },
//     {
//       player4: {
//         beginnings: [],
//         middles: [],
//         ends: [],
//       },
//     },
//   ];
//   for (var p = 0; p < selectedFragmentsArr.length; p++) {
//     // var beginnings = [];
//     // var middles = [];
//     // var ends = [];
//     // var all = [];
//     for (var i = 0; i < 8; i++) {
//       var j = Math.floor(Math.random() * Math.floor(list.length));
//       var k = Math.floor(Math.random() * Math.floor(list.length));
//       var l = Math.floor(Math.random() * Math.floor(list.length));
//       selectedFragmentsArr[p][`player${p + 1}`].beginnings.push(
//         res[j].beginning,
//       );
//       selectedFragmentsArr[p][`player${p + 1}`].middles.push(
//         res[k].middle,
//       );
//       selectedFragmentsArr[p][`player${p + 1}`].ends.push(res[l].end);
//     }
//   }

//   return selectedFragmentsArr;
// });
// }

var fragments2 = function () {
  var selectedFragmentsArr = [
    {
      player1: {
        beginnings: ['one,' 'one', 'one'],
        middles: ['22one,' '22one', '22one'],
        ends: ['4343', '4343', '4343', '4343'],
      },
    },
    {
      player2: {
        beginnings: ['one,' 'one', 'one'],
        middles: ['22one,' '22one', '22one'],
        ends: ['4343', '4343', '4343', '4343'],
      },
    },
    {
      player3: {
        beginnings: ['one,' 'one', 'one'],
        middles: ['22one,' '22one', '22one'],
        ends: ['4343', '4343', '4343', '4343'],
      },
    },
    {
      player4: {
        beginnings: ['one,' 'one', 'one'],
        middles: ['22one,' '22one', '22one'],
        ends: ['4343', '4343', '4343', '4343'],
      },
    },
  ];
  for (var p = 0; p < selectedFragmentsArr.length; p++) {
    // var beginnings = [];
    // var middles = [];
    // var ends = [];
    // var all = [];
    for (var i = 0; i < 8; i++) {
      var j = Math.floor(Math.random() * Math.floor(list.length));
      var k = Math.floor(Math.random() * Math.floor(list.length));
      var l = Math.floor(Math.random() * Math.floor(list.length));
      selectedFragmentsArr[p][`player${p + 1}`].beginnings.push(j);
      selectedFragmentsArr[p][`player${p + 1}`].middles.push(k);
      selectedFragmentsArr[p][`player${p + 1}`].ends.push(l);
    }
  }
  console.log("selectedFragmentsArr.player1", selectedFragmentsArr[0].player1);
  console.log(
    "selectedFragmentsArr.player1.ends",
    selectedFragmentsArr[0].player1.ends,
  );
  console.log("selectedFragmentsArr", selectedFragmentsArr);
};

// all.push(beginnings);
// all.push(middles);
// all.push(ends);
fragments2();
