export class Validation {
  static validEmail(email) {
    let reg = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,5}$/;
    if (reg.test(email) === true) {
      return true;
    }
    return false;
  }

  static checkMobile(mobile) {
    let regMobile = /^(\+\d{1,2}|0)?9\d{9}$/;
    if (regMobile.test(mobile) === true) {
      return true;
    } else {
      return false;
    }
  }

  static checkPassword(Password, ConfirmPassword) {
    if (Password == ConfirmPassword) {
      return true;
    } else {
      return false;
    }
  }
}
