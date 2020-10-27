import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
} from "react-native";

export default function Numpad(props) {
  const {
    row,
    col,
    coodinate,
    width,
    height,
    borderColor,
    backgroundColor,
    upperTextFontSize,
    upperTextColor,
    lowerTextFontSize,
    lowerTextColor,

    onTouchListener,
  } = props;

  const numpadData = [
    { key: '7', data: 7 },
    { key: '8', data: 8 },
    { key: '9', data: 9 },
    { key: '4', data: 4 },
    { key: '5', data: 5 },
    { key: '6', data: 6 },
    { key: '1', data: 1 },
    { key: '2', data: 2 },
    { key: '3', data: 3 },
    { key: 'clear', data: 'clear' },
    { key: '0', data: 0 },
    { key: 'done', data: 'done' }
  ]

  const onTouch = (event, row, col, keyEvent) => {
    if (onTouchListener) onTouchListener(event, row, col, keyEvent);
  };

  return (
    <View style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
    <View style={[ styles.wrapContainer, { top: coodinate.top, left: coodinate.left, bottom: coodinate.bottom } ]}>
      <View style={ styles.wrapBox }>
        <TouchableOpacity style={ styles.touchableOpacityExitBtn }
          onPress={(event) => onTouch(event, -1, -1, 'done')}>
          <Image
            source={require("../assets/images/btn-01.png")} style={{backgroundColor: '#feffff', width: 15, height: 15,  resizeMode: 'contain'}}>
          </Image>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{flex: 1, justifyContent: 'space-around'}}
        horizontal={false}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0}
        data={numpadData}
        keyExtractor={(data, index) => data.key}
        renderItem={data => (          
          <View style={{ padding: 10 }}>
            <TouchableOpacity
              style={[
                styles.touchableOpacity,
                data.item.data == 'clear' && { backgroundColor: '#f3cbda' },
                data.item.data == 'done' && { backgroundColor: '#d7e5e5' }
              ]}
              onPress={(event) => onTouch(event, row, col, data.item.data)}> 
              <Text
                style={[
                  { fontSize: 15, color: "#262d34", alignSelf: "center" },
                  'clear' === data.item.data && { color: 'white' },
                  'done' === data.item.data && { color: 'white' }
                ]}
              >
                {data.item.data}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      ></FlatList>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapContainer: {
    position: "absolute",
    zIndex: 9999,
    height: 370, width: 290, 
    borderRadius: 15, borderColor: '#ced5d7',
    backgroundColor: '#feffff', padding: 20, borderWidth: 1,
    shadowColor: '#ced5d7',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 10.0,
    shadowRadius: 8
  },
  wrapBox: {
    position: 'absolute',
    top: -10,
    left: 260
  },
  touchableOpacityExitBtn: {
    backgroundColor: '#feffff',
    borderRadius: 15,
    borderColor: '#ced5d7',
    borderWidth: 1,
    borderRadius: 100,
    padding: 10,
    shadowColor: '#ced5d7',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 10.0,
    shadowRadius: 8
  },
  touchableOpacity: {
    minWidth: 60,
    maxWidth: 60,
    minHeight: 60,
    maxHeight: 60,
    borderRadius: 15,
    justifyContent: 'center',
    backgroundColor: '#f8fcfd'
  }
});
