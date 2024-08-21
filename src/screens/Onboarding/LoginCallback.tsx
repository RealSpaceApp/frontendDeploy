import React, { useEffect } from 'react';
import { SvgXml } from 'react-native-svg';
import { StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import axios from 'axios';

import { RootStackParamList } from 'types/navigation';

import Stars2 from 'assets/onboarding/Stars2.js';

const LoginCallbackScreen: React.FC<{}> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "LoginCallback">>();
  const { token } = route.params;

  useEffect(() => {
    const handleGoogleSignIn = async () => {
      try {
        const response = await axios.post('http://localhost:8080/auth/google/signin', {
          token,
        });

        const setCookieHeader = response.headers["set-cookie"];

        if (setCookieHeader) {
          const tokens = setCookieHeader.find(cookie => cookie.startsWith('access_token='));

          if (tokens) {
            const accessToken = tokens.split(';')[0];
            const refreshToken = tokens.split(', ').find(s => s.startsWith('refresh_token='))?.split('; ')[0] || "";

            await AsyncStorage.setItem('access_token', accessToken);
            await AsyncStorage.setItem('refresh_token', refreshToken);

            console.log('Cookie armazenado com sucesso', accessToken);
            console.log('Cookie armazenado com sucesso', refreshToken);
          } else {
            console.warn('Access token cookie not found in Set-Cookie header');
          }
        } else {
          console.warn('Set-Cookie header not found in response');
        }

        navigation.navigate('PhoneRegister');
      } catch (error) {
        console.error('Error signing in with Google:', error);
      }
    };

    handleGoogleSignIn();
  }, [navigation, token]);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Please wait</Text>
      <SvgXml xml={Stars2} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 64,
    paddingTop: 110,
  },
  subtitle: {
    color: '#2D2D2D',
    fontSize: 15,
    marginBottom: 40
  },
  image: {
    marginBottom: 30
  },
});

export default LoginCallbackScreen;