import React, { useState, useEffect } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { MonoText } from '../components/StyledText';

import ItemBox from '../components/ItemBox';
import BrandList from '../components/BrandList';

import { ProductList, ProductVariantList } from '../models/OrderFormRepository';
import { BrandRecord } from '../models/BrandRecord';
import { ProductRecord } from '../models/ProductRecord';
import { ProductVariantRecord } from '../models/ProductVariantRecord';

export default function ProductListScreen(props) {
  const {
    setBrand,
    setProduct,
    setProductList,
    setProductVariantList,
    setScreen
  } = props;

  const brand = new BrandRecord(props.brand);
  const productList = props.productList.map(r => new ProductRecord(r));
  const brandList = [...props.brandList.map(r => new BrandRecord(r)), ...props.vendorList.map(r => new BrandRecord(r))];

  const [brandListVisible, setBrandListVisible] = useState(false);

  const onTouchListenerBrandName = () => {
    setBrandListVisible(!brandListVisible);
  }

  const onTouchListenerBrandList = (item) => {
    ProductList.listAll(item.getCode(), item.getType()).then((list) => {
      setBrandListVisible(false);
      setBrand(item.toObject());
      setProductList(list.map(r => r.toObject()));
    }).catch((err) => {
      console.log(err);
    });
  }

  const onTouchListenerProductBox = (item) => {
    ProductVariantList.listAll(item.getCode()).then(list => {
      setProductVariantList(list.map(v => v.toObject()));
      setProduct(item.toObject());
      setScreen("quantity");
    }).catch ((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    console.log("ProductListScreen useEffect called with Brand list");
  }, []);

  useEffect(() => {
    console.log("ProductListScreen useEffect called with Product list");
  }, []);

  return (
    <View style={styles.contentArea}>
      <View style={{flex: 1}}>
      </View>
      <View style={styles.bodyArea}>
        <View style={{flex: 1, paddingTop: 5}}>
          <View style={{position: 'absolute', width: 100, height: 30, top: -30}}>
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={onTouchListenerBrandName}
            >
              <View style={{height: '100%', justifyContent: 'flex-end'}}>
                <Text style={{color: '#76aead', fontSize: 17}}>{ brand.getTitle() }</Text>
              </View>
              <View style={{height: '100%', justifyContent: 'flex-end', paddingLeft: 5, paddingBottom: 5}}>
                <Image
                  source={require("../assets/images/btn-03.png")} style={{width: 15, height: 10, resizeMode: 'contain', transform: [{ rotate: brandListVisible ? '180deg' : '0deg'}]}}>
                </Image>
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal={false} numColumns={2}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.1}
            keyExtractor={item => item.code}
            data={productList}
            renderItem={({item}) => {
              return (
                <ItemBox
                  data={item} width={400} height={120} borderColor={'#c7cbcc'} backgroundColor={'#f3f7f8'}
                  upperTextFontSize={15} upperTextColor={'#343e47'} lowerTextFontSize={13} lowerTextColor={'#86929f'}
                  onTouchListener={onTouchListenerProductBox}
                ></ItemBox>
              )
            }}>
          </FlatList>
        </View>
        {
          brandListVisible && (
            <BrandList
              brandList={brandList}
              onTouchListener = {onTouchListenerBrandList}
            >
            </BrandList>
          )
        }
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
  touchableOpacity: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row"
  }
});
