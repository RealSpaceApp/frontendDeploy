import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import Tags from './cards/Tags';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import ActionButtonGreen from '../events/ActionButtonGreen';

const NotificationCard = ({ photo, type, time, text }) => {
  const navigation = useNavigation();
  const [feedbackState, setFeedbackState] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const formattedTime = formatTime(time);

  const handleTagPress = (tag) => {
    if (tag === 'didntAttend') {
      setFeedbackState("Did something go wrong? Let Realspace know.");
    } else if (tag === 'attended') {
      setFeedbackState('Nice! How was “Event name”? Share with us at Realspace.');
    }
  };

  const handleSendFeedback = () => {
    setModalVisible(true);
  };

  const handleModalSubmit = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          {photo && <Image source={photo} style={styles.photo} />}
          <View>
            <View style={styles.timeContainer}>
              <Text style={styles.text}>
                {feedbackState ? feedbackState : text}
              </Text>
              <Text style={styles.timeText}>{formattedTime}</Text>
            </View>
            {type === 'event' && !feedbackState && (
              <View style={styles.tagsContainer}>
                <Tags text="Didn't attend" onPress={() => handleTagPress('didntAttend')} />
                <Tags text="Attended" onPress={() => handleTagPress('attended')} />
              </View>
            )}
            {feedbackState && (
              <View style={styles.tagsContainer}>
                <Tags text='Discard' onPress={() => setFeedbackState(null)} />
                <Tags text='Send Feedback' onPress={handleSendFeedback} />
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Modal para Feedback */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Send Feedback</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter subject"
              value={input1}
              onChangeText={setInput1}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your feedback"
              value={input2}
              multiline
              numberOfLines={6}
              onChangeText={setInput2}
            />
            <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleModalSubmit}>
              <Text style={styles.closeModalButton}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}>
              <Text style={styles.actionModalButton}>Cancel</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const formatTime = (time) => {
  const now = moment();
  const timeMoment = moment(time);

  const duration = moment.duration(now.diff(timeMoment));
  const hours = Math.floor(duration.asHours());
  const days = Math.floor(duration.asDays());
  const weeks = Math.floor(duration.asWeeks());

  if (hours < 24) {
    return `${hours}h`;
  } else if (days < 7) {
    return `${days}d`;
  } else {
    return `${weeks}w`;
  }
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
    borderBottomColor: '#E2E3E2',
    borderBottomWidth: 0.5
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%'
  },
  timeText: {
    opacity: 0.7,
    fontWeight: '600',
    fontSize: 14,
    color: '#646464',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#646464',
    width: '70%'
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 8
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000066',
    zIndex: 20
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2D2D2D'
  },
  modalContainer: {
    backgroundColor: '#EEEEEE',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    height: '90%',
    justifyContent: 'flex-start',
    paddingBottom: 40
  },
  modalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    fontSize: 14,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    gap: 10,
    marginBottom: 50
  },
  actionModalButton: {
    color: '#2D2D2D',
    paddingVertical: 11,
    textAlign: 'center',
    borderTopColor: '#3C3C435C',
    borderTopWidth: 0.3,
  },
  closeModalButton: {
    color: '#49A078',
    paddingVertical: 11,
    textAlign: 'center',
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
  },
});

export default NotificationCard;
