import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import BrandListContainer from '../containers/BrandListContainer';
import ProductListContainer from '../containers/ProductListContainer';
import QuantityContainer from '../containers/QuantityContainer';
import SummaryContainer from '../containers/SummaryContainer';

import { BrandList } from '../models/OrderFormRepository';

export default function MainScreen({ navigation, route, screen, productList, productVariantList, orderList, setEmployee, setBrandList, setScreen }) {
  
  const [user] = useState(route.params.user);
  
  const screens = {
    brandList: { prev: null, next: "productList" },
    productList: { prev: "brandList", next: "quantity" },
    quantity: { prev: "productList", next: "summary" },
    summary: { prev: "quantity", next: null }
  }

  const onTouchListenerBackBtn = () => {
    setScreen(screens[screen].prev || screen);
  }

  const switchScreenToBrandList = () => {
    setScreen('brandList');
  }

  const switchScreenToProductList = () => {
    if (productList.length > 0) {
      setScreen('productList');
    }
  }

  const switchScreenToQuantity = () => {
    if (productVariantList.length > 0) {
      setScreen('quantity');
    }
  }

  const switchScreenToSummary = () => {
    if (orderList.length > 0) {
      setScreen('summary');
    }
  }

  useEffect(() => {
    console.log("MainScreen setBrandList useEffect called");
    Promise.all([BrandList.listAll(), BrandList.listAllVendor()]).then((values) => {
      setBrandList(values[0].map(r => r.toObject()), values[1].map(r => r.toObject()));
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    console.log("MainScreen setEmployee useEffect called");
    setEmployee(user.toObject());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navigator}>
        <TouchableOpacity
          style={styles.backBtnArea}
          onPress={onTouchListenerBackBtn}>
          <Image
            source={require("../assets/images/back_btn.png")} style={styles.backBtnBox}>
          </Image>
        </TouchableOpacity>
        <View style={{flex: 4}}>
        </View>
        <View style={styles.navigationBtnArea}>
          <View style={styles.navigationBtnStyle}>
            <TouchableOpacity onPress={switchScreenToBrandList}>
              <Text style={{color: screen === 'brandList' ? '#75acae' : '#687885'}}>Brand</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navigationBtnStyle}>
            <TouchableOpacity onPress={switchScreenToProductList}>
              <Text style={{color: screen === 'productList' ? '#75acae' : '#687885'}}>Product List</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navigationBtnStyle}>
            <TouchableOpacity onPress={switchScreenToQuantity}>
              <Text style={{color: screen === 'quantity' ? '#75acae' : '#687885'}}>Quantity</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navigationBtnStyle}>
            <TouchableOpacity onPress={switchScreenToSummary}>
              <Text style={{color: screen === 'summary' ? '#75acae' : '#687885'}}>Order</Text>
            </TouchableOpacity>
          </View>
          <View style={[{flexDirection: 'column', justifyContent:'center'}]}>
            <View style={[styles.navigationBtnStyle, {flex: 3, justifyContent: 'flex-end'}]}>
              <Image
                source={require("../assets/images/logo.png")} style={{resizeMode: "center"}}>
              </Image>
            </View>
            <View style={[{justifyContent:'flex-start', alignItems:"center", flex: 1}]}>
              <Text style={{color: '#687885'}}>{user.getFirstName() + ' ' + user.getLastName()}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        {
          "brandList" === screen && (
            <BrandListContainer />
          )
        }
        {
          "productList" === screen && (
            <ProductListContainer />
          )
        }
        {
          "quantity" === screen && (
            <QuantityContainer />
          )
        }
        {
          "summary" === screen && (
            <SummaryContainer />
          )
        }
      </View>
    </View>
  );
}

MainScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#feffff',
  },
  navigator: {
    flex: 1,
    flexDirection: 'row'
  },
  content: {
    flex: 9
  },
  backBtnArea: {
    flex: 1
  },
  backBtnBox: {
    width: 80,
    height: 80,
    resizeMode: 'center',
    backgroundColor: '#76adaf'
  },
  navigationBtnArea: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  navigationBtnStyle: {
    justifyContent: 'center'
  }
});
