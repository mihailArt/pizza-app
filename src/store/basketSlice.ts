import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBasketElement } from '../components/interfaces';

interface FoodListState {
  generalSum: number;
  deliveryPrice: number;
  foodList: IBasketElement[];
}

const initialState: FoodListState = {
  generalSum: 0,
  deliveryPrice: 10,
  foodList: []
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<IBasketElement[]>) => {
      state.foodList = action.payload;
      let sum = 0;
      for (const elem of action.payload) {
        sum += elem.sum;
      }
      state.generalSum = sum;
    },
    addFood: (state, action: PayloadAction<IBasketElement>) => {
      if (!state.foodList.filter((elem) => elem.name === action.payload.name).length) {
        state.foodList.push(action.payload);
        state.generalSum += action.payload.sum;
      }
    },
    increaseCount: (state, action: PayloadAction<string>) => {
      state.foodList = state.foodList.map((elem) => {
        if (elem.name === action.payload) {
          const newElem = {
            ...elem,
            sum: elem.costWithToppings * (elem.count + 1),
            count: elem.count + 1
          };
          state.generalSum += newElem.sum - elem.sum;
          return newElem;
        } else {
          return elem;
        }
      });
    },
    decreaseCount: (state, action: PayloadAction<string>) => {
      state.foodList = state.foodList.map((elem) => {
        if (elem.name === action.payload) {
          const newElem = {
            ...elem,
            count: elem.count === 1 ? 1 : elem.count - 1,
            sum: elem.count === 1 ? elem.costWithToppings : elem.costWithToppings * (elem.count - 1)
          };
          state.generalSum -= elem.sum - newElem.sum;
          return newElem;
        } else {
          return elem;
        }
      });
    },
    deleteFood: (state, action: PayloadAction<string>) => {
      state.foodList = state.foodList.filter((elem) => elem.name !== action.payload);
      let sum = 0;
      for (const elem of state.foodList) {
        sum += elem.sum;
      }
      state.generalSum = sum;
    },
    reset: () => initialState
  }
});

export const { addFood, increaseCount, decreaseCount, deleteFood, setBasket, reset } =
  basketSlice.actions;

export default basketSlice.reducer;
