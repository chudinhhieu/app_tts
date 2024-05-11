import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/style_favorite';
const MapSelectionScreen = ({ route }) => {
    const navigation = useNavigation();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { setAddress } = route.params;

    const getAddressFromCoordinates = async (coordinate) => {
        const { latitude, longitude } = coordinate;
        const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

        try {
            const response = await axios.get(apiUrl);
            if (response.data.display_name) {
                return response.data.display_name;
            } else {
                return 'Không tìm thấy địa chỉ';
            }
        } catch (error) {
            console.error('Lỗi khi gọi OpenStreetMap Nominatim API:', error);
            return 'Lỗi khi lấy địa chỉ';
        }
    };

    const handleMapPress = async (coordinate: any) => {
        setSelectedLocation(coordinate);
        console.log(coordinate);

        const address = await getAddressFromCoordinates(coordinate);
        setSelectedAddress(address);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/icon_back_black.png')} style={styles.image} />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Chọn địa chỉ nhận hàng</Text>
            </View>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 21.0278,
                    longitude: 105.8342,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={(e) => handleMapPress(e.nativeEvent.coordinate)}
            >
                {selectedLocation && (
                    <Marker coordinate={selectedLocation} />
                )}
            </MapView>
            {selectedAddress && (
                <View style={{ marginLeft: 15, paddingVertical: 20, paddingHorizontal: 10,shadowOpacity: 0.8,
                    shadowColor: '#000000',
                    elevation: 8,backgroundColor:'#000' }}>
                    <Text style={{ color: '#FFC300', fontWeight: 600, marginBottom: 7, fontSize: 16 }}>Địa chỉ nhận hàng</Text>
                    <Text style={{ color: 'black', fontWeight: 500 }}>{selectedAddress}</Text>

                    <TouchableOpacity onPress={() => {
                        setAddress(selectedAddress);
                        navigation.goBack();
                    }} style={{
                        marginTop: 20,
                        backgroundColor: "#FFC300",
                        height: 45,
                        justifyContent: 'center',
                        width: '80%',
                        borderRadius: 23.5,
                        alignSelf: 'center',
                        shadowOpacity: 8,
                        shadowColor: '#000000'
                    }}>
                        <Text style={styles.textButton}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

export default MapSelectionScreen;
