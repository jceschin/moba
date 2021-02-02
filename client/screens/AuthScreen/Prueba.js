 // Formik x React Native example
 import React from 'react';
 import { Button, TextInput, View } from 'react-native';
 import { Formik } from 'formik';
 
  const Prueba = props => (
   <Formik
     initialValues={{ email: '' }}
     onSubmit={values => console.log(values)}
   >
     {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View>
         <TextInput
           onChangeText={handleChange('email')}
           onBlur={handleBlur('email')}
           value={values.email}
         />
         <Button onPress={handleSubmit} title="Submit" />
       </View>
     )}
   </Formik>
 );

 export default Prueba;