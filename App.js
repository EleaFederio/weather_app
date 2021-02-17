import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPeaker from './components/UnitsPeaker';

const WEATHER_API_KEY = 'fbf6ab81ab7d90a4c4726ae0515f30d5';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitsSystem] = useState('metric');

  useEffect(() => {
    load()
  }, [unitSystem])

  async function load(){
    setCurrentWeather(null);
    console.log('loading...')
    try {
      
      let { status} = await Location.requestPermissionsAsync();
      
      if(status !== 'granted'){
        setErrorMessage('Access location is needed')
        return 
      }

      const location = await Location.getCurrentPositionAsync();

      const {latitude, longitude} = location.coords;

      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`

      const response = await fetch(weatherUrl);
      // console.log(response);

      const result = await response.json();

      if(response.ok){
        setCurrentWeather(result)
      }else{
        setErrorMessage(result.message)
      } 

    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  console.log(currentWeather);

  if(currentWeather){
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <UnitsPeaker unitSystem={unitSystem} setUnitsSystem={setUnitsSystem} />
          <WeatherInfo currentWeather={currentWeather} /> 
          {/* <Text>{temp}</Text> */}
        </View>
      </View>
    );
  }else if(errorMessage){
    console.log(errorMessage);
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }else{
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  main:{
    justifyContent: 'center',
    flex: 1
  }
});
