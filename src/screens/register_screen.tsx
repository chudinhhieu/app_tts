import React, { useState, useRef, useEffect } from 'react';
import { Image, SafeAreaView, ToastAndroid, TouchableOpacity, StatusBar, Text, TextInput, View } from 'react-native';
import {
    useNavigation,
} from '@react-navigation/native';
import styles from '../styles/style_send_otp';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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

    const handleRegister = async () => {
        if (username === '' || password === '' || confirmPassword === '') {
            showToastWithGravityAndOffset('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        if (password !== confirmPassword) {
            showToastWithGravityAndOffset('Mật khẩu không khớp!');
            return;
        }

        try {
            const response = await fetch('https://skylab-datn-server.onrender.com/api/account/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taiKhoan: username,
                    matKhau: password,
                }),
            });

            const data = await response.json();

            if (!data.success) {
                showToastWithGravityAndOffset(data.message);
                return;
            }

            showToastWithGravityAndOffset('Đăng ký thành công!');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            navigation.replace('login');
        } catch (error) {
            console.error('Lỗi:', error);
            showToastWithGravityAndOffset('Đăng ký thất bại!');
        }
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/icon_back_black.png')} style={styles.image} />
                </TouchableOpacity>
            </View>
            <Text style={{ marginTop: 20, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7, fontWeight: 'bold', color: "#FFBB00", fontSize: 24, textAlign: 'center', alignSelf: 'center' }}>Đăng ký</Text>
            <View style={{ paddingHorizontal: 10, marginTop: 40, backgroundColor: '#F6F6F6', width: '80%', alignSelf: 'center', borderRadius: 20, height: 53, shadowOpacity: 0.8, shadowColor: '#000000', elevation: 8, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/icons/user.png')} style={{ marginLeft: 10, marginRight: 10 }} />
                <TextInput
                    value={username}
                    onChangeText={text => setUsername(text)}
                    style={{ flex: 1, fontWeight: '600', color: "#919191" }}
                    placeholder='Email hoặc số điện thoại'
                />
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 40, backgroundColor: '#F6F6F6', width: '80%', alignSelf: 'center', borderRadius: 20, height: 53, shadowOpacity: 0.8, shadowColor: '#000000', elevation: 8, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/icons/lock.png')} style={{ marginLeft: 10, marginRight: 10 }} />
                <TextInput
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={{ flex: 1, fontWeight: '600', color: '#919191' }}
                    placeholder='Mật khẩu'
                    secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility} style={{ paddingHorizontal: 10 }}>
                    <Image style={{ width: 20, height: 20, }} source={!isPasswordVisible ? require('../../assets/icons/eye-open.png') : require('../../assets/icons/eye-closed.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 40, backgroundColor: '#F6F6F6', width: '80%', alignSelf: 'center', borderRadius: 20, height: 53, shadowOpacity: 0.8, shadowColor: '#000000', elevation: 8, flexDirection: 'row', alignItems: 'center' }}>
                <Image source={require('../../assets/icons/lock.png')} style={{ marginLeft: 10, marginRight: 10 }} />
                <TextInput
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    style={{ flex: 1, fontWeight: '600', color: '#919191' }}
                    placeholder='Nhập lại mật khẩu'
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
            }} onPress={handleRegister}>
                <Text style={styles.textButton}>Đăng ký</Text>
            </TouchableOpacity>
            <View style={{
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{ color: '#555555', fontSize: 14, textAlign: 'center', fontWeight: '500' }}>Tôi đã có tài khoản? </Text>
                <Text onPress={() => navigation.replace('login')} style={{ color: '#FFC300', fontSize: 14, textAlign: 'center', fontWeight: '500' }}>Đăng nhập</Text>
            </View>
            <Text style={{ fontSize: 22, fontWeight: '600', color: '#000000', marginStart: 20, marginTop: 20 }}>Lưu ý</Text>
            <Text style={{
                fontSize: 16,
                color: '#000000',
                marginHorizontal: 27,
                marginTop: 20
            }}>Khi nhấn vào đăng kí là bạn đã chấp thuận <Text style={{
                color: '#FFC300', fontWeight: 'bold'
            }}>chính sách bảo mật</Text> của chúng tôi</Text>

        </SafeAreaView>
    );
}

export default RegisterScreen;