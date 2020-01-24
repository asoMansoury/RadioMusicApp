import React, {Component} from 'react';
import { Text,View } from 'react-native';


export default class MusicProfile extends Component{
    

    render(){
        return(
            <View style={{flex:1,flexDirection:'column',justifyContent:'space-between'}}>
                <View ><Text>Profile</Text></View>
                <View><Text>Music</Text></View>
            </View>
            
        )
    }
}