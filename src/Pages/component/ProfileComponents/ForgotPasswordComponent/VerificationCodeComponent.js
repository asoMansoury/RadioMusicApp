import React from 'react';
import {View} from 'react-native';
export default class VerificationCodeComponent extends React.Component{
    constructor(props){
        super(props);
        console.log(props)
    }

    render(){
        if(this.props.hide===false)
            return null;
        return(
            <View style={{marginTop:1,flex:1,width:'100%',justifyContent:'center',alignItems:'center'}}>
                {this.props.children}
            </View>
        )
    }
}