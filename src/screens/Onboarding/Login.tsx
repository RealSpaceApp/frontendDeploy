import React from 'react';
import { SvgXml } from 'react-native-svg';
import { StyleSheet, View, Text } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

import { RootStackParamList } from 'types/navigation';
import ActionButtonGreen from '@components/events/ActionButtonGreen';

import Stars1 from 'assets/onboarding/Stars1';
import Apple from 'assets/onboarding/Apple';

GoogleSignin.configure({
  webClientId: '613996156544-390fbjusqhr7j2mv4fljki69u55je212.apps.googleusercontent.com', // Your OAuth 2.0 client ID
  offlineAccess: true,
  forceCodeForRefreshToken: true,
  iosClientId: "613996156544-iv6bmr5acdnuq8rnm82pamp6k7h9kvu5.apps.googleusercontent.com",
});

type LoginProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);

      const token = await GoogleSignin.getTokens()
      navigation.navigate('LoginCallback', { token: token.accessToken });
    } catch (error: any) {
      console.error('Google Sign-In Error:', error.DEVELOPER_ERROR);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in is in progress');
      } else {
        console.log('An error occurred:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Signup</Text>
        <Text style={styles.subtitle}>start your journey with a realspace account</Text>
      </View>
      <View>
        <SvgXml xml={Stars1} style={styles.image} />
        <View style={styles.buttonContainer}>
          <Text style={styles.subtitleButton}>
            we'll use your social account to create a profile on realspace, later you can
            update the info to your liking.
          </Text>
          <ActionButtonGreen content={'Sign in with google'} onPress={handleGoogleSignIn} />
          <ActionButtonGreen content={'Sign in with apple'} icon={Apple} onPress={() => navigation.navigate('LoginCallback', { token: null })} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'space-between',
    paddingBottom: 64,
    paddingTop: 110,
  },
  buttonContainer: {
    gap: 10,
    paddingHorizontal: 20,
  },
  titleContainer: {
    gap: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: '#111111',
    fontSize: 32,
    lineHeight: 32,
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#2D2D2D',
    fontSize: 15
  },
  image: {
    alignSelf: 'flex-end',
    marginBottom: 30
  },
  subtitleButton: {
    color: '#868987',
    fontSize: 13,
    marginLeft: 12
  }
});

export default LoginScreen;
