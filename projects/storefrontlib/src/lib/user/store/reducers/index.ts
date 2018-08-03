import {
  ActionReducerMap,
  MemoizedSelector,
  MetaReducer,
  ActionReducer,
  createFeatureSelector
} from '@ngrx/store';

import * as fromUserDetailsReducer from './user-details.reducer';
import * as fromUserAddresses from './user-addresses.reducer';
import * as fromPaymentMethods from './payment-methods.reducer';
import * as fromUserOrders from './user-orders.reducer';
import * as fromTitlesReducer from './titles.reducer';
import * as fromDeliveryCountries from './delivery-countries.reducer';

import * as fromAction from '../actions';
import * as fromSiteContextAction from '../../../site-context/shared/store/actions';

export interface UserState {
  account: fromUserDetailsReducer.UserDetailsState;
  addresses: fromUserAddresses.UserAddressesState;
  countries: fromDeliveryCountries.DeliveryCountriesState;
  payments: fromPaymentMethods.UserPaymentMethodsState;
  orders: fromUserOrders.UserOrdersState;
  titles: fromTitlesReducer.TitlesState;
}

export const reducers: ActionReducerMap<UserState> = {
  account: fromUserDetailsReducer.reducer,
  addresses: fromUserAddresses.reducer,
  payments: fromPaymentMethods.reducer,
  orders: fromUserOrders.reducer,
  countries: fromDeliveryCountries.reducer,
  titles: fromTitlesReducer.reducer
};

export const getUserState: MemoizedSelector<
  any,
  UserState
> = createFeatureSelector<UserState>('user');

export function clearUserState(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function(state, action) {
    if (action.type === fromAction.LOGOUT) {
      state = undefined;
    } else if (
      action.type === fromSiteContextAction.LANGUAGE_CHANGE ||
      action.type === fromSiteContextAction.CURRENCY_CHANGE
    ) {
      action = new fromAction.ClearMiscsData();
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearUserState];
