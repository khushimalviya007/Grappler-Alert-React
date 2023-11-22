import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { getCurrentUserDetails } from "../Authentication";

const initialState = {
  Notification: [],
  isLoading: false,
  error: null
};

export const fetchNotification = () => {
  return async (dispatch) => {
    try {
      const localUser = getCurrentUserDetails();
      const id = localUser.id;
      const response = await axios.get(`http://localhost:8283/notifications/${id}`);
      dispatch(fetchDataSuccess(response.data.response));
    } catch (error) {
      console.error('Error fetching data:', error);
      dispatch(fetchDataFailure(error));
    }
  }
}

const notificationSlice = createSlice(
  {
    name: 'Notification',
    initialState,
    reducers: {
      fetchDataRequest: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      fetchDataSuccess: (state, action) => {
        state.Notification = action.payload;
        console.log(state.Notification);
        state.isLoading = false;
        state.error = null;
      },
      fetchDataFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    },
  }
)

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
} = notificationSlice.actions;

export default notificationSlice.reducer;