import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    rules: [],
    isLoading: false,
    error: null,
  };


// export const fetchRules=()=>async (dispatch) => {
//     dispatch(fetchDataRequest());
//     try {
//       const response = await axios.get('http://localhost:8080/blogger/rules');
//       // console.log(response.data);
//       dispatch(fetchDataSuccess(response.data));
//     } catch (error) {
//       console.error('Error fetching articles:', error);
//       dispatch(fetchDataFailure(error));
//     }
//   };

const rulesSlice= createSlice(
    {
        name:'rules',
        initialState,
        reducers:{
            fetchDataRequest: (state) => {
                state.isLoading = true;
                state.error = null;
              },
              fetchDataSuccess: (state, action) => {
                state.rules = action.payload;
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