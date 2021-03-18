import React, { useContext } from 'react';
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
import { useDispatch } from 'react-redux';
import { login, loginAnon } from '../../providers/actions/User';
import { navigate } from '../../providers/services/NavigatorService';
import colours from '../../providers/constants/colours';
import globalStyles from '../../providers/constants/globalStyles';

// import { AuthContext } from '../navigation/AuthProvider';\

const styles = StyleSheet.create({
  bigBtn: {
    marginHorizontal: 30,
    backgroundColor: colours.themePrimary,
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    marginBottom: 48,
  },
  textboxContainer: {
    padding: 5,
    marginVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: colours.lightGray,
  },
});

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is a required field')
    .email("Welp, that's not an email"),
  password: yup
    .string()
    .required('Password is a required field')
    .min(6, "That can't be very secure"),
});

export default function Login({ navigation }) {
  // const { login } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleLogin = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  const handleAnonLogin = () => {
    dispatch(loginAnon());
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

      <Text style={globalStyles.authGreeting}>{'Sign In'}</Text>
      <Text style={{ color: colours.gray, marginTop: 15 }}>
        {'Hi there! Nice to see you again.'}
      </Text>

      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.form}>
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(values) => handleLogin(values)}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                touched,
                values,
                submitCount,
                errors,
              }) => {
                return (
                  <View style={{ marginTop: 10 }}>
                    <Text style={globalStyles.authFieldTitle}>Email</Text>
                    <View style={styles.textboxContainer}>
                      <TextInput
                        placeholder="Enter email..."
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
                        placeholder="Enter password..."
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                      />
                    </View>
                    <Text style={{ color: 'red' }}>
                      {(touched.password || submitCount > 0) && errors.password}
                    </Text>

                    <TouchableOpacity
                      style={styles.bigBtn}
                      onPress={handleSubmit}
                      title="SUBMIT"
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>
                        Sign In
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            </Formik>

            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={{ color: colours.themePrimary }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
