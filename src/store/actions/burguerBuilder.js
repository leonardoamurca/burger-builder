import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
  INITIALIZE_INGREDIENTS,
} from './types';

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

export const fetchIngredientsFailed = error => ({
  type: FETCH_INGREDIENTS_FAILED,
  error,
});

export const initIngredients = () => {
  return {
    type: INITIALIZE_INGREDIENTS,
  };
};
