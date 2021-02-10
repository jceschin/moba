import React, {Component} from 'react';
import { View, StatusBar,  StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable'

export default class LandingPage extends Component {

    goToScreen(routeName){
        this.props.navigation.navigate(routeName)
    }
    
    componentDidMount(){

        setTimeout( () => {
            this.goToScreen('AuthScreen')
        }, 5000, this)
    }

    render(){
        return(
            <View style= {styles.image}>
                <StatusBar translucent backgroundColor= 'rgba(0,0,0,0.2)'/>
                <Animatable.Image
                    animation= "jello"
                    easing= "linear"
                    iterationCount="infinite"
                    iterationDelay= "500"
                    style={{
                      width: 280,
                      height: 280,
                      margin: 100
                    }}
                    source={require('../../resources/images/mobapng.png')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
   image: {
       flex: 1,
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center',
 }

})