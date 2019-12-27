import React,{Component} from 'react';
import {Text,StyleSheet,SafeAreaView,View} from 'react-native';
import {Button} from 'react-native-elements';
import FormButton from './../component/FormButton';
import FormInput from '../component/FormInput';

export default class Login extends Component{
    state ={
        email:'',
        password:''
    }

    render(){
        const {email,password} = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <FormInput name="email"
                            value={email}
                            placeholder="Enter Email"
                            iconName="ios-mail"
                            iconColor="#2c384A"
                ></FormInput>
                <FormInput
                        name="password"
                        value={password}
                        placeholder="Enter Password"
                        secureTextEntry
                        iconName="ios-lock"
                        iconColor="#2c384A"
                ></FormInput>
                <View style={styles.buttonContainer}>
                    <FormButton buttonType="outline"
                                title="LOGIN"
                                buttonColor="039BE5"
                    ></FormButton>
                </View>
                <Button
                    title="Don't Have an account? Sign Up"
                    titleStyle={{
                        color: '#F57C00'
                      }}
                    type="clear"
                ></Button>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    buttonContainer:{
        margin:25
    }
})