import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';

export default function App() {
  return (
    <View>
      <AccountOwner>Juan Ceschin</AccountOwner>
      <BalanceTag>Money</BalanceTag>
      <Balance>US$ 5,000</Balance>
      <Options>
        <OptionName>Add Money</OptionName>
        <OptionName>Transfer</OptionName>
        <OptionName>Settings</OptionName>
      </Options>
      <MovsContainer>
        <MovsHeader>Last Movements</MovsHeader>
        <Mov>
          <MovDate>January 2021</MovDate>
          <MovDetails>
            <MovType>Type of transfer</MovType>
            <MovAmount>US$999.99</MovAmount>
          </MovDetails>
        </Mov>
      </MovsContainer>
    </View>
  );
}

const AccountOwner = styled.Text`
  font-size:36px;
  text-align:center;
  font-weight:bold;
  top:31px;
`;

const BalanceTag = styled.Text`
  font-size:20px;
  text-align:center;
  font-weight:normal;
  top:119px;
`;

const Balance = styled.Text`
  font-size:36px;
  text-align:center;
  font-weight:bold;
  top:171px;
`;

const Options = styled.View`
  display:flex;
  top: 240px;
  justify-content:space-between;
`;

const OptionName = styled.Text`
  font-size:16px;
`;

const MovsContainer = styled.View`
  top:342px;
  background-color:#FDF5E6;
  height:100%;
  border-top-left-radius:10px;
  border-top-right-radius:10px;
`;

const MovsHeader = styled.Text`
  margin-top:36px;
  font-size:18px;
  text-align:center;
  font-weight:normal;
`;

const Mov = styled.View`
  margin-top:60px;
  margin-bottom:60px;
`;

const MovDate = styled.Text`
  font-size:18px;
  text-align:left;
  font-weight:normal;
`;

const MovType = styled.Text`
  font-size:14px;
  text-align:left;
  font-weight:normal;
`;

const MovAmount = styled.Text`
  font-size:14px;
  text-align:right;
  font-weight:normal;
`;

const MovDetails = styled.View`
  display:flex;
  justify-content:space-between;
`;