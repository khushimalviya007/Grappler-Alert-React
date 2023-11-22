import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { getCurrentUserDetails } from "../Authentication";

const initialState = {
    Alert: [],
  isLoading: false,
  error: null
};

export const fetchAlerts = () => {
  return async (dispatch) => {
    try {
      const localUser = getCurrentUserDetails();
      const id = localUser.id;

      const response = await axios.get(`http://localhost:8283/alerts/${id}`);
      dispatch(fetchDataSuccess(response.data.response));
    } catch (error) {
      console.error('Error fetching data:', error);
      dispatch(fetchDataFailure(error));
    }
  }
}

const alertSlice = createSlice(
  {
    name: 'Alert',
    initialState,
    reducers: {
      fetchDataRequest: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      fetchDataSuccess: (state, action) => {
        state.Alert = action.payload;
        console.log(state.Alert);
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
} = alertSlice.actions;

export default alertSlice.reducer;