import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {enviarEmail} from '../Redux/Actions/emailActions';


const CreateAccount = (props) => {

  const dispatch = useDispatch();

  const [state, setstate] = useState({
    email: ''
  })

  const handleChangeText = (name, value) => {
    setstate({...state, [name]: value})
  }
   

  const createNewUser = () => {
    const expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const esValido = expReg.test(state.email);
    if(state.email === ''){
      alert('Please provide an email');
      return;
    } if (esValido === false){
      alert('Please enter a valid email')
    } else {
      dispatch(enviarEmail(state));
      alert(' Please, check your email to continue with the registration process')
      // props.navigation.navigate('RegisterPage')
    }
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={['rgba(140, 165, 253, 1)', 'rgba(243, 129, 245, 0.77)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
     <View style={{ marginTop: 16 , flex: 1 , flexDirection: 'row'}}>
       <TouchableOpacity onPress={() =>  props.navigation.navigate('LandingPage')}>
      <Icon name="arrow-left" color= '#FFFEFE' size={19} />
      </TouchableOpacity>
       <Text style={styles.textTitle}>
         MOBA
         </Text>
         </View>
        
      <View style={styles.inputContainer}>
     <View style={styles.input}>
     <Text style={styles.textIndication}>
          Enter your email
            </Text>
            <Text style={styles.textLegend}>
          We are going to send you an email to start creating your account
            </Text>
         <TextInput style={{textAlign:'center', marginTop: 220}} placeholder="Email" onChangeText={(value) => handleChangeText('email', value) }/>
     </View>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.buttons} onPress={() => createNewUser()}> 
          <Text style={styles.btncontent}>
            Send email
              </Text>
        </TouchableOpacity>
      </View>
     </View>

    </LinearGradient>
  );
}

export default CreateAccount;

const styles = StyleSheet.create({
  textTitle: {
   fontFamily: 'Roboto',
   fontSize: 18, 
   lineHeight: 21, 
   color: '#FFFEFE', 
   flex: 2,
   textAlign: 'center',
   marginTop: 1,
   fontWeight: 'bold'
  },
  textIndication: {
   fontFamily: 'Roboto',
   textAlign:'center',
   fontSize: 20, 
   lineHeight: 23, 
   marginTop: 40, 
   fontWeight: 'bold'
  },
  textLegend: {
    fontFamily: 'Roboto', 
    textAlign:'center', 
    fontSize: 18, 
    lineHeight: 21,
    marginTop: 35
  },
  inputContainer: {
    position: 'absolute',
    padding: 35,
    width: 414,
    height: 833,
    left: 0,
    marginTop: 71,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
    input: {
     borderBottomWidth: 1,
     borderBottomColor: '#cccccc',
    },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  subcontainer: {
    flex: 1,
    position: 'absolute',
    padding: 10
  },
  buttoncontainer: {
    flex: 1,
    alignItems: 'center',
    width: 'auto',
    justifyContent: 'flex-end',
    marginBottom: 80
  },
  title: {
    flex: 1,
    position: 'relative',
    marginLeft: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: '#fff',
    textShadowRadius: 5,
    lineHeight: 42,
    fontSize: 36,
    width: 239,
    height: 42
  },
  subtitle: {
    flex: 1,
    position: 'relative',
    marginLeft: 18,
    fontFamily: 'Roboto',
    fontWeight: '500',
    textShadowRadius: 5,
    color: '#fff',
    fontSize: 18,
    lineHeight: 21,
    width: 200,
    height: 63,
  },
  buttons: {
    width: '90%',
    marginBottom: 20,
    height: 53,
    width: 379,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#567BFF'
  },
  btncontent: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 20
  }

})