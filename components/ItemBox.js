import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image
} from "react-native";

export default function ItemBox(props) {
  const {
    data,
    width,
    height,
    borderColor,
    backgroundColor,
    upperTextFontSize,
    upperTextColor,
    lowerTextFontSize,
    lowerTextColor,

    onTouchListener
  } = props

  const onTouch = () => {
    if (onTouchListener)
      onTouchListener(data);
  }

  return (
    <View style={[styles.wrapContainer, {width: width, height: height}]}>
      <View style={styles.wrapBox}>
        <TouchableOpacity style={[styles.touchableOpacity, {borderColor: borderColor, backgroundColor: backgroundColor}]} onPress={onTouch}>
          <View style={styles.upperArea}>
            <Text style={{color: upperTextColor, fontSize: upperTextFontSize}}>{data.getCode()}</Text>
          </View>
          <View style={styles.bottomArea}>
            <Text style={{color: lowerTextColor, fontSize: lowerTextFontSize}}>{data.getTitle()}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapContainer: {
    justifyContent: 'center'
  },
  wrapBox: {
    flex: 0.9,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  touchableOpacity: {
    flex: 0.95,
    borderRadius: 8,
    borderWidth: 1,
    padding:10
  },
  upperArea: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 5
  },
  bottomArea: {
    flex: 1,
    justifyContent: 'flex-start'
  }
});
