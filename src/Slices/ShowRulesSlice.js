import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
  showRules: [],
  isLoading: false,
  error: null,
};

export const fetchRules = () => async (dispatch) => {
  dispatch(fetchDataRequest());
  try {
    const response = await axios.get('http://localhost:8283/rules');
    console.log(response.data.response);
    if (response.status === 200) {
      dispatch(fetchDataSuccess(response.data.response));
    }
    else if (response.status === 404) {
      console.log('Rules not found:', response);
      dispatch(fetchDataFailure(response.data.message));
    }
    else {
      console.log('Other error:', response);
      dispatch(fetchDataFailure('Error fetching rules'));
    }
  } catch (error) {
    console.log('Error fetching rules:', error);
    dispatch(fetchDataFailure(error));
  }
};
export const ruleDeletee = (id) => async (dispatch) => {
  // dispatch(fetchDataRequest());
  try {
    const response = await axios.delete(`http://localhost:8283/rules/${id}`);
    console.log(response.data.response);
    dispatch(deleteRuleSucess(id));
  } catch (error) {
    console.error('Error Delete rules:', error);
    dispatch(fetchDataFailure(error));
  }
};

export const ruleEnable = (id) => async (dispatch) => {
  // dispatch(fetchDataRequest());
  try {
    console.log("khushiiiiiiii");
    const response = await axios.patch(`http://localhost:8283/rules/${id}`, { isEnabled: true });
    console.log("enable rule", response.data.response);
    // dispatch(fetchDataSuccess(id));
    dispatch(enableDisableSuccess(response.data.response));
  } catch (error) {
    console.error('Error disable rules:', error);
    dispatch(fetchDataFailure(error));
  }
};

export const ruleDisable = (id) => async (dispatch) => {
  // dispatch(fetchDataRequest());
  try {
    console.log("rishiiiiiii");
    const response = await axios.patch(`http://localhost:8283/rules/${id}`, { isEnabled: false });
    console.log("disable rule", response.data.response);
    // dispatch(fetchDataSuccess(id));
    dispatch(enableDisableSuccess(response.data.response));
  } catch (error) {
    console.error('Error enable rules:', error);
    dispatch(fetchDataFailure(error));
  }
};

const ShowRulesSlice = createSlice(
  {
    name: 'showRules',
    initialState,
    reducers: {
      fetchDataRequest: (state) => {
        state.isLoading = true;
        state.error = null;
      },
      fetchDataSuccess: (state, action) => {
        state.showRules = action.payload;
        state.isLoading = false;
        state.error = null;
      },
      fetchDataFailure: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

      },
      deleteRuleSucess: (state, action) => {
        state.showRules = state.showRules.filter((rule) => rule.id !== action.payload);
      },

      enableDisableSuccess: (state, action) => {
        let ruleId = action.payload.id;
        const index = state.showRules.findIndex((r) => r.id === ruleId);

        if(index != -1){
          state.showRules[index] = action.payload;
        }
      }
    },
  });

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  deleteRuleSucess,
  enableDisableSuccess,
} = ShowRulesSlice.actions;

export default ShowRulesSlice.reducer;