import { configureStore } from "@reduxjs/toolkit";
import ShowRulesSlice from "./Slices/ShowRulesSlice";
import SignInSlice from "./Slices/SignInSlice";
import NotificationSlice from "./Slices/NotificationSlice";
import AlertSlice from "./Slices/AlertSlice";

const store = configureStore({
    reducer: {
     showRules : ShowRulesSlice,
     signIn : SignInSlice,
     Notification : NotificationSlice,
      Alert : AlertSlice
    },
  });
  export default store;