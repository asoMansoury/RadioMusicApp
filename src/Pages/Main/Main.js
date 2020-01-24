import React,{Component} from 'react';
import {Text, View} from 'react-native';
import BottomNavigation, {ShiftingTab} from 'react-native-material-bottom-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MusicProfile from './MyMusicProfile/MusicProfile';
import Browse from './Browse/Browse';
import Playlists from './Playlists/Playlists';
import Search from './Search/Search';
import Home from './Home/Home';


export default class Main extends Component{

    tabs = [
        {
            key: 'Home',
            icon: 'ios-home',
            label: 'Home',
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'Browse',
          icon: 'ios-browsers',
          label: 'Browse',
          barColor: '#388E3C',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'Search',
          icon: 'ios-search',
          label: 'Search',
          barColor: '#E64A19',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
          key: 'Playlists',
          icon: 'ios-list-box',
          label: 'Playlists',
          barColor: '#B71C1C',
          pressColor: 'rgba(255, 255, 255, 0.16)'
        },
        {
            key: 'MusicProfile',
            icon: 'ios-musical-notes',
            label: 'Music',
            barColor: '#E64A19',
            pressColor: 'rgba(255, 255, 255, 0.16)'
        }
      ]


    state= {
        activeTab:'MusicProfile',
    }

    renderIcon = icon =>({isActive})=>(
        <Ionicons name={icon} size={24} style={isActive===true?{ color:'white'}:{ color:'black'}} ></Ionicons>
    )

    renderTab=({tab,isActive})=>(
        <ShiftingTab
            isActive={isActive}
            key={tab.key}
            label={tab.label}
            renderIcon ={this.renderIcon(tab.icon)}
            
        ></ShiftingTab>
    )

    componentDidUpdate(){
    }


    renderView(){

    }

    render(){
        if(this.state.activeTab==='MusicProfile'){
            return(
                <View style={{flex:1}}>
                    <MusicProfile></MusicProfile>
                    <BottomNavigation
                        activeTab={this.state.activeTab}
                        renderTab={this.renderTab}
                        tabs = {this.tabs}
                        onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                        
                    >
    
                    </BottomNavigation>
                </View>
            )
        }else if(this.state.activeTab==='Browse'){
            return(
                <View style={{flex:1}}>
                    <Browse></Browse>
                    <BottomNavigation
                        activeTab={this.state.activeTab}
                        renderTab={this.renderTab}
                        tabs = {this.tabs}
                        onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                        
                    >
    
                    </BottomNavigation>
                </View>
            )
        }else if(this.state.activeTab==='Playlists'){
            return(
                <View style={{flex:1}}>
                    <Playlists></Playlists>
                    <BottomNavigation
                        activeTab={this.state.activeTab}
                        renderTab={this.renderTab}
                        tabs = {this.tabs}
                        onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                        
                    >
    
                    </BottomNavigation>
                </View>
            )
        }else if(this.state.activeTab==='Search'){
            return(
                <View style={{flex:1}}>
                    <Search></Search>
                    <BottomNavigation
                        activeTab={this.state.activeTab}
                        renderTab={this.renderTab}
                        tabs = {this.tabs}
                        onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                        
                    >
    
                    </BottomNavigation>
                </View>
            )
        }else if(this.state.activeTab==='Home'){
            return(
                <View style={{flex:1}}>
                    <Home></Home>
                    <BottomNavigation
                        activeTab={this.state.activeTab}
                        renderTab={this.renderTab}
                        tabs = {this.tabs}
                        onTabPress={newTab => this.setState({ activeTab: newTab.key })}
                        
                    >
    
                    </BottomNavigation>
                </View>
            )
        }

    }
}