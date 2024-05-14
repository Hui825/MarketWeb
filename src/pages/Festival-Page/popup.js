import React, { useState } from 'react';
import { View, Button, Modal, Text, TouchableOpacity } from 'react-native';

const PopupScreen = ({ closeModal }) => {
  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20 }}>
          <Text>This is a popup!</Text>
          <Button title="Close" onPress={closeModal} />
        </View>
      </View>
    </Modal>
  );
};

export default PopupScreen;