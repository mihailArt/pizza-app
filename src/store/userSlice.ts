import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../components/interfaces';

interface userAuth {
  isLoggedIn: boolean;
  id: string;
  email: string;
  userName: string;
  phoneNumber: string;
  basketId: string | null;
}

const getUserFromLocalStorage = () => {
  return localStorage.getItem('userId');
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    id: getUserFromLocalStorage(),
    basketId: null
  } as userAuth,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<IUser>) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.userName = action.payload.name;
      state.phoneNumber = action.payload.phone;
      if (action.payload.basketId) {
        state.basketId = action.payload.basketId;
      }
      if (action.payload.id) {
        state.id = action.payload.id;
      }
    },
    setBasketId: (state, action: PayloadAction<string>) => {
      state.basketId = action.payload;
    }
  }
});

export const { setLoggedUser, setBasketId } = userSlice.actions;

export default userSlice.reducer;
