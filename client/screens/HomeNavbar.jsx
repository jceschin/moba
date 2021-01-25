import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AntDesign, Fontisto, MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';

const HomeNavbar = () => {
    return (
        <View style={styles.container}>
            <AntDesign name="home" size={24} color="black" />
            <Fontisto name="world-o" size={24} color="black" />
            <MaterialCommunityIcons name="credit-card-multiple-outline" size={24} color="black" />
            <SimpleLineIcons name="menu" size={24} color="black" />
        </View>
    )
}

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

export default HomeNavbar;