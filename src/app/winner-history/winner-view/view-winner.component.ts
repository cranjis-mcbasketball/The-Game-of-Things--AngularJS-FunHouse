// import {Component} from '@angular/core';
// import {Winner} from './winner-history.model';
// import {Observable} from 'rxjs';
// import {select, Store} from '@ngrx/store';
// import {WinnerRemove} from '../../store/winner-history/winner-history.actions';

// @Component({
//   selector: 'winner-history',
//   templateUrl: './view-winner.component.html',
//   styleUrls: ['./view-winner.component.scss']
// })

// export class WinnersViewComponent {
//   winners: Observable<Winner[]>;
//   constructor(private store: Store<{ winners: Winner[] }>) {
//     this.winners = store.pipe(select('winners'));
//   }

//   removeWinner(winnerIndex) {
//     this.store.dispatch(new WinnerRemove(winnerIndex));
//   }

// }
