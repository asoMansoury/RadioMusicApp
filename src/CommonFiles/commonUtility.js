export default class commonUtility {
  static Elements;

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
