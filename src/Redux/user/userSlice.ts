/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface userData {
  id: string,
  name: string,
  email: string,
}

const initialState : userData = { id: '', name: '', email: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: {
      reducer(state, action: PayloadAction<userData>) {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
      },
      prepare(id, name, email) {
        return {
          payload: {
            id,
            name,
            email,
          },
        };
      },
    },
  },
});

export const { setUserData } = userSlice.actions;

export const user = (state : {user:userData}) => state.user;

export default userSlice.reducer;
