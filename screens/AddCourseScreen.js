import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Calendar, LocaleConfig} from 'react-native-calendars';

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
  const [coordinates, setCoordinates] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [count, setCount] = useState ('');
  const [distance, setDistance] = useState ('');
  const [types, setTypes] = useState ([{name:'Green', isSelected : false}, {name:'Luxe', isSelected : false}, {name:'Vans', isSelected : false}]);
  const [date, setDate] = useState('13-03-2023');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  

  const handleSelectType = (type, state) => {
    const newTypes = types.map((e) => {
      if(e.name === type) {
        return {...e, isSelected : !state};
      }
      else {
        return e;
      }
    });
    setTypes(newTypes);
  };


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
    return  <TouchableOpacity style={styles.typeButton} onPress={() => handleSelectType(e.name, e.isSelected)}>
              <Text style={styles.typeText}>{e.name}</Text>
            </TouchableOpacity>
  })


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="never">
            <Text style={styles.title}>Nouvelle course</Text>
            
            <View style={styles.firstInputContainer}>
              <GooglePlacesAutocomplete
                minLength={3}
                fetchDetails={true}
                styles={{
                  textInputContainer: {
                    backgroundColor: '#b8cced',
                    width:330,
                    height: 45,
                    borderRadius: 10,
                  },
                  textInput: {
                    color: '#5d5d5d',
                    fontSize: 16,
                    width: 330,
                    backgroundColor: '#b8cced',
                    borderRadius: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                  },
                  predefinedPlacesDescription: {
                    color: '#8faee0',
                  },
                  listView: {
                    position: 'absolute',
                    top: 40, 
                    width:'97%',
                    maxHeight:137, 
                  },
                }}
                placeholder='Départ'
                onPress={(data, details = null) => {
                  setOrigin(data.place_id);
                }}
                query={{
                  key: 'AIzaSyCsdvOMtB6QvfVmAUxEYqRVPvtUr_szPy4',
                  language: 'fr', 
                }}
              />
            </View>
            <View style={styles.secondInputContainer}>
              <GooglePlacesAutocomplete
                styles={{
                  textInputContainer: {
                    backgroundColor: '#b8cced',
                    width:330,
                    height: 45,
                    borderRadius: 10,
                  },
                  textInput: {
                    color: '#5d5d5d',
                    fontSize: 16,
                    width: 330,
                    borderRadius: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    backgroundColor: '#b8cced',
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                  listView: {
                    position: 'absolute',
                    top: 40,
                    width:'97%',
                    maxHeight: 137,
                    
                  },
                }}
                placeholder='Arrivée'
                onPress={(data) => {
                  setDestination(data.place_id);
                }}
                query={{
                  key: 'AIzaSyCsdvOMtB6QvfVmAUxEYqRVPvtUr_szPy4',
                  language: 'fr',
                }}
              />
            </View>
            <View style={styles.gammeContent}>
              {typesToDisplay}
            </View>
          {!isCalendarVisible && <View style={styles.dateContent}>
                    <TouchableOpacity style={styles.dateButton} onPress={() => setIsCalendarVisible(true)}>
                      <Text style={styles.dateText}>{date}</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}>à</Text>
                    <TouchableOpacity style={styles.hourButton} onPress={() => handleGetDirections}>
                      <Text style={styles.hourText}>14 : 30</Text>
                    </TouchableOpacity>
           </View>}
           
            {isCalendarVisible &&  <Calendar
             // Customize the appearance of the calendar
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

                    const newDay = `${(day.day.toString().length)>1?day.day.toString():'0'+day.day.toString()}-${(day.month.toString().length)>1?day.month.toString():'0'+day.month.toString()}-${day.year.toString().slice(2,4)}`;
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
            {origin && destination && 
                  <View> 
                    <TouchableOpacity style={styles.resultButton} onPress={() => handleGetDirections}>
                      <Text style={styles.buttonText}>Calculer le montant de la course</Text>
                    </TouchableOpacity>
                    <Text style={styles.buttonText}>53 euros</Text>
                  </View>
                }
          </ScrollView>
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

  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 0, // Ajustez selon vos besoins
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#6aa1fc',

  },
  firstInputContainer: {
    height: 50,
    width:'100%',
    display:'flex',
    alignItems: 'center',
    marginTop: 30,
    zIndex: 2,
  },
  secondInputContainer: {
    height: 50,
    width:'100%',
    display:'flex',
    alignItems: 'center',
    marginTop: 20,
    zIndex: 1,
  },

  gammeContent :{
    width: '100%',
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  typeButton: {
    width: 100,
    height: 50,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6aa1fc',
  },
  typeText : {
    textAlign: 'center',
  },
  dateContent:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 30,
  },
  dateText:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6aa1fc',
    },
  text:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6aa1fc',
  },
  hourText:{
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6aa1fc',
  }
});

export default AddCourseScreen;