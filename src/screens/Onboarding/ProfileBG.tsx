import React, { useState } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Dimensions, Image, Alert } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

import axios from 'axios';

import { RootStackParamList } from 'types/navigation';
import ActionButtonGreen from '@components/events/ActionButtonGreen';
import ProgressBar from '@components/events/ProgressBar';
import NextButton from '@components/events/NextButton';
import GoBackButton from '@components/events/GoBackButton';

const { width } = Dimensions.get('window');

type ProfileBGProps = NativeStackScreenProps<
  RootStackParamList,
  'ProfileBG'
>;

const ProfileBGScreen: React.FC<ProfileBGProps> = ({ navigation }) => {
  const [selectedImageURI, setSelectedImageURI] = useState<string | null>(null);

  const handleImageSelection = async () => {
    const image = await ImagePicker.launchImageLibrary({
      mediaType: "photo",
      quality: 1,
      selectionLimit: 1,
    });

    console.log('ImagePicker result:', image);

    if (image.assets && image.assets.length != 0) {
      console.log('deu certo:', image);
      setSelectedImageURI(image.assets[0].uri || null);
    }
    //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //   if (status !== 'granted') {
    //     Alert.alert('Sorry, we need camera roll permissions to make this work!');
    //     return;
    //   }

    //   const result = await ImagePicker.launchImageLibrary({
    //     mediaType: ImagePicker.MediaTypeOptions.Images,
    //     allowsEditing: true,
    //     aspect: [4, 4],
    //     quality: 1,
    //   });

    //   console.log('ImagePicker result:', result);

    //   if (result) {
    //     console.log('deu certo:', result);
    //     setSelectedImageURI(result.assets[0].uri);
    //   }
  };


  const handleSaveProfile = async () => {
    try {
      const cookie = await AsyncStorage.getItem('access_token');

      if (!cookie) {
        console.warn('No access token found');
        return;
      }

      const formData = new FormData();
      formData.append('bg', {
        uri: selectedImageURI,
        type: 'image/jpeg',
        name: 'avatar.jpg',
      });

      const response = await axios.post('http://localhost:8080/user/save-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Cookie: cookie || '',
        },
      });

      if (response.status === 202) {
        console.log('Profile photo saved successfully');
        navigation.navigate('ProfilePreview');
      } else {
        console.warn('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ProgressBar current={5} />
      <View style={styles.container2}>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Add Background Photo!</Text>
          <View style={styles.profilePhoto}>
            {selectedImageURI ? (
              <Image key={selectedImageURI} source={{ uri: selectedImageURI }} style={styles.photo} />
            ) : (
              <View style={styles.photo} />
            )}

            {/* <Text style={styles.mainPhotoLabel}>Entered_name</Text> */}
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
    paddingTop: 66,
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
    width: 300,
    // height: 239,
    padding: 12,
    paddingBottom: 18,
    gap: 8.43,
    borderRadius: 12,
    alignSelf: 'center',
  },
  photo: {
    width: 270,
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

export default ProfileBGScreen;