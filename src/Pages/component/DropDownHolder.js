export class DropDownHolder {
    static dropDown;

    static isShowDropDown;
    static setIsShowDropDown(value){
        this.isShowDropDown=value;
    }
    static getIsShowDropDown(){
        return this.isShowDropDown;
    }
    
    static setDropDown(dropDown) {
        this.dropDown = dropDown;
    }

    static getDropDown() {
        return this.dropDown;
    }

    static showAlert(errorType,errorTitle,errorDescription){

        if(errorType==='error')
            this.dropDown.alertWithType('error',errorTitle,errorDescription);
        else if(errorType==='info')
            this.dropDown.alertWithType('info',errorTitle,errorDescription);
        else if(errorType==='warn')
            this.dropDown.alertWithType('warn',errorTitle,errorDescription);
        else if(errorType==='success')
            this.dropDown.alertWithType('success',errorTitle,errorDescription);
        else if(errorType==='custom')
            this.dropDown.alertWithType('custom',errorTitle,errorDescription);
        else
            this.dropDown.alertWithType('error',errorTitle,errorDescription);
    }
}

// | 'info'
// | 'warn'
// | 'error'
// | 'custom'
// | 'success'