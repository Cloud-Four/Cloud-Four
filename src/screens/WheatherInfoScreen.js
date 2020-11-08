import React, { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, View, view } from "react-native";
import { Content, Text, H1, Spinner, Card } from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";

const { apiUrl, apiKey } = getEnvVars();

const { width, height } = Dimensions.get("window");

const WheatherInfo = ({route, navigation}) => {
    // Obtener el nombre del lugar
    const { name } = route.params;
    const [cities, setCities] = useState(null);
    const [error, setError] = useState(false);

    const getWheaterInfo = async () => { 
        try {
          const response = await backend.get(`${apiUrl}forecast.json?key=${apiKey}&q=${name}&days=1&lang=es`);
          console.log(response.data);
          setCities(response.data);
        } catch(error) {
          setError(true);
        }
      };


      useEffect(() => {
        getWheaterInfo();
      }, []);
    
      if (!cities) {
        return (
          <Content>
            <Text>{name}1</Text>
            <Spinner color="blue"/>
          </Content>
        )
      }

      // Switch de fondo de pantalla
      switch (key) {
        case value:
          
          break;
      
        default:
          break;
      }
      return (
        <Content>
          <ImageBackground source ={require("../../assets/background/Cloudy.jpg")} style={{width: '100%', height: 605, flex:1}}>
            <H1>{cities.location.name}</H1>
            <View>
              <Text>Estado: {cities.current.condition.text}</Text>
              <Text>Temperatura: {cities.current.temp_c} C°</Text>
              <Text>Humedad: {cities.current.humidity} </Text>
              <Text>Viento: {cities.current.wind_kph} kph</Text>
              <Text>Sensación termica: {cities.current.feelslike_c} C°</Text>
              <Text>Temp Máxima: {cities.forecast.forecastday[0]['day']['maxtemp_c']} C° </Text>
              <Text>Temp Mínima: {cities.forecast.forecastday[0]['day']['mintemp_c']} C°</Text>
            </View>
          </ImageBackground>
        </Content>
      );

      
      
}

export default WheatherInfo;