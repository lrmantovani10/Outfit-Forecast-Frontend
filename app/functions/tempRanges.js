// Goal: Add a min/max temp to clothing object with input from user

// Functionality: Display a clothing item without temp range to a user and ask them to set a min/max with
//  some type of UI (sliding scale seems like a good option)
// Stretch Functionality: Update temp range for clothing items that already have a range

// Output: Send temp range data to backend 

import React, { Component, useCallback } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";
import MultiSlider from '@ptomasroos/react-native-multi-slider';


export class TempRanges extends Component {
  state = {
    PopupData: {
        modalVisible: false,
        values: [50, 60]
     }
  };

  setModalVisible = (visible) => {
    this.setState({PopupData:{modalVisible: visible, values:this.state.PopupData.values}});
  }

  multiSliderValuesChange = (values) => {
    this.setState({PopupData:{modalVisible: this.state.PopupData.modalVisible, values:values}});
  }

  render() {
    const { modalVisible } = this.state.PopupData;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>What temperature range would you wear this item in?</Text>
                {/* Test image, will replace */}
                <Image
                style={{width: '75%', height: '50%'}}
                source={{uri:'https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_960_720.png'}}/> 
                <MultiSlider
                    values={[this.state.PopupData.values[0], this.state.PopupData.values[1]]}
                    sliderLength={280}
                    onValuesChange={this.multiSliderValuesChange}
                    min={-10}
                    max={100}
                    step={1}
                />
                {/* Just an example of how the variables are stored. Will be removed in the final version */}
                <Text style={styles.text}>Temperature Min/Max:</Text>
                <Text style={styles.text}>{this.state.PopupData.values[0]} °F</Text>
                <Text style={styles.text}>{this.state.PopupData.values[1]} °F</Text>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Save & Exit</Text>
                </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}>
          <Text style={styles.textStyle}>Add New Temp Ranges</Text>
        </Pressable>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16
  },
  separator: {
    height: 15
  },
  centeredView: {
    justifyContent: "center",
    margin: 20
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "blue",
  },
  buttonClose: {
    backgroundColor: "blue",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});