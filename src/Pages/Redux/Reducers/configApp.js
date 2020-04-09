/* eslint-disable no-undef */
import {SET_APP_LANGUAGE, SET_FILTER_ELEMENT} from './../Actions/type';
import commonUtility from '../../../CommonFiles/commonUtility';
const initialState = {
  elements: [],
  element: {},
  elementTitle: '',
  elementPlaceHolder: '',
  key: '',
};
export default function configApp(state = initialState, action = {}) {
  const {payload} = action;
  switch (action.type) {
    case SET_APP_LANGUAGE:
      let result = {
        ...state,
        elements: payload,
      };
      commonUtility.setElements(payload);
      return result;
    case SET_FILTER_ELEMENT:
      let elementVal = state.elements.filter(
        element => element.ElementID === payload,
      )[0];
      let filterResult = {
        ...state,
        element: elementVal,
        elementTitle: elementVal.ElementTitle,
        elementPlaceHolder: elementVal.ElementPlaceHolder,
      };
      console.log('filter State menet : ', filterResult);
      return filterResult;
    default:
      return state;
  }
}
