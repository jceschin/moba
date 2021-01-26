import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign, Fontisto, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeNavbar = () => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <AntDesign name="home" size={24} color="black"/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Fontisto name="world-o" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
                <MaterialCommunityIcons name="credit-card-multiple-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MyAccount')}>
                <SimpleLineIcons name="menu" size={24} color="black" />
            </TouchableOpacity>  
        </View>
    )
}

export default HomeNavbar;

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(167, 167, 167, 0.83)',
        borderStyle: 'solid',
        paddingVertical: 15,
        paddingHorizontal: 40,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})