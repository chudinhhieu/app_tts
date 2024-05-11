import React, { useState } from 'react';
import { Image, SafeAreaView, StatusBar, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import styles from '../styles/style_oder';

const OderScreen = ({ route }) => {
    const navigation = useNavigation();
    const { selectedProducts } = route.params;
    const [discountAmount, setDiscountAmount] = useState<number>(0);
    const [address, setAddress] = useState<string>('Chọn địa giao hàng');
    const renderItem = ({ item }) => (
        <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', borderBottomWidth: 0.5, borderColor: 'gray' }}>
            <Image source={{ uri: item.img }} style={{ width: 50, height: 50, marginRight: 10 }} />
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '500', color: 'black' }}>{item.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'red', fontWeight: '600' }}>{item.price}đ</Text>
                    <Text style={{ fontWeight: '500', color: 'black' }}>x{item.quantity}</Text>
                </View>
            </View>
        </View>
    );
    const calculateTotalPriceProduct = () => {
        let totalPrice = 0;
        selectedProducts.forEach((product) => {
            totalPrice += product.price * product.quantity;
        });
        return totalPrice;
    };
    const calculateTotal = () => {
        return calculateTotalPriceProduct() - discountAmount + 10;
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/icon_back_black.png')} style={styles.image} />
                </TouchableOpacity>                  
                <Text style={styles.textHeader}>Thanh toán</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('maps', { setAddress })} style={{ flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#C4C4C4', padding: 20 }}>
                <Image source={require('../../assets/icons/place.png')} style={styles.image} />
                <View style={{ marginLeft: 15,marginRight:10 }}>
                    <Text style={{ color: 'black', fontWeight: 400, marginBottom: 7 }}>Địa chỉ nhận hàng</Text>
                    <Text style={{ color: 'black', fontWeight: 400 }}>Trịnh Phương I 0978865508</Text>
                    <Text style={{ color: 'black', fontWeight: 400 }}>{address}</Text>
                </View>
            </TouchableOpacity>
            <FlatList
                data={selectedProducts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{ flex: 1 }}
            />
            <View style={{ flexDirection: 'row', borderTopWidth: 1, paddingVertical: 7, borderBottomWidth: 1, borderColor: '#C4C4C4', alignItems: 'center', marginTop: 5, backgroundColor: '#ffffff', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Image source={require('../../assets/icons/sale.png')} style={styles.image} />
                    <Text style={{ marginStart: 10, color: '#000000', fontWeight: 500 }}>Voucher ưu đãi</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('promotion', { setDiscountAmount })} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#979797', fontSize: 14, fontWeight: '400' }}>Chọn mã ưu đãi</Text>
                    <Image source={require('../../assets/icons/next.png')} style={{ width: 12, height: 12, marginStart: 10 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 7, backgroundColor: '#ffffff', paddingHorizontal: 20, borderBottomWidth: 1, borderColor: '#C4C4C4', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Image source={require('../../assets/icons/coin.png')} style={styles.image} />
                    <Text style={{ marginStart: 10, color: '#000000', fontWeight: '500' }}>Phương thức thanh toán</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../assets/icons/next.png')} style={{ width: 12, height: 12, marginStart: 10 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 4, borderColor: '#C4C4C4' }}>
                <Image source={require('../../assets/icons/oder.png')} style={{ width: 45, height: 85, }} />
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={{ color: 'black', fontWeight: '600', fontSize: 15, marginBottom: 10 }}>Chi tiết thanh toán</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontWeight: '400', fontSize: 15, }}>Tổng tiền hàng</Text>
                        <Text style={{ color: 'black', fontWeight: '400', fontSize: 15, textAlign: 'right' }}>{calculateTotalPriceProduct().toLocaleString()}đ</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontWeight: '400', fontSize: 15 }}>Tổng tiền phí vận chuyển</Text>
                        <Text style={{ color: 'black', fontWeight: '400', fontSize: 15 }}>10đ</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontWeight: '400', fontSize: 15 }}>Tổng tiền giảm giá</Text>
                        <Text style={{ color: 'black', fontWeight: '400', fontSize: 15 }}>-{discountAmount}đ</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'black', fontWeight: '600', fontSize: 15 }}>Tổng thanh toán</Text>
                        <Text style={{ color: 'red', fontWeight: '600', fontSize: 17, textAlign: 'right' }}>{calculateTotalPriceProduct().toLocaleString()}đ</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingTop: 10 }}>
                <View>
                    <Text style={{ color: '#000000', fontSize: 14, fontWeight: '400' }}>Tổng thanh toán</Text>
                    <Text style={{ color: 'red', fontWeight: '600', fontSize: 17, textAlign: 'right' }}>{calculateTotal().toLocaleString()}đ</Text>
                </View>
                <TouchableOpacity onPress={()=>navigation.replace('payment_success')} style={{ marginStart: 10, backgroundColor: '#FFC300', paddingHorizontal: 10, height: 45, justifyContent: 'center' }}>
                    <Text style={{ color: '#ffffff', fontWeight: '600', fontSize: 16, textAlign: 'center' }}>Đặt hàng</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default OderScreen;