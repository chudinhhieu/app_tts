import React, { useState, useRef, useEffect } from 'react';
import { Image, SafeAreaView, ToastAndroid, TouchableOpacity, StatusBar, Text, TextInput, FlatList, View } from 'react-native';
import {
    useNavigation,
} from '@react-navigation/native';
import styles from '../styles/style_favorite';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const PromotionScreen = ({ navigation, route }) => {
    const { setDiscountAmount } = route.params;

    const [promotions, setPromotions] = useState<Array<{ id: string; title: string; price_sale: number; time: Date; }>>([]);
    useEffect(() => {
        fetch('https://663d8b24e1913c4767949127.mockapi.io/promotion')
            .then(response => response.json())
            .then(data => setPromotions(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/icon_back_black.png')} style={styles.image} />
                </TouchableOpacity>                  
                <Text style={styles.textHeader}>Mã giảm giá</Text>
            </View>
            <View style={{ backgroundColor: '#FFC300', paddingBottom: 10, paddingTop: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput placeholder='Nhập mã khuyến mãi' style={{
                    paddingHorizontal: 7,
                    backgroundColor: '#fff', width: '62%', height: 43, shadowOpacity: 0.8,
                    shadowColor: '#000000',
                    elevation: 8,
                }} />
                <TouchableOpacity style={{
                    paddingHorizontal: 7,
                    justifyContent: 'center',
                    backgroundColor: '#D9D9D9', width: '30%', height: 43, shadowOpacity: 0.8,
                    shadowColor: '#000000',
                    elevation: 8,
                }} ><Text style={{ color: '#555555', textAlign: 'center' }}>Áp dụng</Text></TouchableOpacity>
            </View>
            <FlatList
                style={{ marginTop: 5, backgroundColor: '#F5F5F5', paddingTop: 10 }}
                data={promotions}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{
                        flexDirection: 'row', marginBottom: 10, backgroundColor: 'white', shadowOpacity: 0.8,
                        shadowColor: '#000000',
                        elevation: 8,
                    }}>
                        <View style={{ width: '32%', height: 95, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../assets/icons/promotion.png')} style={{ width: '100%', height: '100%' }} />
                            <Text style={{ position: 'absolute', color: 'white', left: 20, textAlign: 'center', fontWeight: '500' }}>Miễn phí vận chuyển</Text>
                        </View>
                        <View style={{ width: '38%', marginHorizontal: 10, justifyContent: 'space-around' }}>
                            <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 15 }}>Tất cả các hình thức
                                thanh toán</Text>
                            <Text style={{ color: 'black', fontSize: 13 }}>Giảm đến <Text style={{ color: 'red' }}>{item.price_sale}k</Text></Text>
                            <Text style={{ color: 'black', fontSize: 13 }}>Thời gian: Còn <Text style={{ color: 'red' }}>{item.price_sale} ngày</Text></Text>
                        </View>
                        <View style={{ flex: 1, marginHorizontal: 10, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                setDiscountAmount(item.price_sale);
                                navigation.goBack();
                            }} style={{ borderWidth: 1, borderColor: '#FFC300' }}><Text>Dùng ngay</Text></TouchableOpacity>
                            <Text style={{ marginTop: 10, fontSize: 12, alignSelf: "flex-end", color: 'blue' }}>Điều kiện</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

export default PromotionScreen;