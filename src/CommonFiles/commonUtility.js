import axios from 'axios';
import {BaseApiUrl} from './ConstantData';

export default class commonUtility {
  static Elements;
  static TLID;
  static UIErrorMessages;

  static setUIErrorMessages(TLID) {
    axios
      .get(BaseApiUrl + '/ErrorMessage/getValidationUI?TLID=' + TLID)
      .then(res => {
        if (res.data.isError === false) {
          this.UIErrorMessages = res.data.ErrorMessages;
          console.log(this.UIErrorMessages);
        }
      });
  }
  static getUIErrorMessages() {
    return this.UIErrorMessages;
  }
  static getUIErrorMessagesByCode(elementID) {
    if (this.UIErrorMessages !== undefined) {
      return this.UIErrorMessages.filter(
        element => element.Code === elementID,
      )[0].Message;
    } else {
      return '';
    }
  }
  static setTLID(value) {
    this.TLID = value;
  }

  static getTLID() {
    return this.TLID;
  }

  static setUserInformation(value) {
    this.UserInformation = value;
  }
  static setElements(value) {
    this.Elements = value;
  }

  static getElements() {
    return this.Elements;
  }

  static filterElement(elementID) {
    return this.Elements.filter(element => element.ElementID === elementID)[0];
  }

  static getElementTitle(elementID) {
    if (this.Elements !== undefined) {
      let result = this.Elements.filter(
        element => element.ElementID === elementID,
      )[0];
      if (result === undefined) {
        return elementID;
      }

      return result.ElementTitle;
    } else {
      return '';
    }
  }

  static getElementPlaceHolder(elementID) {
    if (this.Elements !== undefined) {
      let result = this.Elements.filter(
        element => element.ElementID === elementID,
      )[0];
      if (result === undefined) {
        return elementID;
      }
      return result.ElementPlaceHolder;
    } else {
      return elementID;
    }
  }
}
