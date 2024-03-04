import React, { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Polylinen ,Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { WebView } from 'react-native-webview';


const AddCourseScreen = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [count, setCount] = useState ('');
  const [distance, setDistance] = useState ('');
  const [types, setTypes] = useState ([{name:'Green', isSelected : false}, {name:'Luxe', isSelected : false}, {name:'Vans', isSelected : false}]);


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
console.log('types :', types);

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
    return  <TouchableOpacity style={styles.button} onPress={() => handleSelectType(e.name, e.isSelected)}>
              <Text style={styles.buttonText}>{e.name}</Text>
            </TouchableOpacity>
  })
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>VTC Tracker</Text>
        <View style={styles.firstInputContainer}>
          <GooglePlacesAutocomplete
            minLength={3}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                backgroundColor: 'white',
                width:330,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'red',
              },
              textInput: {
                color: '#5d5d5d',
                fontSize: 16,
                width: 330,
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
              listView: {
                position: 'absolute',
                top: 50, 
                width:'100%',
                maxHeight:150, 
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
                backgroundColor: 'white',
                width:330,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'red',
              },
              textInput: {
                color: '#5d5d5d',
                fontSize: 16,
                width: 330,
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
              },
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
              listView: {
                position: 'absolute',
                top: 50,
                width:'100%',
                maxHeight: 150,
                
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
       
            
        {origin && destination && 
               <View> 
                <TouchableOpacity style={styles.resultButton} onPress={() => handleGetDirections}>
                  <Text style={styles.buttonText}>Calculer le montant de la course</Text>
                </TouchableOpacity>
                <Text style={styles.buttonText}>53 euros</Text>
              </View>
            }
       
      
       
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding : 10,
    backgroundColor: '#071427',
    marginTop: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 50,
    color: '#fec101',
    borderWidth: 1,
    borderColor: 'green',
  },
  firstInputContainer: {
    height: 50,
    width:'100%',
    display:'flex',
    marginTop: 40,
    borderWidth: 1,
    borderColor: 'red',
    zIndex: 2,
  },
  secondInputContainer: {
    height: 50,
    width:'100%',
    display:'flex',
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'red',
    zIndex: 1,
  },

  gammeContent :{
    width: '100%',
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'blue',
    marginTop: 40,
  },
  button: {
    width: 80,
    height: 50,
    borderWidth: 1,
    borderColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fec101',
  },
  mapContent :{
      height: 250,
      width: 330,
      marginTop: 20,
  },
  resultButton: {
    width: '50%',
    height: 50,
    borderWidth: 1,
    borderColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText : {
    textAlign: 'center',
  }
});

export default AddCourseScreen;