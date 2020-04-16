/* eslint-disable no-undef */
import {
  SET_APP_LANGUAGE,
  SET_FILTER_ELEMENT,
  SET_DEFAULT_LANGUAGE,
} from './../Actions/type';
import commonUtility from '../../../CommonFiles/commonUtility';
const initialState = {
  elements: [],
  element: {},
  elementTitle: '',
  elementPlaceHolder: '',
  key: '',
  TLID: 'ENG',
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
      return filterResult;
    case SET_DEFAULT_LANGUAGE:
      let resultDefault = {
        ...state,
        TLID: action.payload,
      };
      return resultDefault;
    default:
      return state;
  }
}
