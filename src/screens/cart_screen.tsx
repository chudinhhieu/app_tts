import React, { useState, useRef, useEffect } from 'react';
import { Image, SafeAreaView, TouchableOpacity, StatusBar, Text, TextInput, View, FlatList, Alert } from 'react-native';
import {
    useNavigation,
} from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import styles from '../styles/style_favorite';
import CheckBox from '@react-native-community/checkbox';
const CartScreen = () => {
    const navigation = useNavigation();
    const [toggleCheckBoxAll, setToggleCheckBoxAll] = useState(false);
    const [products, setProducts] = useState<Array<{ id: string; img: string; name: string; price: number; quantity: number; isChecked: boolean }>>([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch('https://663c5f1117145c4d8c35fbeb.mockapi.io/cart')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleToggleCheckBoxAll = () => {
        const updatedProducts = products.map(product => ({
            ...product,
            isChecked: !toggleCheckBoxAll
        }));
        setProducts(updatedProducts);
        setToggleCheckBoxAll(!toggleCheckBoxAll);
    };

    const handleToggleCheckBoxProduct = (productId: string) => {
        const updatedProducts = products.map(product => {
            if (product.id === productId) {
                return {
                    ...product,
                    isChecked: !product.isChecked
                };
            } else {
                return product;
            }
        });

        setProducts(updatedProducts);
        const allProductsChecked = updatedProducts.every(product => product.isChecked);
        if (allProductsChecked) {
            setToggleCheckBoxAll(true);
        } else {
            setToggleCheckBoxAll(false);
        }
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        products.forEach(product => {
            if (product.isChecked) {
                totalPrice += product.price * product.quantity;
            }
        });
        return totalPrice;
    };
    const getSelectedProductCount = () => {
        let selectedCount = 0;
        products.forEach(product => {
            if (product.isChecked) {
                selectedCount += 1;
            }
        });
        return selectedCount;
    };
    const handleIncrementQuantity = (productId) => {
        const updatedProducts = products.map(product => {
            if (product.id === productId) {
                return {
                    ...product,
                    quantity: product.quantity + 1
                };
            } else {
                return product;
            }
        });
        setProducts(updatedProducts);
    };

    const handleDecrementQuantity = (productId) => {
        const updatedProducts = products.map(product => {
            if (product.id === productId && product.quantity > 1) {
                return {
                    ...product,
                    quantity: product.quantity - 1
                };
            } else {
                return product;
            }
        });
        setProducts(updatedProducts);
    };
    const handleDeleteConfirmation = (productId) => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn xóa sản phẩm này?',
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Đồng ý', onPress: () => handleDeleteProduct(productId) }
            ]
        );
    };

    const handleDeleteProduct = (productId) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
    };
    const handleCheckout = () => {
        const selectedProducts = products.filter(product => product.isChecked);
        navigation.navigate('oder', { selectedProducts });
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F6F6' }}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <View style={{ flexDirection: 'row', backgroundColor: '#ffffff', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/icons/icon_back_black.png')} style={styles.image} />
                    </TouchableOpacity>                    
                    <Text style={{ color: '#000000', fontSize: 20, fontWeight: '400', marginStart: 18 }}>Giỏ hàng</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleEditToggle}>
                        <Text style={{ color: '#000000', fontSize: 18, fontWeight: '400', marginEnd: 10 }}>
                            {isEditing ? 'Xong' : 'Sửa'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../../assets/icons/Messages.png')} style={styles.image} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, height: 40, backgroundColor: '#ffffff', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <CheckBox
                        style={{ marginEnd: 5 }}
                        value={toggleCheckBoxAll}
                        onValueChange={handleToggleCheckBoxAll}
                    />
                    <Image source={require('../../assets/icons/store.png')} style={styles.image} />
                    <Text style={{ marginStart: 10, color: '#000000', fontWeight: 500 }}>FP4 Shop</Text>
                </View>
                <TouchableOpacity>
                    <Text style={{ color: '#002222', fontSize: 16, fontWeight: '400' }}>Sửa</Text>
                </TouchableOpacity>
            </View> */}
            <FlatList
                style={{ marginTop: 5 }}
                data={products}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ marginTop: 2, flexDirection: 'row', alignItems: 'center', paddingVertical: 5, backgroundColor: '#ffffff', paddingHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <CheckBox
                                style={{ marginEnd: 10, alignSelf: 'center' }}
                                value={item.isChecked}
                                onValueChange={() => handleToggleCheckBoxProduct(item.id)}
                            />
                            <View style={{
                                alignSelf: 'center',
                                borderRadius: 10, shadowOpacity: 0.8,
                                shadowColor: '#000000',
                                elevation: 8,
                            }}>
                                <Image source={{ uri: item.img }} style={{
                                    width: 90, height: 90
                                }} />
                            </View>
                            <View style={{ flex: 1, marginStart: 15, justifyContent: 'space-around' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#000000', fontWeight: 500 }}>{item.name}</Text>
                                    {isEditing && (
                                        <TouchableOpacity onPress={() => handleDeleteConfirmation(item.id)}>
                                            <Text style={{ color: 'red', fontWeight: '500', marginEnd: 10 }}>Xóa</Text>
                                        </TouchableOpacity>
                                    )}</View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#000000', fontWeight: 500 }}>{item.price}đ</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', borderWidth: 0.5, borderRadius: 5 }}>
                                        <TouchableOpacity
                                            style={{ height: 25, width: 25, borderRightWidth: 0.5, justifyContent: 'center' }}
                                            onPress={() => handleDecrementQuantity(item.id)}
                                        >
                                            <Image source={require('../../assets/icons/minus-sign.png')} style={{ width: 12, height: 12, alignSelf: 'center' }} />
                                        </TouchableOpacity>

                                        <Text style={{ height: 25, width: 35, textAlign: 'center', color: '#000000', paddingTop: 2, fontSize: 14 }}>{item.quantity}</Text>

                                        <TouchableOpacity
                                            style={{ height: 25, width: 25, borderLeftWidth: 0.5, justifyContent: 'center' }}
                                            onPress={() => handleIncrementQuantity(item.id)}
                                        >
                                            <Image source={require('../../assets/icons/plus.png')} style={{ width: 12, height: 12, alignSelf: 'center' }} />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, height: 40, backgroundColor: '#ffffff', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Image source={require('../../assets/icons/sale.png')} style={styles.image} />
                    <Text style={{ marginStart: 10, color: '#000000', fontWeight: 500 }}>Voucher ưu đãi</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#979797', fontSize: 14, fontWeight: '400' }}>Chọn mã ưu đãi</Text>
                    <Image source={require('../../assets/icons/next.png')} style={{ width: 12, height: 12, marginStart: 10 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, height: 40, backgroundColor: '#ffffff', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Image source={require('../../assets/icons/coin.png')} style={styles.image} />
                    <Text style={{ marginStart: 10, color: '#000000', fontWeight: 500 }}>Phương thức thanh toán</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../../assets/icons/next.png')} style={{ width: 12, height: 12, marginStart: 10 }} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 45, backgroundColor: '#ffffff' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <CheckBox
                        style={{ marginStart: 25, marginEnd: 5 }}
                        value={toggleCheckBoxAll}
                        onValueChange={handleToggleCheckBoxAll}
                    />
                    <Text style={{ color: '#000000', fontSize: 15 }}>Tất cả</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                    <View>
                        <Text style={{ color: '#000000', fontSize: 14 }}>Tổng thanh toán</Text>
                        <Text style={{ color: '#FFC300', fontWeight: '500', fontSize: 14 }}>{calculateTotalPrice()}đ</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleCheckout}
                        style={{ marginStart: 10, backgroundColor: '#FFC300', paddingHorizontal: 10, height: 45, justifyContent: 'center' }}
                    >
                        <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 14, textAlign: 'center' }}>
                            Mua hàng({getSelectedProductCount()})
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
}

export default CartScreen;