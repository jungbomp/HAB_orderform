import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Image, Alert, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView } from 'react-native';

import QuantityRow from '../components/QuantityRow';
import Numpad from '../components/Numpad';
import PackInfoBox from '../components/PackInfoBox';

import { BrandRecord } from '../models/BrandRecord';
import { ProductRecord } from '../models/ProductRecord';
import { ProductVariantRecord } from '../models/ProductVariantRecord';

import { QuantityService } from '../services/QuantityService';
import { VariantOrderRecord } from '../models/VariantOrderRecord';
import { OrderRecord } from '../models/OrderRecord';

import { Order } from '../models/OrderFormRepository';


export default function QuantityScreen(props) {
  const {
    setScreen,
    setOrderList
  } = props;

  console.log("QuantityScreen");
  const brand = new BrandRecord(props.brand);
  const product = new ProductRecord(props.product);
  const productVariantList = props.productVariantList.map(v => new ProductVariantRecord(v));
  const orderList = props.orderList.map(o => new OrderRecord({
    brand: new BrandRecord(o.brand),
    product: new ProductRecord(o.product),
    variantList: o.variantList.map(v => new ProductVariantRecord(v)),
    variantOrderList: o.variantOrderList.map(v => new VariantOrderRecord(v)) }));

  const [quantityTable, setQuantityTable] = useState([]);
  const [colorVariant, setColorVariant] = useState([]);
  const [sizeVariant, setSizeVariant] = useState([]);
  const [packingInfo, setPackingInfo] = useState([]);
  
  const [numpadVisible, setNumpadVisible] = useState(false);
  const [packInfoBoxVisible, setPackInfoBoxVisible] = useState(false);
  const [quantityRow, setQuantityRow] = useState(-1);
  const [quantityCol, setQuantityCol] = useState(-1);
  const [numpadCoodinate, setNumpadCoodinate] = useState({
    top: undefined, left: undefined, bottom: undefined, right: undefined
  });

  const onTouchListenerPackingInfoBtn = () => {
    const info = sizeVariant.map(s => ({ size: s.shortCode, qty: product.getPackInfo() }));
    setPackingInfo(info);
    setPackInfoBoxVisible(true);
  }

  const onTouchListenerPackInfoBox = () => {
    setPackInfoBoxVisible(false);
  }

  const onTouchListenerCancelBtn = () => {
    setScreen("productList");
  }

  const onTouchListenerAddToOrderBtn = async () => {
    const quantityList = QuantityService.getVariantQuantityList(productVariantList, quantityTable);
    if (quantityList.length > 0) {
      const newVariantList = quantityList.map((v) => ({ brandCode: brand.getCode(), brandType: brand.getType(), productCode: product.getCode(), stdSku: v.stdSku, quantity: v.quantity }));
      const index = orderList.findIndex(v => v.getBrand().getCode() === brand.getCode() && v.getProduct().getCode() === product.getCode());
      
      if (index < 0) {
        const order = new OrderRecord({ brand, product, variantList: productVariantList, variantOrderList: newVariantList.map(v => new VariantOrderRecord(v)) });
        await Order.save([...orderList, order]);
        setOrderList([...orderList.map(v => v.toObject()), order.toObject()]);
      } else {
        const filteredOrderList = orderList[index].getVariantOrderList().filter(item => newVariantList.every((v) => item.getStdSku() != v.stdSku));
        const order = new OrderRecord({ brand, product, variantList: productVariantList, variantOrderList: [...filteredOrderList, ...newVariantList.map(v => new VariantOrderRecord(v))] });
        const newOrderList = [...orderList];
        newOrderList[index] = order;
        await Order.save(newOrderList);
        setOrderList(newOrderList.map(v => v.toObject())); 
      }

      setScreen("summary");
    } else {
      Alert.alert(
        'info',
        'Total order quantity is 0.',
        [
          {
            text: 'Ok',
            onPress: () => {
              
            }
          }
        ],
        { 
          cancelable: false
        }
      );
    }
  }

  const onTouchListenerQuantityRow = (event, row, col) => {
    // console.log(`onTouchListenerQuantityRow: ${row}, ${col}`);
    // console.log(`pageX: ${event.nativeEvent.pageX}`);
    // console.log(`pageY: ${event.nativeEvent.pageY}`);
    let left = event.nativeEvent.pageX+50 - (750 < event.nativeEvent.pageX ? 360 : 0);
    let top = event.nativeEvent.pageY-100 - (470 < event.nativeEvent.pageY ? (630 < event.nativeEvent.pageY ? 250 : 230) : 0);

    // console.log(`left: ${left}`);
    // console.log(`top: ${top}`);

    const coodinate = {
      left: left,
      right: undefined,
      top: top,
      bottom: undefined
    }

    setQuantityRow(row);
    setQuantityCol(col);
    setNumpadCoodinate(coodinate);
    setNumpadVisible(true);
  }

  const onTouchListenerNumpad = (event, row, col, keyEvent) => {
    if ('done' === keyEvent) {
      setQuantityRow(-1);
      setQuantityCol(-1);
      setNumpadVisible(false);
    } else {
      const newTable = [...quantityTable];
      newTable[row][col] = ('clear' === keyEvent ? 0 : (newTable[row][col] * 10 + keyEvent));
      setQuantityTable(newTable);
    } 
  }

  useEffect(() => {
    console.log("QuantityScreen useEffect called");
    const index = orderList.findIndex(v => v.getBrand().getCode() === brand.getCode() && v.getProduct().getCode() === product.getCode());

    setQuantityTable(QuantityService.getQuantityTable(productVariantList, (index < 0 ? null : orderList[index].getVariantOrderList())));
    setSizeVariant(QuantityService.getSizeVariants(productVariantList));
    setColorVariant(QuantityService.getColorVariants(productVariantList));
  }, [props.variantOrderList]);
  
  return (
    <View style={styles.container}>
      <View style={styles.headerArea}>
        <View style={{flex: 2}}>

        </View>
        <View style={{flex: 11, flexDirection: 'row', paddingTop: 10, paddingBottom: 20}}>
          <View style={{flex: 7, flexDirection: 'row'}}>
            <View style={{flex: 3}}>
              <View style={{flex: 3, justifyContent: 'center'}}>
                <Text style={{fontSize: 23, color: '#08293a', alignSelf: 'center'}}>{product.getCode()}</Text>
              </View>
              <View style={{flex: 2, borderColor: '#96c2c2', borderRadius: 3, borderWidth: 1}}>
                <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={onTouchListenerPackingInfoBtn}>
                  <Text style={{fontSize: 13, color: '#76abb0', alignSelf: 'center'}}>Pack Information</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 8, justifyContent: 'flex-start'}}>
              <Text style={{ fontSize: 15, color: '#052939', padding: 20}}>{product.getTitle()}</Text>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={onTouchListenerCancelBtn}>
                <Image
                  source={require("../assets/images/btn-01.png")} style={{width: '50%', resizeMode: 'contain'}}>
                </Image>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 3, flexDirection: 'row' }}>
            <View style={{flex: 4}}></View>
            <TouchableOpacity
              style={{flex: 5, flexDirection: 'row'}}
              onPress={onTouchListenerAddToOrderBtn}>
              <Image
                source={require("../assets/images/btn-02.png")} style={styles.addToOrderButton}>
              </Image>
            </TouchableOpacity>
            <View style={{flex: 1}}></View>
          </View>
        </View>
        <View style={{flex:1}}>
        </View>
      </View>
      <View style={styles.contentArea}>
        <View style={styles.bodyArea}>
          <View style={{flex: 1, paddingTop: 5}}>
            <ScrollView contentContainerStyle={{flex: 1}} horizontal={true}>
              <View style={{flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 2}}></View>
                  <View style={{flex: 8, flexDirection: 'row'}}>
                    {
                      sizeVariant.map((size) => (
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}} key={size.code}>
                          <Text style={{fontSize: 20, color: '#8595a1', alignSelf: 'center'}}>{size.shortCode}</Text>
                        </View>
                      ))
                    }
                  </View>
                </View>
                <View style={{flex: 12}}>
                  <FlatList
                    contentContainerStyle={{}}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0}
                    data={colorVariant}
                    keyExtractor={(color) => color}
                    renderItem={({index}) => (
                      <QuantityRow 
                        data={({ color: colorVariant[index], size: quantityTable[index] })}
                        index={index}
                        key={index}                          
                        touchedColumn={(() => (index === quantityRow ? quantityCol : undefined))() }
                        onTouchListener={onTouchListenerQuantityRow}
                      ></QuantityRow>
                    )}>
                  </FlatList>
                </View>
                <View style={{flex: 1}}></View>
              </View>
              
            </ScrollView>
          </View>
        </View>
        <View style={{flex: 1}}></View>
      </View>
      {
        numpadVisible && (
          <Numpad
            row={quantityRow} col={quantityCol} coodinate={numpadCoodinate}
            onTouchListener={onTouchListenerNumpad}
          ></Numpad>
        )
      }
      {
        packInfoBoxVisible && (
          <PackInfoBox
            data={packingInfo}
            onTouchListener={onTouchListenerPackInfoBox}
          ></PackInfoBox>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#feffff',
  },
  headerArea: {
    flex: 2,
    flexDirection: 'row'
  },
  contentArea: {
    flex: 15,
    flexDirection: 'row'
  },
  addToOrderButton: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
    alignSelf: 'center',
    shadowColor: '#cdd5d9',
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 2.0,
    shadowRadius: 2
  },
  bodyArea: {
    flex: 10
  },
  touchableOpacity: {
    flex: 1,
    justifyContent: "center"
  }
});