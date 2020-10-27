import React from "react";

import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

export default function BrandList(props) {
  const {
    brandList,
    onTouchListener,
  } = props;

  const onTouchListenerListItem = (item) => {
    if (onTouchListener) {
      onTouchListener(item);
    }
  }

  return (
    <View
      style={[
        styles.listBoxView,
        {
          
        }
      ]}
    >
      <FlatList contentContainerStyle={{}}
        onEndReachedThreshold={0}
        keyExtractor={(data, index) => data.getCode()}
        data={brandList}
        renderItem={({item}) => {
          return (
            <View style={{width: 200, height: 40}}>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => onTouchListenerListItem(item)}
              >
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  <Text style={{fontSize: 14, fontWeight: 'bold'}}>{item.getCode()}</Text>
                </View>
                <View style={{flex: 4, justifyContent: 'flex-end'}}>
                  <Text style={{fontSize: 16}}>{item.getTitle()}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        }}>
      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  listBoxView: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    position: "absolute",
    zIndex: 9999,
    top: 0,
    left: 0,
    maxHeight: 500,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cdd5d9',
    backgroundColor: "#feffff",

    justifyContent: "center",

    shadowColor: '#cdd5d9',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 10.0,
    shadowRadius: 8
  },
  touchableOpacity: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row"
  }
});
