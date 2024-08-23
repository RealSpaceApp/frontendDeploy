import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

{/* Onboarding */ }
import IntroductionScreen from '@screens/Onboarding/Introduction';
import LogoScreen from '@screens/Onboarding/Logo';
import LoginScreen from '@screens/Onboarding/Login';
import LoginCallbackScreen from '@screens/Onboarding/LoginCallback';
import OverviewScreen from '@screens/Onboarding/Overview';
import ProfileName from '@screens/Onboarding/ProfileName';
import ProfileBirthdayScreen from '@screens/Onboarding/ProfileBirthday';
import ProfileBioScreen from '@screens/Onboarding/ProfileBio';
import ProfileBGScreen from '@screens/Onboarding/ProfileBG';
import ProfileAvatarScreen from '@screens/Onboarding/ProfileAvatar';
import PhoneRegisterScreen from '@screens/Onboarding/PhoneRegister';
import OTPVerificationScreen from '@screens/Onboarding/OTPVerification';
import ProfilePreviewScreen from '@screens/Onboarding/ProfilePreview';
import CommunityTagsScreen from '@screens/Onboarding/CommunityTags';
import AvailabilityFeatureScreen from '@screens/Onboarding/AvailabilityFeature';
import AddSchedule from '@screens/Onboarding/AddSchedule';
import LastOnboarding from '@screens/Onboarding/LastOnboarding';
//import Onboarding06 from '@screens/Onboarding/Onboarding06';
//import Onboarding05 from '@screens/Onboarding/Onboarding05';
{/* Landing Pages */ }
import LandingPageEvents from '@screens/events/LandingPageEvents';
import LandingPageCommunity from '@screens/community/LandingPageCommunity';
import LandingPageFriends from '@screens/friends/LandingPageFriends'
import LandingPageProfile from '@screens/profile/LandingPageProfile';
import LandingPageSchedule from '@screens/schedule/LandingPageSchedule';
import EditProfile from '@screens/profile/EditProfile';
import CreateEvent from '@screens/events/CreateEvent';
import ProfileSettings from '@screens/profile/ProfileSettings';
import NewCommunity from '@screens/community/NewCommunity';
import EventDetails from '@screens/schedule/EventDetails';
import LandingPageCircles from '@screens/circles/LandingPageCircles';
import EditSchedule from '@screens/profile/EditSchedule';
import FriendsPageProfile from '@screens/profile/FriendsPageProfile';
import CircleProfile from '@screens/circles/CircleProfile';
import ChangePhoneNumber from '@screens/profile/ChangePhoneNumber';
import CreateCircle from '@screens/circles/CreateCircle';
import CircleProfilePreview from '@screens/circles/CircleProfilePreview';
import AddMembers from '@screens/circles/AddMembers';
import CircleSettings from '@screens/circles/CircleSettings';
import ManageMembers from '@screens/circles/ManageMembers';
import CircleProfileMockedData from '@screens/circles/CircleProfileMockedData';
import ManageMembersMockedData from '@screens/circles/ManageMembersMockedData';

import { RootStackParamList } from 'types/navigation';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Onboarding */}

        <Stack.Screen name="Introduction" component={IntroductionScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Logo" component={LogoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginCallback" component={LoginCallbackScreen} options={{ headerShown: false }} />

        <Stack.Screen name="PhoneRegister" component={PhoneRegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Overview" component={OverviewScreen} options={{ headerShown: false }} />

        <Stack.Screen name="ProfileName" component={ProfileName} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileBirthday" component={ProfileBirthdayScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileBio" component={ProfileBioScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileBG" component={ProfileBGScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileAvatar" component={ProfileAvatarScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfilePreview" component={ProfilePreviewScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CommunityTags" component={CommunityTagsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AvailabilityFeature" component={AvailabilityFeatureScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddSchedule" component={AddSchedule} options={{ headerShown: false }} />
        <Stack.Screen name="LastOnboarding" component={LastOnboarding} options={{ headerShown: false }} />
        {/* <Stack.Screen name="Onboarding05" component={Onboarding05} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding06" component={Onboarding06} options={{ headerShown: false }} /> */}
        {/* Landing Pages */}

        <Stack.Screen name="LandingPageEvents" component={LandingPageEvents} options={{ headerShown: true }} />
        <Stack.Screen name="LandingPageCommunity" component={LandingPageCommunity} options={{ headerShown: true }} />
        <Stack.Screen name="LandingPageFriends" component={LandingPageFriends} options={{ headerShown: true }} />
        <Stack.Screen name="LandingPageProfile" component={LandingPageProfile} options={{ headerShown: true }} />
        <Stack.Screen name="LandingPageSchedule" component={LandingPageSchedule} options={{ headerShown: true }} />
        <Stack.Screen name="LandingPageCircles" component={LandingPageCircles} options={{ headerShown: true }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: true }} />
        <Stack.Screen name="CreateEvent" component={CreateEvent} options={{ headerShown: true }} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettings} options={{ headerShown: true }} />
        <Stack.Screen name="NewCommunity" component={NewCommunity} options={{ headerShown: true }} />
        <Stack.Screen name="EventDetails" component={EventDetails} options={{ headerShown: true }} />
        <Stack.Screen name="EditSchedule" component={EditSchedule} options={{ headerShown: true }} />
        {/* <Stack.Screen name="FriendsPageProfile" component={FriendsPageProfile} options={{ headerShown: true }} /> */}
        <Stack.Screen name="CircleProfile" component={CircleProfile} options={{ headerShown: true }} />
        <Stack.Screen name="ChangePhoneNumber" component={ChangePhoneNumber} options={{ headerShown: true }} />
        <Stack.Screen name="CreateCircle" component={CreateCircle} options={{ headerShown: true }} />
        <Stack.Screen name="CircleProfilePreview" component={CircleProfilePreview} options={{ headerShown: true }} />
        <Stack.Screen name="AddMembers" component={AddMembers} options={{ headerShown: true }} />
        <Stack.Screen name="CircleSettings" component={CircleSettings} options={{ headerShown: true }} />
        <Stack.Screen name="ManageMembers" component={ManageMembers} options={{ headerShown: true }} />
        <Stack.Screen name="CircleProfileMockedData" component={CircleProfileMockedData} options={{ headerShown: true }} />
        <Stack.Screen name="ManageMembersMockedData" component={ManageMembersMockedData} options={{ headerShown: true }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;