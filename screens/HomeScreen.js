import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView } from "react-native";

const HomeScreen = ({navigation}) => {
    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('TabNavigator')}>
                <Text>Page d'accueil</Text>
            </TouchableOpacity>
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
    button :{
        backgroundColor: '#fec101',
    }

});
export default HomeScreen; 