import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Button(props) {
  const { onPress, title = 'Button', icon } = props;
  return (
    <Icon.Button style={styles.button} onPress={onPress} name={icon}>
        <Text style={styles.text}>{title}</Text>
    </Icon.Button>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'grey',
    // margin: 10
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});