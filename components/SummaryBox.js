import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";

import { QuantityService } from '../services/QuantityService';

export default function SummaryBox(props) {
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

    onTouchListener,
  } = props;

  const [sizeVariants, setSizeVariants] = useState([]);
  const [colorVariants, setColorVariants] = useState([]);
  const [quantityTable, setQuantityTable] = useState([]);

  useEffect(() => {
    console.log("SummaryBox useEffect called");

    const colors = QuantityService.getColorVariants(data.getVariantList());
    const quantityTable = QuantityService.getQuantityTable(data.getVariantList(), data.getVariantOrderList());

    const filteredColors = [];
    const filteredQuantityTable = quantityTable.filter((row, i) => {
      const sum = row.reduce((accu, cur) => accu + cur, 0);
      if (sum > 0) {
        filteredColors.push(colors[i]);
      }
      
      return sum > 0;
    }); 

    setSizeVariants(QuantityService.getSizeVariants(data.getVariantList()));
    setColorVariants(filteredColors);
    setQuantityTable(filteredQuantityTable);
  }, [data]);

  return (
    <View style={{ flex: 1}}>
      <View style={{ flex: 1, height: 40, flexDirection: 'row', paddingBottom: 2, borderBottomWidth: 1, borderColor: '#d0d7de'}}>
        <View
          style={{ flex: 1.5 }}
        >
        </View>
        <View
          style={{ flex: 2.5, justifyContent: 'flex-end' }}
        >
          <Text
            style={{
              fontSize: 13,
              color: '#8396a6'
            }}>ITEM</Text>
        </View>
        <View style={{flex: 9, flexDirection: 'row' }}>
          <View style={{flex: 4, justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 13, color: '#8396a6', paddingLeft: 15}}>COLOR</Text>
          </View>
          {
            sizeVariants.map((v, i) => (
              <View style={{flex: 1, justifyContent: 'flex-end' }} key={i}>
                <Text style={{ fontSize: 13, color: '#8396a6', alignSelf: 'center' }}>{v.shortCode}</Text>
              </View>
            ))
          }
        </View>
        <View style={{ flex: 1.2, justifyContent: 'flex-end' }}>
          <Text style={{ fontSize: 13, color: '#8396a6', alignSelf: 'center' }}>TOTAL QTY</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View
          style={{ flex: 1.5, flexDirection: "row", justifyContent: 'center', borderBottomWidth: 1, borderColor: '#d0d7de' }}
        >
          <Text
            style={{
              fontStyle: 'italic',
              fontSize: 23,
              color: "#042c37",
              padding: 10
            }}
          >
            {data.getBrand().getTitle()}
          </Text>
        </View>
        <View style={{ flex: 2.5 }}>
          <View style={{height: 40, justifyContent: 'center'}}>
            <Text style={{ fontStyle: 'italic', fontSize: 23, color: '#08273b', backgroundColor: '#ebf3f5', paddingHorizontal: 5, paddingVertical: 1, alignSelf: 'flex-start'}}>{data.getProduct().getCode()}</Text>
          </View>
          <View style={{flex: 1, borderBottomWidth: 1, borderColor: '#d0d7de' }}>
            <Text style={{ fontSize: 12, color: '#052b39'}}>{data.getProduct().getTitle()}</Text>
          </View>
        </View>
        <View style={{ flex: 9 }}>
          {
            quantityTable.map((item, i) => {
              return (
                <View style={{ flex: 1, flexDirection: 'row', height: 50, backgroundColor: '#f7f8f9', borderBottomWidth: 1, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#d0d7de' }} key={i}>
                  <View style={{ flex: 4, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#012b36', paddingLeft: 15 }}>{colorVariants[i]}</Text>
                  </View>
                  {
                    item.map((v, i) => (
                      <View style={{flex: 1, justifyContent: 'center' }} key={i}>
                        <Text style={{ fontSize: 20, color: '#052a3a', alignSelf: 'center' }}>{v < 1 ? '·' : v}</Text>
                      </View>
                    ))
                  }
                </View>
              )
            })
          }
        </View>
        <View style={{ flex: 1.2, justifyContent: 'center', borderBottomWidth: 1, borderColor: '#d0d7de' }}>
          <Text style={{ fontSize: 25, color: '#052a3a', alignSelf: 'center' }}>{data.getVariantOrderList().reduce((accu, cur) => accu + cur.getQuantity(), 0)}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  
});
