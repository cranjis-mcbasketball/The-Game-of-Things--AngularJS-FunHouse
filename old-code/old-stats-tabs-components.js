onNewRound() {
  this.store.dispatch(GameActions.NewRoundAction);
  // this._store.dispatch(NewRoundAction: {
  //     round: this.round++,
  //     prompt: this.currentPrompt,

  // });
}

onNewRound() {
  this._store.dispatch({
    type: NEW_ROUND,
    payload: {
      round: this.round++,
      prompt: this.currentPrompt,
    },
  });
}
onNewRound(event) {
  console.log(
    "this.round$",
    Object.keys(this._store["actionsObserver"]["_value"]),
  );
  //this._store.ActionsSubject._value.game_id
  console.log(
    'this._store["actionsObserver"]',
    this._store["actionsObserver"],
  );
  this._store.dispatch(
    // NewRoundAction
    NewRoundAction({
      round: 1,
      prompt: this.currentPrompt,
      // game_id: event.state.game_id,
      // round: event.state.round,
      // prompt: event.state.prompt,
    }),
  );
  console.log(this._store["actionsObserver"]["_value"]["game_id"]);
}

onNewGame(event) {
  console.log("this.game$", this.game$);
  console.log("new game event", event);
  this.store.dispatch(
    newGameAction({
      round: event.round;
      prompt: event.prompt,
    }),
  );
}

drop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );

    this.viewOrder();
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}

copy array of items to other and add order property
viewOrder() {
  this.itemsWithOrder = [];
  this.items.map((item, index) => {
    item = { ...item, order: index };
    this.itemsWithOrder.push(item);
  });


  const newPrompt: PromptItem = {
    prompt: this.prompt,
  };
  this._store.dispatch(GameActions.BeginGetPromptAction());

  this.httpClient
    .get<PromptItem[]>("assets/prompts.json")
    .subscribe((res) => {
      var j = Math.floor(Math.random() * Math.floor(11));
      this.currentPrompt = res[j].prompt;
      return res[j].prompt;
    });

        console.log("round$", this.round$);
    this.GameSubscription = this.round$
      .pipe(
        map((x) => {
          this.roundNum = x.roundNum;
          this.prompt = x.prompt;
          this.gameError = x.gameError;
        }),
      )
      .subscribe();
    this._store.dispatch(GameActions.BeginGetPromptAction());
    this.itemsWithOrder = this.items;