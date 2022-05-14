import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store'
import { ContactModel } from 'src/app/common/models/contact.model'
import { UserModel } from 'src/app/common/models/user.model'
import { AuthState } from '../app.state'
export const selectAuth = createFeatureSelector<AuthState>('app')
export const getToken = (): MemoizedSelector<object, string> => createSelector(selectAuth, (state: AuthState) => state.token)
export const getCurrentReceiver = (): MemoizedSelector<object, UserModel> => createSelector(selectAuth, (state: AuthState) => state.currentReceiver)
export const getContacts = (): MemoizedSelector<object, any> => createSelector(selectAuth, (state: AuthState) => state.contacts)

export const getUserId = (): MemoizedSelector<object, number> => createSelector(selectAuth, (state: AuthState) => state.userId)
export const getOnlineUsers = (): MemoizedSelector<object, UserModel[]> => createSelector(selectAuth, (state: AuthState) => state.onlineUsers)
