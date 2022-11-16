// Goal: Add a min/max temp to clothing object with input from user

// Functionality: Display a clothing item without temp range to a user and ask them to set a min/max with
//  some type of UI (sliding scale seems like a good option)
// Stretch Functionality: Update temp range for clothing items that already have a range

// Output: Send temp range data to backend 

import React, { Component, useCallback } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image } from "react-native";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styleSheet from "./style"


export class TempRanges extends Component {
  constructor(props) {
    super(props);
    this.tempInput = this.tempInput.bind(this);
    this.state = {
      PopupData: {
          popupVisible: false,
          values: [50, 60]
       },
    };
  }

  makePopupVisible = (visible) => {
    this.setState({PopupData:{popupVisible: visible, values:this.state.PopupData.values}});
  }

  tempInput = (values) => {
    this.setState({PopupData:{popupVisible: this.state.PopupData.popupVisible, values:values}});
  }

  render() {
    const { popupVisible: popupVisible } = this.state.PopupData;
    return (
      <View style={styles.tempRangesView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={popupVisible}
          onRequestClose={() => {
            this.makePopupVisible(!popupVisible);
          }}>
          <View style={styles.tempRangesView}>
            <View style={styles.popupView}>
                <Text style={styles.popupText}>What temperature range would you wear this item in?</Text>
                {/* Test image, will replace */}
                <Image
                style={{width: '75%', height: '50%'}}
                source={{uri:'https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_960_720.png'}}/> 
                <MultiSlider
                    values={[this.state.PopupData.values[0], this.state.PopupData.values[1]]}
                    sliderLength={280}
                    onValuesChange={this.tempInput}
                    min={-10}
                    max={100}
                    step={1}
                />
                {/* Just an example of how the variables are stored. Will be removed in the final version */}
                <Text style={styleSheet.h3}>Temperature Min/Max:</Text>
                <Text style={styleSheet.paragraph}>{this.state.PopupData.values[0]} °F</Text>
                <Text style={styleSheet.paragraph}>{this.state.PopupData.values[1]} °F</Text>
                <View style={styleSheet.five_separator}></View>
                <Pressable style={styleSheet.button}
                // style={[styles.button, styles.buttonClose]}
                onPress={() => this.makePopupVisible(!popupVisible)}>
                <Text style={styles.tempRangeText}>Save & Exit</Text>
                </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable style={styleSheet.button}
        //   style={[styleSheet.button, styleSheet.activeButton]}
          onPress={() => this.makePopupVisible(true)}>
          <Text style={styles.tempRangeText}>Add New Temp Ranges</Text>
        </Pressable>
        
      </View>
    );
  }
}

export class TempRangesTest extends Component {
  constructor(props) {
    super(props);
    this.tempInput = this.tempInput.bind(this);
    this.state = {
      PopupData: {
          popupVisible: false,
          values: [50, 60]
       },
    };
  }

  makePopupVisible = (visible) => {
    this.setState({PopupData:{popupVisible: visible, values:this.state.PopupData.values}});
  }

  tempInput = (values) => {
    this.setState({PopupData:{popupVisible: this.state.PopupData.popupVisible, values:values}});
  }

  render() {
    const { popupVisible: popupVisible } = this.state.PopupData;
    return (
      <View style={styles.tempRangesView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={popupVisible}
          onRequestClose={() => {
            this.makePopupVisible(!popupVisible);
          }}>
          <View style={styles.tempRangesView}>
            <View style={styles.popupView}>
                <Text style={styles.popupText}>For testing purposes, please set the temperature range for this shirt to be 10°F to 90°F.</Text>
                {/* Test image, will replace */}
                <Image
                style={{width: '75%', height: '50%'}}
                source={{uri:'https://cdn.pixabay.com/photo/2016/12/06/09/31/blank-1886008_960_720.png'}}/> 
                <MultiSlider
                    values={[this.state.PopupData.values[0], this.state.PopupData.values[1]]}
                    sliderLength={280}
                    onValuesChange={this.tempInput}
                    min={-10}
                    max={100}
                    step={1}
                />
                {/* Just an example of how the variables are stored. Will be removed in the final version */}
                <Text style={styleSheet.h3}>Temperature Min/Max:</Text>
                <Text style={styleSheet.paragraph}>{this.state.PopupData.values[0]} °F</Text>
                <Text style={styleSheet.paragraph}>{this.state.PopupData.values[1]} °F</Text>
                <Text>{this.state.PopupData.values[0] === 10 && this.state.PopupData.values[1] === 90 ? 'Testing tempInput... [PASS]' : 'Testing tempInput... [FAIL]'}</Text>
                <View style={styleSheet.five_separator}></View>
                <Pressable style={styleSheet.button}
                // style={[styles.button, styles.buttonClose]}
                onPress={() => this.makePopupVisible(!popupVisible)}>
                <Text style={styles.tempRangeText}>Save & Exit</Text>
                </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable style={styleSheet.button}
        //   style={[styleSheet.button, styleSheet.activeButton]}
          onPress={() => this.makePopupVisible(true)}>
          <Text style={styleSheet.buttonText}>Test Temp Ranges</Text>
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
  tempRangesView: {
    justifyContent: "center",
    margin: 20
  },
  popupView: {
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
  tempRangeText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  popupText: {
    marginBottom: 15,
    textAlign: "center"
  }
});