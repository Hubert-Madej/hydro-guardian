import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateKey } from '../../../shared/enums/state-key.enum';
import { AuthState } from '../reducers/auth.reducers';

const selectAuthState = createFeatureSelector<AuthState>(StateKey.Auth);

export const selectAuthToken = createSelector(selectAuthState, (state) => state.token);

export const selectAuthUser = createSelector(selectAuthState, (state) => state.authUser);

export const selectTokenExpirationDate = createSelector(selectAuthState, (state) => state.tokenExpirationDate);
