import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Homepage = () => {
  return (
      <View>
        <Text>Juan Ceschin</Text>
        <Text>Money</Text>
        <Text>US$ 5,000</Text>
        <View>
          <Text>Add Money</Text>
          <Text>Transfer</Text>
          <Text>Settings</Text>
        </View>
        <View>
          <Text>Last Movements</Text>
          <View>
            <Text>January 2021</Text>
            <Text>US$999.99</Text>
          </View>
        </View>
      </View>
  )
}

export default Homepage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
})

// const AccountOwner = styled.Text`
//   font-size:36px;
//   text-align:center;
//   font-weight:bold;
//   top:31px;
// `;

// const BalanceTag = styled.Text`
//   font-size:20px;
//   text-align:center;
//   font-weight:normal;
//   top:119px;
// `;

// const Balance = styled.Text`
//   font-size:36px;
//   text-align:center;
//   font-weight:bold;
//   top:171px;
// `;

// const Options = styled.View`
//   display:flex;
//   top: 240px;
//   justify-content:space-between;
// `;

// const OptionName = styled.Text`
//   font-size:16px;
// `;

// const MovsContainer = styled.View`
//   top:342px;
//   background-color:#FDF5E6;
//   height:100%;
//   border-top-left-radius:10px;
//   border-top-right-radius:10px;
// `;

// const MovsHeader = styled.Text`
//   margin-top:36px;
//   font-size:18px;
//   text-align:center;
//   font-weight:normal;
// `;

// const Mov = styled.View`
//   margin-top:60px;
//   margin-bottom:60px;
// `;

// const MovDate = styled.Text`
//   font-size:18px;
//   text-align:left;
//   font-weight:normal;
// `;

// const MovType = styled.Text`
//   font-size:14px;
//   text-align:left;
//   font-weight:normal;
// `;

// const MovAmount = styled.Text`
//   font-size:14px;
//   text-align:right;
//   font-weight:normal;
// `;

// const MovDetails = styled.View`
//   display:flex;
//   justify-content:space-between;
// `;