import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlicer';
import registerReducer from './registerSlicer';

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer
  }
});

export default store;