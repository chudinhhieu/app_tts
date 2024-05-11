import React from "react";
import { SafeAreaView, View,Text } from "react-native";
import styles from "../styles/style_pie";

const PieChartScreen =()=>{
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff',justifyContent:'center' }}>
            <View style={styles.container}>
                <Text style={styles.title}>Patients by Age</Text>
            </View>
        </SafeAreaView>
    )
}
export default PieChartScreen;