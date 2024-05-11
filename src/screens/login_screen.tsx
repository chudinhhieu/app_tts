import React, { useState, useRef, useEffect } from 'react';
import { Image, SafeAreaView, ToastAndroid, TouchableOpacity, StatusBar, Text, TextInput, View } from 'react-native';
import {
    useNavigation,
} from '@react-navigation/native';
import styles from '../styles/style_send_otp';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const LoginScreen = () => {
    const navigation = useNavigation()
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [taiKhoan, setUsername] = useState('');
    const [matKhau, setPassword] = useState('');
    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };
    const showToastWithGravityAndOffset = (content: string) => {
        ToastAndroid.showWithGravityAndOffset(
            content,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
        );
    };
    const handleLogin = async () => {
        try {
            const response = await fetch('https://skylab-datn-server.onrender.com/api/account/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taiKhoan,
                    matKhau,
                }),
            });

            const data = await response.json();

            if (!data.success) {
                ToastAndroid.showWithGravityAndOffset(
                    data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
                return;
            }
            await AsyncStorage.setItem('userId', data.value);
            navigation.replace('favorite');
        } catch (error) {
            console.error('Lỗi:', error);
            ToastAndroid.showWithGravityAndOffset(
                'Đã xảy ra lỗi khi đăng nhập!',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <Text style={{ marginTop: 30, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7, fontWeight: 'bold', color: "#FFC300", fontSize: 32, textAlign: 'center', alignSelf: 'center' }}>Đăng nhập</Text>
            <View style={{ paddingHorizontal: 10, marginTop: 40, backgroundColor: '#F6F6F6', width: '80%', alignSelf: 'center', borderRadius: 20, height: 53, shadowOpacity: 0.8, shadowColor: '#000000', elevation: 8, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/icons/user.png')} style={{ marginLeft: 10, marginRight: 10 }} />
                <TextInput
                    value={taiKhoan}
                    onChangeText={text => setUsername(text)}
                    style={{ flex: 1, fontWeight: '600', color: "#919191" }}
                    placeholder='Email hoặc số điện thoại'
                />
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 40, backgroundColor: '#F6F6F6', width: '80%', alignSelf: 'center', borderRadius: 20, height: 53, shadowOpacity: 0.8, shadowColor: '#000000', elevation: 8, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/icons/lock.png')} style={{ marginLeft: 10, marginRight: 10 }} />
                <TextInput
                    value={matKhau}
                    onChangeText={text => setPassword(text)}
                    style={{ flex: 1, fontWeight: '600', color: '#919191' }}
                    placeholder='Mật khẩu'
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={{ paddingHorizontal: 10 }}>
                    <Image style={{ width: 20, height: 20, }} source={!isPasswordVisible ? require('../../assets/icons/eye-open.png') : require('../../assets/icons/eye-closed.png')} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{
                marginTop: 50,
                backgroundColor: "#FFC300",
                height: 45,
                justifyContent: 'center',
                width: '85%',
                borderRadius: 23.5,
                alignSelf: 'center',
                shadowOpacity: 8,
                shadowColor: '#000000'
            }} onPress={handleLogin}>
                <Text style={styles.textButton}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                marginTop: 10,
                backgroundColor: "white",
                height: 45,
                justifyContent: 'center',
                width: '85%',
                borderRadius: 23.5,
                alignSelf: 'center',
                shadowOpacity: 8,
                shadowColor: '#000000',
                borderWidth:2,
                borderColor:'#FFC300'
            }} onPress={()=> navigation.navigate('register')}>
                <Text style={{color:'#FFC300',fontWeight:'bold',textAlign:'center'}}>Đăng ký</Text>
            </TouchableOpacity>
            <View style={{
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{ color: '#555555', fontSize: 14, textAlign: 'center', fontWeight: '500' }}>Quên mật khẩu?</Text>
            </View>
            <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#5F5F5F' }} />
                <Text style={{ marginHorizontal: 25, fontSize: 16 }}>Hoặc</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: '#5F5F5F' }} />
            </View>
            <TouchableOpacity
                style={{
                    marginTop: 30,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#4285F4',
                    width: '80%',
                    alignSelf: 'center',
                    height: 45,
                    borderRadius: 20
                }}
            >
                <Image source={require('../../assets/icons/facebook.png')} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#ffffff', fontWeight: '600' }}>Login with Facebook</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    marginTop: 15,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    width: '80%',
                    borderColor: '#000000',
                    borderWidth: 1.5,
                    alignSelf: 'center',
                    height: 45,
                    borderRadius: 20
                }}
            >
                <Image source={require('../../assets/icons/google.png')} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#000000', fontWeight: '600' }}>Login with Facebook</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default LoginScreen;