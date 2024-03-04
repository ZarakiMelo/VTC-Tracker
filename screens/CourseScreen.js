import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";



const CourseScreen = () => {
    
    return(
        <SafeAreaView style={styles.container}>
            
                <Text style={styles.text}>Course Screen</Text>
          
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
        
        backgroundColor: '#071427',
        marginTop: 25,
        
    },
    text :{
        fontSize: 40,
        color: '#fec101',
    }

});
export default CourseScreen; 