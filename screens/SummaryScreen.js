import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Alert
} from 'react-native';

import SummaryBox from '../components/SummaryBox';
import { BrandRecord } from '../models/BrandRecord';
import { ProductRecord } from '../models/ProductRecord';
import { ProductVariantRecord } from '../models/ProductVariantRecord';
import { OrderRecord } from '../models/OrderRecord';
import { UserRecord } from '../models/UserRecord';
import { VariantOrderRecord } from '../models/VariantOrderRecord';

import { Order } from '../models/OrderFormRepository';
import { QuantityService } from '../services/QuantityService';

export default function SummaryScreen(props) {
  const {
    setScreen,
    setOrderList
  } = props;

  const orderList = props.orderList.map(o => new OrderRecord({
    brand: new BrandRecord(o.brand),
    product: new ProductRecord(o.product),
    variantList: o.variantList.map(v => new ProductVariantRecord(v)),
    variantOrderList: o.variantOrderList.map(v => new VariantOrderRecord(v))
  }));

  const user = new UserRecord(props.employee);
  
  const onTouchListenerPlaceOrderBtn = () => {
    const dttm = getDttm(new Date(Date.now()));
    const variantOrderList = orderList.reduce((accu, orderRecord) => 
      [...accu, ...orderRecord.getVariantOrderList().reduce((accuInner, variantOrderRecord) => [...accuInner, variantOrderRecord], [])], []);

    Order.insertOrder(variantOrderList, user.getEmployeeId(), dttm).then(resJson => {
      new Promise((resolve) => {
        Alert.alert(
          'info',
          'Placed an order successfully.',
          [
            {
              text: 'Ok',
              onPress: () => {
                resolve('YES');
              }
            }
          ],
          { 
            cancelable: false
          }
        );
      }).then(ret => {
        setOrderList([]);
        setScreen("brandList");
      });
    }).catch(error => {
      if (error.message === "Network request failed") {
        alert(error.message);
        return;
      }

      console.log(error);
      alert(error.status);
    });
  }

  const onTouchListenerFileDownloadBtn = () => {
    Order.uploadToGoogleSheet(orderList).then(resJson => {
      new Promise((resolve) => {
        Alert.alert(
          'info',
          resJson.status,
          [
            {
              text: 'Ok',
              onPress: () => {
                resolve('YES');
              }
            }
          ],
          { 
            cancelable: false
          }
        );
      }).then(ret => {
        // setOrderList([]);
        // setScreen("brandList");
      });
    }).catch(error => {
      if (error.message === "Network request failed") {
        alert(error.message);
        return;
      }

      console.log(error);
      alert(error.status);
    });
  }

  const getDttm = date_ob => {
    // current year
    let yyyy = date_ob.getFullYear();

    // current month
    let mm = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current date
    let dd = ("0" + date_ob.getDate()).slice(-2);

    // current hours
    let hh = ("0" + date_ob.getHours()).slice(-2);

    // current minutes
    let mi = ("0" + date_ob.getMinutes()).slice(-2);

    // current seconds
    let ss = ("0" + date_ob.getSeconds()).slice(-2);

    return `${yyyy}${mm}${dd}${hh}${mi}${ss}`;
  }

  useEffect(() => {
    console.log("SummaryScreen useEffect called");
    Order.listAll().then(list => {
      console.log("summary");
      console.log(list);
    });
  }, []);

  return (
    <View style={styles.contentArea}>
      <View style={{position: 'absolute', width: 270, height: 30, top: -50, left: 100, flexDirection: 'row'}}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ height: '100%' }}
            onPress={onTouchListenerFileDownloadBtn}>
            <Image
              source={require("../assets/images/btn_download.png")} style={{ width: '100%', height: '100%', resizeMode: 'contain' }}>
            </Image>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ height: '100%' }}
            onPress={onTouchListenerPlaceOrderBtn}>
            <Image
              source={require("../assets/images/btn_place_order.png")} style={{ width: '100%', height: '100%', resizeMode: 'contain' }}>
            </Image>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        data={orderList}
        keyExtractor={(data, i) => i.toString()}
        renderItem={({item}) => 
          (
            <SummaryBox
              data={item}
            ></SummaryBox>
          )
        }>
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#feffff',
  },
  touchableOpacity: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row"
  }  
});
