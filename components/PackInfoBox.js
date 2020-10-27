import React, { Component } from "react";

import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform
} from "react-native";

export default function PackInfoBox(props) {
  const {
    data,
    onTouchListener,
  } = props;

  const onTouchListenerClose = () => {
    if (onTouchListener) {
      onTouchListener();
    }
  }
  
  return (
    <View style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
      <View
        style={[
          styles.listBoxView,
          {
            top: 122,
            left: 150
          }
        ]}
      >
        <View style={{flex: 1, paddingVertical: 30, paddingHorizontal: 30, backgroundColor: '0xfeffff'}}>
          <View style={{flex: 1, flexDirection: 'row', position: 'absolute', alignSelf: 'flex-end', padding: 15}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={onTouchListenerClose}
            >
              <Text style={{fontSize: 12, color: 'gray', alignSelf:'flex-end'}}>close</Text>

            </TouchableOpacity>
          </View>
          
          <View style={{flex: 1, paddingVertical: 5}}>
            <Text style={{fontSize: 14, color: '#072838'}}>Pack Information</Text>
          </View>
          <View style={{flex: 3}}>
            <FlatList contentContainerStyle={{}}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              onEndReachedThreshold={0}
              keyExtractor={ (data, index) => data.size }
              onEndReachedThreshold={0} 
              data={data}
              renderItem={({item}) => {
                return (
                  <View style={{flex: 1, minWidth: 50}}>
                    <View style={{height: 35, justifyContent: 'center', backgroundColor: '#f5f9fa'}}>
                      <Text style={{fontSize: 17, color: '#052b35', alignSelf: 'center'}}>{item.size}</Text>
                    </View>
                    <View style={{height: 35, justifyContent: 'center'}}>
                      <Text style={{fontSize: 17, color: '#012b38', alignSelf: 'center'}}>{item.qty}</Text>
                    </View>
                  </View>
                )
              }}>
            </FlatList>    
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  listBoxView: {
    maxWidth: 900,
    position: "absolute",
    // zIndex: 9999,
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
