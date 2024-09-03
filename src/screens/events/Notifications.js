import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import NavBar from '../../components/navbar/NavBar';
import { SvgXml } from 'react-native-svg';
import Arrow from '../../../assets/onboarding/Arrow';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../config/AxiosInstance';
import NotificationCard from '@components/events/NotificationCard';
import moment from 'moment';

const photo = require('../../../assets/pictures/circlebg.jpg');
const photo2 = require('../../../assets/pictures/photo2.png');

const Notifications = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([
    {
    image: photo, 
    created_at: '2024-09-02T10:10:18.072Z', 
    description: 'Did you attend "Event name"?', 
    notification_id: '01', 
    type: 'event'
  },
  {
    image: photo, 
    created_at: '2024-09-01T10:20:18.072Z', 
    description: 'Did you attend "Event name"?', 
    notification_id: '02', 
    type: 'event'
  },
  {
    image: photo2, 
    created_at: '2024-08-05T10:20:18.072Z', 
    description: 'Jai, Neil, Sai, and 2 other added a note to “event name"', 
    notification_id: '03', 
    type: 'regular'
  },
]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('/notification/feed');
        if (response.data) {
          setNotifications(response.data);
        }
        console.log('Notifications Response:', response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const categorizeNotifications = () => {
    const thisWeek = [];
    const last30Days = [];

    notifications.forEach(notification => {
      const notificationDate = moment(notification.created_at);
      const now = moment();

      if (now.diff(notificationDate, 'days') <= 7) {
        thisWeek.push(notification);
      } else if (now.diff(notificationDate, 'days') <= 30) {
        last30Days.push(notification);
      }
    });

    return { thisWeek, last30Days };
  };

  const { thisWeek, last30Days } = categorizeNotifications();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <SvgXml xml={Arrow} style={styles.arrow} />
        <Text style={styles.title}>Notifications</Text>
      </TouchableOpacity>

      <FlatList
        data={[]}
        ListHeaderComponent={() => (
          <>
            {thisWeek.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>This Week</Text>
                {thisWeek.map(item => (
                  <NotificationCard
                    key={item.notification_id}
                    type={item.type}
                    eventId={item.notification_id}
                    time={item.created_at}
                    text={item.description}
                    photo={item.image}
                  />
                ))}
              </View>
            )}

            {last30Days.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Last 30 Days</Text>
                {last30Days.map(item => (
                  <NotificationCard
                    key={item.notification_id}
                    type={item.type}
                    eventId={item.notification_id}
                    time={item.created_at}
                    text={item.description}
                    photo={item.image}
                  />
                ))}
              </View>
            )}
          </>
        )}
        keyExtractor={(item) => item.notification_id.toString()}
      />

      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F6F6F6',
    paddingTop: '5%',
    borderBottomColor: '#AEB0AF',
    borderBottomWidth: 0.5
  },
  arrow: {
    transform: [{ rotate: '180deg' }],
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d2d2d',
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 14,
    color: '#646464',
    marginLeft: 16
  },
});

export default Notifications;
