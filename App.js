import AddCourseScreen from "./screens/AddCourseScreen";
import HomeScreen from "./screens/HomeScreen";
import DispatchScreen from "./screens/DispatchScreen";
import CourseScreen from "./screens/CourseScreen";
import { View, Dimensions} from "react-native";

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { width, height } = Dimensions.get("window")
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return(
    <View style={{width:'100%', height:'100%'}}>
      <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
 
        if (route.name === 'AddCourse') {
          iconName = 'pencil';
        } else if (route.name === 'Dispatch') {
          iconName = 'users';
        } else {
          iconName = 'list';
        }
 
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#6aa1fc',
      tabBarInactiveTintColor: '#071427',
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {height:50, display:'flex', justifyContent: 'center'},
      tabBarHideOnKeyboard: true,

    })}
  >
      <Tab.Screen name='Course' component={CourseScreen}/>
      <Tab.Screen name='AddCourse' component={AddCourseScreen}/>
      <Tab.Screen name='Dispatch' component={DispatchScreen}/>
    </Tab.Navigator>
    </View>
    
  )
}

const App = () => {
 
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};


export default App;