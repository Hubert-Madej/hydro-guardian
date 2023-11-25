import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StateKey } from '../../../shared/enums/state-key.enum';
import { AuthState } from '../reducers/auth.reducers';

const getAuthState = createFeatureSelector<AuthState>(StateKey.Auth);

export const getAuthToken = createSelector(getAuthState, (state) => state.token);

export const getAuthUser = createSelector(getAuthState, (state) => state.authUser);

export const getTokenExpirationDate = createSelector(getAuthState, (state) => state.tokenExpirationDate);
