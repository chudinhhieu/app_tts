import * as React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoriteScreen from './src/screens/favorite_screen';
import SendOTPScreen from './src/screens/send_otp_screen';
import RegisterScreen from './src/screens/register_screen';
import LoginScreen from './src/screens/login_screen';
import CartScreen from './src/screens/cart_screen';
import PromotionScreen from './src/screens/promotion_screen';
import OderScreen from './src/screens/oder_screen';
import PaymentSuccessScreen from './src/screens/payment_success_screen';
import MapSelectionScreen from './src/screens/chose_map_screen';
import PieChartScreen from './src/screens/pie_chart_screen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="pie">
      <Stack.Screen name="favorite" component={FavoriteScreen} options={{ headerShown: false }} />
      <Stack.Screen name="sendOTP" component={SendOTPScreen} options={{ headerShown: false }} />
      <Stack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="cart" component={CartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="promotion" component={PromotionScreen} options={{ headerShown: false }} />
      <Stack.Screen name="oder" component={OderScreen} options={{ headerShown: false }} />
      <Stack.Screen name="payment_success" component={PaymentSuccessScreen} options={{ headerShown: false }} />
      <Stack.Screen name="maps" component={MapSelectionScreen} options={{ headerShown: false }} />
      <Stack.Screen name="pie" component={PieChartScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
