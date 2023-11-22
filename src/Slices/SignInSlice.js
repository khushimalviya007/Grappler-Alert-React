import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    signin: [],
    isLoading: false,
    error: null,
  };
  export const getLoginStatus = ( loginDetails ) => {
    return async (dispatch) => {
        try {
            dispatch(fetchDataRequest());
            const response = await axios.post("http://localhost:8283/login", loginDetails);
            if(response.status ===200)
            {
              console.log(response.data.response);
              dispatch(fetchDataSuccess(response.data.response));
              return response.data.response;
            }
            else
            {
              dispatch(fetchDataFailure());
            }

        } catch (error) {
            dispatch(fetchDataFailure())
        }
    }
}
const signInSlice= createSlice(
    {
        name:'signin',
        initialState,
        reducers:{
            fetchDataRequest: (state) => {
                state.isLoading = true;
                state.error = null;
              },
              fetchDataSuccess: (state, action) => {
                state.signin = action.payload;
                console.log(state.signin);
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
} = signInSlice.actions;

export default signInSlice.reducer;