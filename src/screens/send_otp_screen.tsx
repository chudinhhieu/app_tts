import React, { useState, useRef, useEffect } from 'react';
import { Image, SafeAreaView, TouchableOpacity, StatusBar, Text, TextInput, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import styles from '../styles/style_send_otp';
import {
  useNavigation,
} from '@react-navigation/native';
const SendOTPScreen = () => {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState(['', '', '', '']);
  const [remainingTime, setRemainingTime] = useState({ minutes: 0, seconds: 5 });
  const [showResend, setShowResend] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const refs: React.RefObject<TextInput>[] = Array(4).fill(0).map(() => useRef<TextInput>(null));

  const handleInputChange = (text: string, index: number): void => {
    if (/^\d$/.test(text)) {
      const newInputs = [...inputs];
      newInputs[index] = text;
      setInputs(newInputs);

      if (index < 3 && text !== '') {
        refs[index + 1].current?.focus();
      }
    } else if (text === '') {
      const newInputs = [...inputs];
      newInputs[index] = '';
      setInputs(newInputs);

      if (index > 0) {
        refs[index - 1].current?.focus();
      }
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (remainingTime.minutes === 0 && remainingTime.seconds === 0) {
        setShowResend(true);
        clearInterval(intervalRef.current!);
      } else {
        setRemainingTime((prev) => {
          if (prev.seconds === 0) {
            return { minutes: prev.minutes - 1, seconds: 59 };
          } else {
            return { ...prev, seconds: prev.seconds - 1 };
          }
        });
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [remainingTime]);

  const handleResend = () => {
    setRemainingTime({ minutes: 0, seconds: 5 });
    setShowResend(false);
    intervalRef.current = setInterval(() => {
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/icons/icon_back.png')} style={styles.image} />
      </TouchableOpacity>
      <Text style={{ color: '#FFC300', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>Mã xác minh</Text>
      <Text style={{ color: '#655665', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 25 }}>Mã xác minh đã gửi về SĐT của bạn</Text>
      <Text style={{ color: '#655665', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 45, width: "70%", alignSelf: 'center' }}>Vui lòng kiểm tra tin nhắn và nhập mã xác minh tại đây.</Text>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          maxLength={1}
          value={inputs[0]}
          onChangeText={(text) => handleInputChange(text, 0)}
          keyboardType="numeric"
          ref={refs[0]}
        />
        <TextInput
          style={styles.input}
          maxLength={1}
          value={inputs[1]}
          onChangeText={(text) => handleInputChange(text, 1)}
          keyboardType="numeric"
          ref={refs[1]}
        />
        <TextInput
          style={styles.input}
          maxLength={1}
          value={inputs[2]}
          onChangeText={(text) => handleInputChange(text, 2)}
          keyboardType="numeric"
          ref={refs[2]}
        />
        <TextInput
          style={styles.input}
          maxLength={1}
          value={inputs[3]}
          onChangeText={(text) => handleInputChange(text, 3)}
          keyboardType="numeric"
          ref={refs[3]}
        />
      </View>
      {!showResend ? (
        <View style={styles.containerTextTime}>
          <Text style={{ color: '#555555', fontSize: 14, textAlign: 'center' }}>Mã OTP sẽ hết hạn trong </Text>
          <Text style={{ color: '#FFC300', fontSize: 14, textAlign: 'center' }}>
            {`${remainingTime.minutes.toString().padStart(2, '0')}:${remainingTime.seconds.toString().padStart(2, '0')}`}
          </Text>
        </View>
      ) : (
        <View style={styles.containerTextTime}>
          <Text style={{ color: '#555555', fontSize: 14, textAlign: 'center' }}>Mã OTP đã hết hạn</Text>
        </View>
      )
      }
      <Text style={{ color: '#555555', fontSize: 18, textAlign: 'center' }}>Bạn chưa nhận được?</Text>
      {showResend ? (
        <Text onPress={handleResend} style={{ color: '#FFC300', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>Gửi lại mã xác minh</Text>
      ) : null}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>Về trang chủ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SendOTPScreen;
