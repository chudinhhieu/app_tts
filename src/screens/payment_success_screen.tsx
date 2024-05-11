import React, { useState, useRef, useEffect } from 'react';
import { Image, SafeAreaView, ToastAndroid, TouchableOpacity, StatusBar, Text, TextInput, FlatList, View } from 'react-native';
import {
    useNavigation,
} from '@react-navigation/native';
import styles from '../styles/style_oder';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const PaymentSuccessScreen = ({ navigation, route }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/icon_back_black.png')} style={styles.image} />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'space-between', flex: 1, paddingBottom: 20 }}>
                <View>
                    <Text style={{ color: '#FFBB00', fontWeight: 'bold', fontSize: 21, alignSelf: 'center' }}>Thanh toán thành công</Text>
                    <Image source={require('../../assets/images/logo_shop.png')} style={{ width: 130, height: 130, marginTop: 10, alignSelf: 'center' }} />
                </View>
                <View style={{ marginBottom: 100 }}>
                    <Text style={{ color: '#FFBB00', fontWeight: 'bold', fontSize: 21, alignSelf: 'center' }}>Cảm ơn</Text>
                    <Text style={{ marginTop: 10, color: 'black', fontSize: 15, alignSelf: 'center', textAlign: 'center', marginHorizontal: 50 }}>Cảm ơn bạn đã lựa chọn tin tưởng <Text style={{ fontWeight: 'bold' }}>FP4 SHOP</Text> Chúng tôi cam kết sẽ đem đến cho bạn những sản phẩm chất lượng nhất. Hy vọng bạn sẽ hài lòng với các sản phẩm của chúng tôi.</Text>
                </View>
                <View >
                    <TouchableOpacity onPress={()=>navigation.replace('favorite')} style={{ alignSelf: 'center', backgroundColor: '#FFBB00', width: '80%', height: 40, justifyContent: 'center', borderRadius: 20 }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Tiếp tục mua hàng</Text>
                    </TouchableOpacity>
                    <Text  onPress={()=>navigation.replace('favorite')} style={{ marginTop: 15, color: '#FFBB00', fontSize: 15, alignSelf: 'center' }}>Quay lại trang chủ</Text>

                </View>
            </View>
        </SafeAreaView>
    );
}

export default PaymentSuccessScreen;