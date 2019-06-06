import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
} from './types';
import axios from '../../axios-orders';

export const addIngredient = ingredientName => ({
  type: ADD_INGREDIENT,
  ingredientName,
});

export const removeIngredient = ingredientName => ({
  type: REMOVE_INGREDIENT,
  ingredientName,
});

export const setIngredients = ingredients => ({
  type: SET_INGREDIENTS,
  ingredients,
});

export const fetchIngredientsFailed = () => ({
  type: FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => dispatch => {
  axios
    .get('https://my-burguer-builder.firebaseio.com/ingredients.json')
    .then(response => {
      dispatch(setIngredients(response.data));
    })
    .catch(error => {
      dispatch(fetchIngredientsFailed());
    });
};
