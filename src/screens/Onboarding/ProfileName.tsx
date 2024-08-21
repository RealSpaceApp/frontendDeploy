import React, { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

import axios from 'axios';

import { RootStackParamList } from 'types/navigation';
import NextButton from '@components/events/NextButton';
import ProgressBar from '@components/events/ProgressBar';
import GoBackButton from '@components/events/GoBackButton';

import Clear from 'assets/onboarding/Clear';

type NameProps = NativeStackScreenProps<
  RootStackParamList,
  'ProfileName'
>;

const ProfileName: React.FC<NameProps> = ({ navigation }) => {
  const [name, setName] = useState('');

  const handleClear = () => {
    setName('');
  };

  const handleNext = async () => {
    try {
      const cookie = await AsyncStorage.getItem('access_token');

      if (!cookie) {
        console.warn('No access token found');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);

      const response = await axios.post(`http://localhost:8080/user/save-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Cookie: cookie || '',
        },
      });

      if (response.status === 202) {
        console.log('Profile saved successfully');
        navigation.navigate('ProfileBirthday');
      } else {
        console.warn('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar current={1} />
      <View style={styles.container2}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What’s your name?</Text>
          <View style={styles.content}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="#3C3C434D"
                value={name}
                onChangeText={setName}
              />
              {name.length > 0 && (
                <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                  <SvgXml xml={Clear} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <GoBackButton onPress={() => navigation.goBack()} />
            <NextButton onPress={handleNext} />
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
  subtitleButton: {
    color: '#868987',
    fontSize: 13,
    marginLeft: 12,
  },
  content: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 11,
    paddingHorizontal: 16,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 17,
  },
  clearButton: {
    marginLeft: 10,
  },
  clearIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#3C3C4399',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIconText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 17
  },
});

export default ProfileName;
