import React, { useRef, useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { StyleSheet, View, Text, Animated, PanResponder, Dimensions } from 'react-native';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

import { RootStackParamList } from 'types/navigation';

import Community from 'assets/onboarding/Community.js';
import Pagination from 'assets/onboarding/Pagination.js';
import RealEvents from 'assets/onboarding/RealEvents.js';
import handshakke from 'assets/onboarding/hand shakke.js';
import Pagination2 from 'assets/onboarding/Pagination2.js';
import Pagination3 from 'assets/onboarding/Pagination3.js';

type IntroductionProps = NativeStackScreenProps<
  RootStackParamList,
  'Introduction'
>;

const IntroductionScreen: React.FC<IntroductionProps> = ({ navigation }) => {
  const [currentContainer, setCurrentContainer] = useState('blue');
  const panBlue = useRef(new Animated.ValueXY()).current;
  const panRed = useRef(new Animated.ValueXY()).current;
  const panGreen = useRef(new Animated.ValueXY()).current;
  const screenHeight = Dimensions.get('window').height;

  const createPanResponder = (pan: Animated.AnimatedValueXY, container: string) => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dy < -10,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          Animated.event(
            [null, { dy: pan.y }],
            { useNativeDriver: false }
          )(evt, gestureState);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < -10) {
          Animated.timing(pan, {
            toValue: { x: 0, y: -screenHeight },
            duration: 300,
            useNativeDriver: false
          }).start(() => {
            if (container === 'blue') setCurrentContainer('red');
            if (container === 'red') setCurrentContainer('green');
            if (container === 'green') navigation.navigate('Logo');
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
          }).start();
        }
      },
    });
  };

  const panResponderBlue = useRef(createPanResponder(panBlue, 'blue')).current;
  const panResponderRed = useRef(createPanResponder(panRed, 'red')).current;
  const panResponderGreen = useRef(createPanResponder(panGreen, 'green')).current;

  return (
    <View style={styles.container}>
      <Animated.View
        {...(currentContainer === 'blue' ? panResponderBlue.panHandlers : {})}
        style={[panBlue.getLayout(), styles.containerOverlay, styles.blueContainer]}
      >
        <Text style={styles.title1}>
          <Text>Real</Text>{'\n'}
          <Text>Relationships</Text>
        </Text>
        <SvgXml xml={handshakke} style={styles.image1} />
        <Text style={styles.subtitle1}>Find friends and add them using Realspace’s Bluetooth functionality. Exclusive to those physically nearby, making every relationship genuine.</Text>
      </Animated.View>

      <Animated.View
        {...(currentContainer === 'red' ? panResponderRed.panHandlers : {})}
        style={[panRed.getLayout(), styles.containerOverlay, styles.redContainer]}
      >
        <Text style={styles.title1}>
          <Text>Real</Text>{'\n'}
          <Text>Community</Text>
        </Text>
        <SvgXml xml={Community} style={styles.image} />
        <Text style={styles.subtitle}>Your favorite local organizations shouldn't have to compete for your attention. Keep up to date on all the fun activities that your social community has to offer.</Text>
      </Animated.View>

      <Animated.View
        {...(currentContainer === 'green' ? panResponderGreen.panHandlers : {})}
        style={[panGreen.getLayout(), styles.containerOverlay, styles.greenContainer]}
      >
        <Text style={styles.title1}>
          <Text>Real</Text>{'\n'}
          <Text>Events</Text>
        </Text>
        <SvgXml xml={RealEvents} style={styles.image} />
        <Text style={styles.subtitle}>From birthdays to hangouts—plan and share real social events effortlessly with your friends and family. Stay in the loop with the people who matter most.</Text>
      </Animated.View>

      {currentContainer === 'blue' && <SvgXml xml={Pagination} style={styles.pagination} />}
      {currentContainer === 'red' && <SvgXml xml={Pagination2} style={styles.pagination} />}
      {currentContainer === 'green' && <SvgXml xml={Pagination3} style={styles.pagination} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  containerOverlay: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  greenContainer: {
    backgroundColor: '#38824F',
    height: '92%',
    zIndex: 1,
    justifyContent: 'space-between',
    paddingTop: 10
  },
  redContainer: {
    backgroundColor: '#384882',
    height: '91%',
    zIndex: 2,
    justifyContent: 'space-between',
    paddingTop: 10
  },
  blueContainer: {
    backgroundColor: '#132F43',
    height: '90%',
    zIndex: 3,
    justifyContent: 'space-between',
    paddingTop: 10
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 48,
    marginHorizontal: 26,
    marginBottom: 38,
    color: '#FFFFFF'
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 20,
    color: '#FFFFFF',
    marginHorizontal: 26,
    marginTop: 38,
    marginBottom: 65,
  },
  title1: {
    fontSize: 48,
    fontWeight: 'bold',
    lineHeight: 48,
    marginTop: 18,
    marginHorizontal: 26,
    color: '#FFFFFF'
  },
  subtitle1: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 20,
    color: '#FFFFFF',
    marginHorizontal: 26,
    marginTop: 18,
    marginBottom: 65,
  },
  image: {
    alignSelf: 'center',
    width: '90%',
    height: undefined,
    aspectRatio: 1,
  },
  image1: {
    alignSelf: 'center',
    width: '95%',
    height: undefined,
    aspectRatio: 1,
  },
  pagination: {
    position: 'absolute',
    bottom: -10,
    left: '50%',
    transform: [{ translateX: -10 }]
  },
});

export default IntroductionScreen;