import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
        width: 30.21,
        height: 30,
      },
      containerInput:{
        marginTop:35,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
      },
      input: {
        width: 50, 
        height: 50,
        fontSize:20,
        fontWeight:'bold',
        borderRadius: 10,
        backgroundColor: '#F6F6F6',
        textAlign: 'center',
        color:'#000000',
        shadowOpacity: 0.8,
        shadowColor: '#000000',
        elevation: 8,
      },
      containerTextTime:{
        marginTop:25,
        marginBottom:10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        marginTop:50,
        backgroundColor: "#FFC300",
        height: 45,
        justifyContent: 'center',
        width: '85%',
        borderRadius: 23.5,
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
});

export default styles;