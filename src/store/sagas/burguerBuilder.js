import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

import {
  setIngredients,
  fetchIngredientsFailed,
} from '../actions/burguerBuilder';

export function* initIngredientsSaga(action) {
  const response = yield axios.get(
    'https://my-burguer-builder.firebaseio.com/ingredients.json'
  );

  try {
    yield put(setIngredients(response.data));
  } catch (error) {
    yield put(fetchIngredientsFailed(error));
  }
}
