import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Picker } from 'native-base';
import { useDispatch } from 'react-redux';
import { register } from '../../providers/actions/User';
import { navigate } from '../../providers/services/NavigatorService';
import colours from '../../providers/constants/colours';
import globalStyles from '../../providers/constants/globalStyles';

// import { AuthContext } from '../navigation/AuthProvider';\

const styles = StyleSheet.create({
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textboxContainer: {
    padding: 5,
    marginVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: colours.lightGray,
  },
  form: {
    marginBottom: 48,
  },
});

const validationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  email: yup.string().required('Required').email('Please enter a valid email'),
  password: yup.string().required('Required').min(6, 'Minimum 6 characters'),
});

export default function Register({ navigation }) {
  const dispatch = useDispatch();
  const handleLogin = ({ name, email, password }) => {
    dispatch(register(name, email, password));
  };

  LayoutAnimation.easeInEaseOut();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, paddingHorizontal: 30, backgroundColor: colours.white }}
    >
      <StatusBar barStyle="default" />

      <Image
        source={require('../../../assets/Logo.png')}
        style={globalStyles.authLogo}
      />

      <Text style={globalStyles.authGreeting}>{'Sign Up'}</Text>

      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.form}>
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
              }}
              onSubmit={(values) => handleLogin(values)}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                touched,
                values,
                submitCount,
                errors,
              }) => {
                return (
                  <View style={{ marginTop: 10 }}>
                    <View style={styles.textboxContainer}>
                      <Text style={globalStyles.authFieldTitle}>Full Name</Text>
                      <TextInput
                        placeholder="Your name"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                      />
                    </View>
                    <Text style={{ color: 'red' }}>
                      {(touched.name || submitCount > 0) && errors.name}
                    </Text>

                    <Text style={globalStyles.authFieldTitle}>Email</Text>
                    <View style={styles.textboxContainer}>
                      <TextInput
                        placeholder="Your email address"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                      />
                    </View>
                    <Text style={{ color: 'red' }}>
                      {(touched.email || submitCount > 0) && errors.email}
                    </Text>

                    <Text style={globalStyles.authFieldTitle}>Password</Text>
                    <View style={styles.textboxContainer}>
                      <TextInput
                        secureTextEntry
                        placeholder="Your password"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                      />
                    </View>
                    <Text style={{ color: 'red' }}>
                      {(touched.password || submitCount > 0) && errors.password}
                    </Text>

                    <TouchableOpacity
                      style={globalStyles.bigBtn}
                      onPress={handleSubmit}
                      title="SUBMIT"
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        Register
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 10,
                      }}
                      onPress={() => navigation.goBack()}
                    >
                      <Text style={{ color: colours.themePrimary }}>
                        Have an account? Sign in.
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
