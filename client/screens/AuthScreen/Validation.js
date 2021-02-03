import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, ImageBackground, Image, Dimensions, Alert } from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import { Formik } from 'formik';
import { LinearGradient } from "expo-linear-gradient";
import axios from 'axios';
import { enviarEmail } from "../../redux/actions/emailActions";
import { verifyEmail } from '../../redux/actions/emailActions'


const SingleNumInput = ({ changed, id, _ref, _next }) => {
	return (
       
		<TextInput
			style={styles.numInput}
			keyboardType={'phone-pad'}
			maxLength={1}
			onChangeText={(value) => {
				changed(value, id);
				value && _next && _next.current.focus();
			}}
			ref={_ref}
		/>
	);
};


export default function CodeVerification({ navigation }) {
	const validateEmail = useSelector((store) => store.email.newEmail);
	var verify = useSelector((store) => store.email.verify);
	console.log(verify);
	console.log(validateEmail.email);
	const dispatch = useDispatch();
	const [codeIn, setCodeIn] = React.useState({
		A: '',
		B: '',
		C: '',
		D: '',
		E: '',
	});

	const handleInputChange = (value, id) => {
		console.log('ID: ', id, 'value: ', value);
		setCodeIn({ ...codeIn, [id]: value });
	};

	const verification_code = parseInt(codeIn.A + codeIn.B + codeIn.C + codeIn.D + codeIn.E);
	console.log(verification_code)

	const mailAndCode = {
		valideId: verification_code,
		email: validateEmail.email
	}
	


	const pin1 = useRef();
	const pin2 = useRef();
	const pin3 = useRef();
	const pin4 = useRef();
	const pin5 = useRef();

	return (
        <LinearGradient
        style={styles.container}
        colors={["rgba(140, 165, 253, 1)", "rgba(243, 129, 245, 0.77)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
				

				<Formik
					initialValues={{
						code: '',
					}}
					onSubmit={(values) => {
						const { code } = values;
						// dispatch( verifyEmail(mailAndCode));
						axios.post('http://localhost:8080/email/verify', mailAndCode ).then((result) => {
							console.log(result)
                            if (result.data === true) {
								navigation.navigate('RegisterPage')
							} else {
								alert('Please, enter a valid code!')
							}
						})
						
					}}
				>
					{({ handleChange, handleSubmit, values }) => (
						<View style={styles.inputContainer}>
							<Text style={styles.textValidate}>Account validation</Text>
							<Text style={styles.textIndication}>Enter the code we sent to your email</Text>

							<View style={styles.row}>
								<SingleNumInput changed={handleInputChange} id={'A'} _ref={pin1} _next={pin2} />
								<SingleNumInput changed={handleInputChange} id={'B'} _ref={pin2} _next={pin3} />
								<SingleNumInput changed={handleInputChange} id={'C'} _ref={pin3} _next={pin4} />
								<SingleNumInput changed={handleInputChange} id={'D'} _ref={pin4} _next={pin5} />
								<SingleNumInput changed={handleInputChange} id={'E'} _ref={pin5} _next={null} />
							</View>
                           
							{/* <Button mode='contained' secureTextEntry={true} title='Register' style={styles.button} onPress={handleSubmit}>
								Validar
							</Button>  */}
                             <View style={styles.buttoncontainer}>
							 <Button mode='contained' secureTextEntry={true} title='Validate' style={styles.buttons} onPress={handleSubmit}>
								Validar
							</Button> 
                            {/* <TouchableOpacity
            style={styles.buttons}
			// onPress={handleSubmit}
			onPress={handleSubmit}
          >
            <Text style={styles.btncontent}>Validate</Text>
          </TouchableOpacity> */}
          </View>

							<View style={styles.textCodeContainer}>
								<Text style={styles.textCode}>Didn't you get the code? </Text>
								<TouchableOpacity 
								
								onPress={() => dispatch(enviarEmail(mailAndCode))}
								// onPress= {() => alert("We have sent you the validation code")}
								>
									<Text style={styles.textCodeII }>Resend code</Text>
								</TouchableOpacity>
							</View>
						</View>
					)}
				</Formik>
			
	
        </LinearGradient>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
	  },
	  inputContainer: {
		position: "absolute",
		padding: 35,
		width: 414,
		height: 833,
		left: 0,
		marginTop: 71,
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	  },
	  textValidate: {
		fontFamily: "Roboto",
		textAlign: "center",
		fontSize: 40,
		lineHeight: 21,
		marginTop: 300,
		color: "#663399",
		fontWeight: "bold",
	 },
	 textIndication: {
		fontFamily: "Roboto",
		textAlign: "center",
		fontSize: 20,
		lineHeight: 23,
		marginTop: 150,
		fontWeight: "bold",
	  },
	  textCode: {
        fontFamily: "Roboto",
		textAlign: "center",
		fontSize: 20,
		lineHeight: 23,
		// marginTop: 150,
	  },
	  textCodeII : {
		color: "#663399",
		fontWeight: "bold",
		fontFamily: "Roboto",
		textAlign: "center",
		fontSize: 20,
		lineHeight: 23,
		// marginTop: 150,
	  },
	  textCodeContainer: {
		marginTop: -550,
		flex: 1,
	    flexDirection: "row"
	  },
	  btncontent: {
		textAlign: "center",
		color: "#fff",
		fontFamily: "Roboto",
		fontSize: 20,
		
	  },
	  buttoncontainer: {
		flex: 1,
		alignItems: "center",
		// width: "auto",
		justifyContent: "flex-end",
		marginBottom: 600,
	  },
	  buttons: {
		width: "90%",
		marginBottom: 20,
		height: 53,
		width: 379,
		borderRadius: 15,
		justifyContent: "center",
		marginRight: "auto",
		marginLeft: "auto",
		backgroundColor: "#567BFF",
	  },
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'blue',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	title: {
		textAlign: 'center',
		// paddingTop: 230,
		fontSize: 30,
		paddingBottom: 5,
		fontWeight: 'bold',
		color: 'black',
	},
	label: {
		color: 'black',
		textAlign: 'center',
		paddingBottom: 10,
	},
	instruction: {
		color: 'black',
		textAlign: 'center',
		paddingBottom: 10,
		fontSize: 11,
	},
	button: {
		marginTop: 20,
		marginBottom: 30,
		backgroundColor: 'black',
	},
	row: {
		flexDirection: 'row',
		
		
	},
	link: {
		fontWeight: 'bold',
		color: 'black',
	},
	input: {
		height: 40,
		backgroundColor: 'white',
	},
	numInput: {
		height: 45,
		width: 45,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
		margin: 10,
		textAlign: 'center',
		fontSize: 25,
	},
	containerII: {
		alignItems: 'center',
	},
});
