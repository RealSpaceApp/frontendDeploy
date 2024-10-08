import React, { useRef, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

import axios from 'axios';

import { RootStackParamList } from 'types/navigation';
import NextButton from '@components/events/NextButton';
import GoBackButton from '@components/events/GoBackButton';
import ProgressBar from '@components/events/ProgressBar';

type OTPVerificationProps = NativeStackScreenProps<
  RootStackParamList,
  'OTPVerification'
>;

const OTPVerificationScreen: React.FC<OTPVerificationProps> = ({ navigation }) => {
  const route = useRoute<RouteProp<RootStackParamList, "OTPVerification">>();
  const { phoneNumber } = route.params;
  const textInputs = Array.from({ length: 6 }, () => useRef(null));
  const [otp, setOtp] = useState(new Array(6).fill(''));

  const focusNextInput = (index: number) => {
    if (index < textInputs.length - 1) {
      (textInputs[index + 1].current as any).focus();
    }
  };

  const handleVerifyPhoneNumber = async () => {
    try {
      const formattedOtp = otp.join('');
      const response = await axios.post(`http://172.21.192.1:8080/auth/phone/verify`, {
        phone: phoneNumber,
        otp: Number(formattedOtp),
      });
      navigation.navigate('LandingPageProfile');
    } catch (error) {
      console.error('Error verifying phone number:', error);
    }
  };

  const handleInputChange = (value: string, index: number) => {
    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      focusNextInput(index);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>OTP</Text>
          <Text style={styles.subtitle}>it's sent to {phoneNumber}</Text>
          <View style={styles.content}>
            <View style={styles.codeContainer}>
              {Array.from({ length: 6 }, (_, index) => (
                <TextInput
                  key={index}
                  ref={textInputs[index]}
                  style={styles.codeInput}
                  keyboardType="numeric"
                  maxLength={1}
                  onChangeText={(value) => handleInputChange(value, index)}
                />
              ))}
            </View>
          </View>
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <GoBackButton onPress={() => navigation.goBack()} />
            <NextButton onPress={handleVerifyPhoneNumber} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'flex-start',
    paddingTop: 66,
  },
  container2: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'space-between',
    paddingBottom: 64,
    paddingTop: 20,
  },
  progress: {
    position: 'static',
    top: 0,
  },
  buttonContainer: {
    gap: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  titleContainer: {
    gap: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: '#111111',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#2D2D2D',
    fontSize: 17,
  },
  content: {
    paddingHorizontal: 16,
    width: '100%',
    borderRadius: 10,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 12
  },
  codeInput: {
    width: 43,
    height: 43,
    backgroundColor: 'white',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default OTPVerificationScreen;