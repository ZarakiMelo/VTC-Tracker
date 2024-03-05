import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

const AddCourseScreen = () => {

  const [course, setCourse] = useState({
    origin:'',
    destination:'',
    distance: '',
    type:'Green',
    day: '',
    hour: '',
    count:'',
    phoneNumber : '',
    driver: '',
  })

  const [distance, setDistance] = useState ('');
  const [date, setDate] = useState('13/03/23');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [count, setCount] = useState ('');
  const [coordinates, setCoordinates] = useState([]);

 const [types, setTypes] = useState ([{name:'Green',isSelected:true }, {name:'Luxe',isSelected:false }, {name:'Vans',isSelected:false }]);

  const handleSelectType = (type) => {
    if(course.type !== type){
      setCourse(prevState => ({
            ...prevState,
            type: type 
      }));
      const newTypes = types.map((e) =>{
          if (e.name===type){
            e.isSelected = true;
          }
          else {
            e.isSelected = false;
          }
      })
    }
  }

  const handleGetDirections = async () => {
    try {
      const API_KEY = 'AIzaSyCsdvOMtB6QvfVmAUxEYqRVPvtUr_szPy4';

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?destination=place_id%3A${destination}&origin=place_id%3A${origin}&key=${API_KEY}`
      );
      const data = await response.json();
      if (data.routes.length > 0) {
       setDistance(data.routes[0].legs[0].distance)
       console.log(data.routes[0].legs[0].distance);
      }
    } catch (error) {
      console.error('Error fetching directions: ', error);
    } 
  };


  const typesToDisplay = types.map((e)=>{
    return  <TouchableOpacity style={styles.typeButton} onPress={() => handleSelectType(e.name)}>
              <Text style={e.isSelected?styles.typeTextSelected:styles.typeText}>{e.name}</Text>
            </TouchableOpacity>
  })

console.log('Course :', course);
console.log('types :', types);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          
            <Text style={styles.title}>Nouvelle course</Text>
            
            <View style={styles.firstInputContainer}>
              <GooglePlacesAutocomplete
                minLength={3}
                fetchDetails={true}
                styles={{
                  textInputContainer: {
                    backgroundColor: '#b8cced',
                    width:'90%',
                    height: 45,
                    borderRadius: 5,
                  },
                  textInput: {
                    color: '#5d5d5d',
                    fontSize: 16,
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    paddingLeft: 10,
                    paddingRight: 5,
                  },
                  predefinedPlacesDescription: {
                    color: '#8faee0',
                  },
                  listView: {
                    position: 'absolute',
                    top: 40, 
                    width:'90%',
                    maxHeight:137, 
                  },
                }}
                placeholder='Départ'
                onPress={(data, details = null) => {
                  setCourse(prevState => ({
                    ...prevState,
                    origin: data.place_id
                  }));
                }}
                query={{
                  key: 'AIzaSyCsdvOMtB6QvfVmAUxEYqRVPvtUr_szPy4',
                  language: 'fr',
                  components: 'country:fr',
                  location: '45.75781, 4.83201', 
                  radius: '100000',
                }}
              />
            </View>
            <View style={styles.secondInputContainer}>
              <GooglePlacesAutocomplete
                styles={{
                  textInputContainer: {
                    backgroundColor: '#b8cced',
                    width:'90%',
                    height: 45,
                    borderRadius: 5,
                  },
                  textInput: {
                    color: '#5d5d5d',
                    fontSize: 16,
                    width: '100%',
                    borderRadius: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    backgroundColor: 'white',
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                  listView: {
                    position: 'absolute',
                    top: 40,
                    width:'90%',
                    maxHeight: 137,
                    
                  },
                }}
                placeholder='Arrivée'
                onPress={(data) => {
                  setCourse(prevState => ({
                    ...prevState,
                    destination: data.place_id
                  }));
                }}
                query={{
                  key: 'AIzaSyCsdvOMtB6QvfVmAUxEYqRVPvtUr_szPy4',
                  language: 'fr',
                  components: 'country:fr',
                  location: '45.75781, 4.83201', 
                  radius: '100000',
                }}
              />
            </View>
            <View style={styles.gammeContent}>
              {typesToDisplay}
            </View>
          {!isCalendarVisible && <View style={styles.dateContent}>
                    <TouchableOpacity style={styles.dateButton} onPress={() => setIsCalendarVisible(true)}>
                      <Text style={styles.dateText}>{course.day}</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>à</Text>
                    <TouchableOpacity style={styles.hourButton} onPress={() => handleGetDirections}>
                      <Text style={styles.hourText}>{course.hour} </Text>
                    </TouchableOpacity>
           </View>}
           
            {isCalendarVisible &&  <Calendar
                    style={{
                      borderWidth: 1,
                      borderColor: '#6aa1fc',
                      maxHeight: 450,
                      width: 300,
                      backgroundColor: '#6aa1fc',
                      marginTop: 20,
                    }}
                    
                    onDayPress={day => {
                    console.log('day :', typeof(day.year))

                    const newDay = `${(day.day.toString().length)>1?day.day.toString():'0'+day.day.toString()}/${(day.month.toString().length)>1?day.month.toString():'0'+day.month.toString()}/${day.year.toString().slice(2,4)}`;
                    setCourse(prevState => ({
                      ...prevState,
                      day: newDay 
                }));
                    setDate(newDay);
                    setIsCalendarVisible(false)
                  }}
                  markedDates={{
                    date: {selected: true, marked: true, selectedColor: '#fec101'},
                  }}
                  theme={{
                    arrowColor: 'white',
                    backgroundColor: '#6aa1fc',
                    calendarBackground: '#b8cced',
                    textSectionTitleColor: 'black',
                    selectedDayBackgroundColor: 'white',
                    selectedDayTextColor: 'white',
                    todayTextColor: 'white',
                    dayTextColor: 'black',
                    textDisabledColor: '#b8cced',
                  }}
                  hideExtraDays={true}
                />}
       
                   <View style={styles.card}>
                    
                          <Text style={styles.cardText}>Prix de la course :</Text>
                          <Text style={styles.priceText}>{course.count} €</Text>
              
                    <View style={styles.dispatchContent}>
                        <TouchableOpacity style={styles.typeButton} >
                            <FontAwesome name='user' size={20} color='#020818' />
                        </TouchableOpacity>
                        <View style={styles.separator}></View>
                        <TouchableOpacity style={styles.typeButton} >
                            <FontAwesome name='users' size={20} color='#020818' />
                        </TouchableOpacity>
                   </View>
                   
                 </View>
                        <TouchableOpacity style={styles.resetButton} >
                          <Text style={styles.typeText}>Reset</Text>
                        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020818',
    marginTop: 25,
    padding: 10,
    display: 'flex',
    alignItems: 'center',

  },
 
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 30,
    color: 'white',

  },
  firstInputContainer: {
    height: 70,
    width:'100%',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    zIndex: 2,
  },
  secondInputContainer: {
    height: 70,
    width:'100%',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    zIndex: 1,
  },

  gammeContent :{
    width: '90%',
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  typeButton: {
    width: 90,
    height: 50,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6aa1fc',
  },
  typeText : {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  typeTextSelected : {
    textAlign: 'center',
    color:'white',
    fontWeight: 'bold',
  },
  dateContent:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 30,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#2F2F2F',
  },
  dateText:{
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    },
  text:{
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  hourText:{
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  card :{
    backgroundColor: '#2F2F2F',
    display: 'flex',
    width: '90%',
    height: 200,
    marginTop: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  cardText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  priceText :{
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  dispatchContent:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  separator :{
    backgroundColor: '#6aa1fc',
    width: 2,
  },
  resetButton: {
    width: 150,
    height: 30,
    borderRadius: 5,
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6aa1fc',
  }
});

export default AddCourseScreen;