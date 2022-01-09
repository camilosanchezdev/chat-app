import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store'
import { AuthState } from '../app.state'
export const selectAuth = createFeatureSelector<AuthState>('app')
export const getToken = (): MemoizedSelector<object, string> => createSelector(selectAuth, (state: AuthState) => state.token)
