import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView } from "react-native";

const DispatchScreen = () => {
    return(
        <SafeAreaView style={styles.container}>
            
                 <Text style={styles.text}>Dispatch Screen</Text>
     
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
        marginTop: 30,
        padding: 10,
        backgroundColor: '#071427',
    },
    text :{
        fontSize: 40,
        color: '#fec101',
    }

});
export default DispatchScreen; 