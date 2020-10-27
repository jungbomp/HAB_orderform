import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";

export default function QuantityRow(props) {
  const {
    data,
    index,
    width,
    height,
    borderColor,
    backgroundColor,
    upperTextFontSize,
    upperTextColor,
    lowerTextFontSize,
    lowerTextColor,
    touchedColumn,

    onTouchListener,
  } = props;

  const onTouch = (event, row, col) => {
    if (onTouchListener) onTouchListener(event, row, col);
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", minHeight: 80 }}>
      <View
        style={{ flex: 2, flexDirection: "row", justifyContent: "flex-end" }}
      >
        <Text
          style={{
            fontSize: 15,
            color: "#8595a1",
            alignSelf: "center",
            paddingRight: 20,
          }}
        >
          {data.color}
        </Text>
      </View>
      <View
        style={[
          { flex: 8, flexDirection: "row" },
          !(parseInt(index) % 2) && { backgroundColor: "#f6fafb" },
        ]}
      >
        {
          data.size.map((item, i) => {
            return (
              <View
                style={[
                  { flex: 1, flexDirection: "row", justifyContent: "center" },
                ]}
                key={i}
              >
                <TouchableOpacity
                  style={[styles.touchableOpacity, parseInt(index) % 2 && { backgroundColor: "#f6fafb" }, i === touchedColumn && { backgroundColor: '#feffff' }]}
                  onPress={event => onTouch(event, index, i)}
                > 
                  <Text
                    style={[
                      { fontSize: 25, color: "#052b39", alignSelf: "center" },
                      i === touchedColumn && { color: '#76adaf' }
                    ]}
                  >
                    {item < 0 ? '-' : item}
                  </Text>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    flex: 1,
    minWidth: 60,
    maxWidth: 60,
    minHeight: 60,
    maxHeight: 60,
    borderRadius: 8,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#eef2f5",
  }
});
