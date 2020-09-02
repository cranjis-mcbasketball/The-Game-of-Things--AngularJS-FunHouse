// @Injectable()
// export class ThingsEffects {
//   constructor(
//     private _updates$: StateUpdates<any>,
//     private _thingsService: ThingsService,
//   ) {}

// @Effect() getFragList$ = this._updates$
//   .whenAction(NEW_ROUND)
//   .filter(({ state, action }) =>
//     this.shouldFetchPosts(state.postsByReddit, action.payload),
//   )
//   .map(({ action }) => ({
//     type: NEW_ROUND,
//     payload: { thingsActions: action.payload },
//   }));

// @Effect() getFragListAndPrompt$ = this._updates$
//   .whenAction(NEW_ROUND)
//   .switchMap(({ action }) =>
//     this._thingsService.getFragList().map(({ data }) => ({
//       type: NEW_GAME,
//       payload: { fragmentData: action.payload.fragmentData, data },
//     })),
//   );

// private shouldFetchPosts(postsByReddit, thingsActions) {
//   const posts = postsByReddit[thingsActions];
//   if (!posts) {
//     return true;
//   }
//   if (posts.isFetching) {
//     return false;
//   }
//   return posts.didInvalidate;
// }
// }
