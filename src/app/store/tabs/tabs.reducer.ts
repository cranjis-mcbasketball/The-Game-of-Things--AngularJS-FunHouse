import { createReducer, on } from '@ngrx/store';
import { tabChangedAction } from './tabs.actions';

export const initialState: any = {selectedTab: 'player 1'};

export const tabsReducer = createReducer(initialState,
  on(tabChangedAction, (state, { selectedTab }) => ({
    selectedTab: selectedTab,
  }))
);