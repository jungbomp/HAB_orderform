import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import ItemBox from '../components/ItemBox';

import { ProductList } from '../models/OrderFormRepository';
import { BrandRecord } from '../models/BrandRecord';

export default function BrandListScreen(props) {
  const brandList = props.brandList.map(r => new BrandRecord(r));
  const vendorList = props.vendorList.map(r => new BrandRecord(r));
  
  const { setBrand, setProductList, setScreen } = props;

  /**
   * 
   * @param {*} item : Object
   * {
   *   VENDOR_CODE: "01",
   *   VENDOR_NAME: "Vendor 01 Name",
   *   EMAIL: "vendor01@email.com",
   *   ORDERS_FROM: "orders from",
   *   data: "vendor 01 Name",
   *   key: "Vendor 1",
   *   PRODUCTS:  [
   *     {
   *       BRAND_CODE: "KS",
   *       PRODUCT_CODE: "1KSA0001",
   *       PRODUCT_TITLE: "Product title",
   *       MANUFACTURING_CODE: "code",
   *       PACK_INFO: 1,
   *       ORDER_BY_SIZE: "N",
   *       data: "product title",
   *       key: "1KSA0001"
   *     }
   *   ]
   * }
   * or 
   * {
   *   BRAND_CODE: "KS",
   *   BRAND_NAME: "brand name",
   *   EMAIL: "brand@email.com",
   *   ORDERS_FROM: "orders from",
   *   data: "brand name",
   *   key: "KS"
   * }
   */
  const onTouchListenerBrandBox = item => {
    const record = new BrandRecord(item);
    ProductList.listAll(record.getCode(), record.getType()).then((list) => {
      setBrand(record.toObject());
      setProductList(list.map(p => p.toObject()));
      setScreen("productList");
    }).catch((err) => console.log(err));
  }

  useEffect(() => {
    console.log("BrandListScreen useEffect called with Brand List");
    
  }, []);

  useEffect(() => {
    console.log("BrandListScreen useEffect called with Vendor List");
  }, []);

  return (
    <View style={styles.contentArea}>
      <View style={{flex: 1}}>

      </View>
      <View style={styles.bodyArea}>
        <View style={styles.brandArea}>
          <View style={{flex: 1, paddingTop: 5}}>
            <FlatList
              horizontal={false} numColumns={3}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.1}
              data={brandList}
              keyExtractor={item => item.getCode()}
              renderItem={({item}) => {
                return (
                  <ItemBox
                    data={item} width={270} height={120} borderColor={'#c7cbcc'} backgroundColor={'#f3f7f8'}
                    upperTextFontSize={13} upperTextColor={'#84939e'} lowerTextFontSize={15} lowerTextColor={'#313f4b'}
                    onTouchListener={onTouchListenerBrandBox}
                  ></ItemBox>
                )
              }}>
            </FlatList>
          </View>
        </View>
        <View style={styles.venderArea}>
          <View style={{flex: 1, paddingBottom: 5}}>
            <FlatList contentContainerStyle={{}}
              horizontal={false} numColumns={3}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0} 
              data={vendorList}
              keyExtractor={item => item.code}
              renderItem={({item}) => {
                return (
                  <ItemBox
                    data={item} width={270} height={120} borderColor={'#bacecc'} backgroundColor={'#eff7f7'}
                    upperTextFontSize={13} upperTextColor={'#b4cdc9'} lowerTextFontSize={15} lowerTextColor={'#80a2a0'}
                    onTouchListener={onTouchListenerBrandBox}
                  ></ItemBox>
                )
              }}>
            </FlatList>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentArea: {
    flex: 1,
    flexDirection: 'row'
  },
  bodyArea: {
    flex: 6
  },
  brandArea: {
    flex: 5,
  },
  venderArea: {
    flex: 1,
    flexDirection: 'row'
  }
});
