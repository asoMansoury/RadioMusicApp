import React from 'react';
import {Button} from 'react-native-elements';

const FormButton = ({title,buttonType,buttonColor,...rest})=>{
    return  <Button 
        {...rest}
        type={buttonType}
        title={title}
        buttonStyle={{borderColor:buttonColor}}
        titleStyle={{color:buttonColor}}
    ></Button>
}

export default FormButton