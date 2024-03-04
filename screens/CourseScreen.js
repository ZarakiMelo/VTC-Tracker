import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView } from "react-native";

const CourseScreen = () => {
    return(
        <SafeAreaView style={styles.container}>
            
                <Text style={styles.text}>Course Screen</Text>
          
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
        padding: 10,
        backgroundColor: '#071427',
        marginTop: 30,
    },
    text :{
        fontSize: 40,
        color: '#fec101',
    }

});
export default CourseScreen; 