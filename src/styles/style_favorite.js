import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      backgroundColor: "#fff",
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textHeader: {
      textAlign: 'center',
      color: '#000',
      fontSize: 22,
      fontWeight: 'bold',
      flex: 1,
    },
    image: {
      width: 30.21,
      height: 30,
    },
    item: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    productImage: {
      width: 120,
      height: 110,
      marginRight: 15,
    },
    productDetails: {
      flex: 1,
      justifyContent: 'space-around',
    },
    productName: {
      fontWeight: '500',
      color: "#000000",
      fontSize: 15,
      marginBottom: 5,
    },
    iconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 24,
      height: 24,
      marginLeft: 10,
    },
    title: {
      fontSize: 32,
    },
    priceContainer: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    price: {
      marginLeft: 10,
      fontSize: 12,
      fontWeight: '500',
      color: '#000000',
      textDecorationLine: "line-through"
    },
    sale_price: {
      fontSize: 12,
      fontWeight: '500',
      color: '#FF0000',
    },
    sold: {
      color: "#000000",
      fontWeight: "400",
      fontSize: 12,
    },
    imageContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    additionalImage: {
      width: 23,
      height: 23,
      marginVertical: 5,
    },
    button: {
      backgroundColor: "#FFC300",
      height: 47,
      justifyContent: 'center',
      width: '90%',
      borderRadius: 10,
      alignSelf: 'center',
      marginBottom: 20,
      shadowOpacity: 8,
      shadowColor: '#000000'
    },
    textButton: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    fab: {
      position: 'absolute',
      width: 56,
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      right: 15,
      bottom: 40,
      backgroundColor: '#FFC300',
      borderRadius: 30,
      elevation: 8,
    },
    fabIcon: {
      fontSize: 30,
      color: 'white',
    },
    buttonBack:{
      backgroundColor:"#FFC300",
      height:47,
      justifyContent:'center',
      width: '90%',
      borderRadius:10,
      alignSelf: 'center',
      marginBottom: 20, 
      shadowOpacity:8,
      shadowColor:'#000000'
    },
    textButtonBack:{
      color:"#FFFFFF",
      fontSize:16,
      fontWeight:'bold',
      textAlign:'center'
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      color:'#000000',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    addButton: {
      backgroundColor: '#FFC300',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 20,
      flex: 1,
      marginRight: 10,
    },
    addButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cancelButton: {
      backgroundColor: '#FF5733',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 20,
      flex: 1,
      marginLeft: 10,
    },
    cancelButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

export default styles;
