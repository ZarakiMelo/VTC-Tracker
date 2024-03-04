import AddCourseScreen from "./screens/AddCourseScreen";
import HomeScreen from "./screens/HomeScreen";
import DispatchScreen from "./screens/DispatchScreen";
import CourseScreen from "./screens/CourseScreen";

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return(
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
      tabBarActiveTintColor: '#fec101',
      tabBarInactiveTintColor: '#071427',
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {height:60, display:'flex', justifyContent: 'center'}

    })}
  >
      <Tab.Screen name='Course' component={CourseScreen}/>
      <Tab.Screen name='AddCourse' component={AddCourseScreen}/>
      <Tab.Screen name='Dispatch' component={DispatchScreen}/>
    </Tab.Navigator>
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