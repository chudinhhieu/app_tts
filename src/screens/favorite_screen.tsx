import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  useColorScheme,
  Alert,
  View,
  Modal,
  TextInput,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import styles from '../styles/style_favorite';
import { useNavigation } from '@react-navigation/native';

const FavoriteScreen = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<Array<{ id: string; img: string; name: string; price: number; quantity: number; isChecked: boolean }>>([]);
  const [newProduct, setNewProduct] = useState({
    img:'',
    name: '',
    price: '',
    sale_price: '',
    sold: '',
    quantity:''
  });
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  const deleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`https://663c5f1117145c4d8c35fbeb.mockapi.io/cart/${productId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      // Nếu xóa sản phẩm thành công, cập nhật danh sách sản phẩm
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error.message);
      Alert.alert('Error', 'Failed to delete product. Please try again later.');
    }
  };

  const removeProduct = (productId: string) => {
    Alert.alert(
      "Xóa sản phẩm",
      "Bạn có chắc muốn xóa sản phẩm này?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Xóa",
          onPress: () => deleteProduct(productId)
        }
      ]
    );
  };

  useEffect(() => {
    fetch('https://663c5f1117145c4d8c35fbeb.mockapi.io/cart')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  const Item = ({ item, removeProduct }: { item: { id: string, img: any, name: string, price: string, sale_price: string, sold: string }, removeProduct: (id: string) => void }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.img }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.sale_price}>{item.sale_price}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <Text style={styles.sold}>Đã bán {item.sold}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/icons/favorite.png')} style={styles.additionalImage} />
        <TouchableOpacity onPress={() => removeProduct(item.id)}>
          <Image source={require('../../assets/icons/remove.png')} style={styles.additionalImage} />
        </TouchableOpacity >
        <TouchableOpacity onPress={() => addCart(item)}>
          <Image source={require('../../assets/icons/cart.png')} style={styles.additionalImage} />
        </TouchableOpacity>

      </View>
    </View>
  );

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const addCart = async (item: { img: string; name: string; price: string; sale_price: string; sold: string }) => {
    try {
      const newCartItem = {
        img: item.img,
        name: item.name,
        price: parseInt(item.price), 
        sale_price: parseInt(item.sale_price), 
        quantity:1,
        sold: item.sold,
      };
  
      const response = await fetch('https://663c5f1117145c4d8c35fbeb.mockapi.io/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCartItem),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
  
      navigation.navigate('cart');
      closeModal();
    } catch (error) {
      console.error('Error adding product:', error.message);
      Alert.alert('Error', 'Failed to add product. Please try again later.');
    }
  };
  


const addProduct = async () => {
  setNewProduct({ ...newProduct, img: 'https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-thumbnew-600x600.jpg' })
  try {
    const response = await fetch('https://663c5f1117145c4d8c35fbeb.mockapi.io/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) {
      throw new Error('Failed to add product');
    }
    // Nếu thêm sản phẩm thành công, cập nhật danh sách sản phẩm
    const data = await response.json();
    setProducts([...products, data]);
    closeModal();
  } catch (error) {
    console.error('Error adding product:', error.message);
    Alert.alert('Error', 'Failed to add product. Please try again later.');
  }
};

return (
  <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
    <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
    <View style={styles.header}>
      {/* <Image source={require('../../assets/icons/icon_back_black.png')} style={styles.image} /> */}
      <Text style={styles.textHeader}>Danh sách sản phẩm</Text>
    </View>
    <FlatList
      data={products}
      renderItem={({ item }) => <Item item={item} removeProduct={removeProduct} />}
      keyExtractor={item => item.id}
      style={{ flex: 1 }}
    />
    {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('sendOTP')}>
      <Text style={styles.textButton}>Về trang chủ</Text>
    </TouchableOpacity> */}
    <TouchableOpacity style={styles.fab} onPress={openModal}>
      <Text style={styles.fabIcon}>+</Text>
    </TouchableOpacity>

    <Modal visible={showModal} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Thêm sản phẩm mới</Text>
          <TextInput
            placeholder="Tên sản phẩm"
            style={styles.input}
            onChangeText={text => setNewProduct({ ...newProduct, name: text })}
          />
          <TextInput
            placeholder="Giá"
            style={styles.input}
            onChangeText={text => setNewProduct({ ...newProduct, price: text })}
          />
          <TextInput
            placeholder="Giá khuyến mãi"
            style={styles.input}
            onChangeText={text => setNewProduct({ ...newProduct, sale_price: text })}
          />
          <TextInput
            placeholder="Đã bán"
            style={styles.input}
            onChangeText={text => setNewProduct({ ...newProduct, sold: text })}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={addProduct}>
              <Text style={styles.addButtonText}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

  </SafeAreaView>
);
}
export default FavoriteScreen;
