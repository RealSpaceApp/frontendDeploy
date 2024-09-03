import React, { useState, useCallback } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { View, Text, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import axiosInstance from '../../config/AxiosInstance';
import { useFocusEffect } from '@react-navigation/native';

import { RootStackParamList } from 'types/navigation';
import ActionButtonGreen from '@components/events/ActionButtonGreen';
import ProgressBar from '@components/events/ProgressBar';
import NextButton from '@components/events/NextButton';
import GoBackButton from '@components/events/GoBackButton';

const { width } = Dimensions.get('window');

type ProfileAvatarProps = NativeStackScreenProps<
  RootStackParamList,
  'ProfileAvatar'
>;

const ProfileAvatarScreen: React.FC<ProfileAvatarProps> = ({ navigation }) => {
  const [selectedImageURI, setSelectedImageURI] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const handleImageSelection = async () => {
    const image = await ImagePicker.launchImageLibrary({
      mediaType: "photo",
      quality: 1,
      selectionLimit: 1,
    });

    console.log('ImagePicker result:', image);

    if (image.assets && image.assets.length != 0) {
      setSelectedImageURI(image.assets[0].uri || null);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();
      if (selectedImageURI) {
        formData.append('avatar', {
          uri: selectedImageURI,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        });
      }
      const response = await axiosInstance.post('/user/save-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 202) {
        console.log('Profile photo saved successfully');
        navigation.navigate('ProfileBG');
      } else {
        console.warn('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/user/profile/`);
      setUserName(response.data.name);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <ProgressBar current={4} />
      <View style={styles.container2}>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Add Profile Photo!</Text>
          <View style={styles.profilePhoto}>
            {selectedImageURI ? (
              <Image key={selectedImageURI} source={{ uri: selectedImageURI }} style={styles.photo} />
            ) : (
              <View style={styles.photo} />
            )}

            <Text style={styles.mainPhotoLabel}>{userName}</Text>
          </View>
          <ActionButtonGreen
            content={'Select Image'}
            color={selectedImageURI ? '#378461' : '#F6F6F6'}
            onPress={handleImageSelection}
          />
        </View>
        <View style={styles.buttonContainer}>
          <GoBackButton onPress={() => navigation.goBack()} />
          <NextButton onPress={handleSaveProfile} />
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
    paddingTop: '10%',
  },
  container2: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    justifyContent: 'space-between',
    paddingBottom: 64,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    color: '#111111',
    fontSize: 24,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  profileContainer: {
    gap: 28,
  },
  profilePhoto: {
    backgroundColor: '#FFFFFF',
    width: 224,
    height: 269,
    padding: 12,
    paddingBottom: 18,
    gap: 8.43,
    borderRadius: 12,
    alignSelf: 'center',
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: '#EBEBEB',
  },
  mainPhotoLabel: {
    alignSelf: 'center',
    color: '#494949',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    gap: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default ProfileAvatarScreen;

