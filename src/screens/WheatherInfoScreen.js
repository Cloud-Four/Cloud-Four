import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
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
      // Variable que captura el link de la imagen
      let linkImage = `http:${cities.current.condition.icon}`;

      // variable que captura el día puede ser 1 o 0
      // 1 es día, 0 es noche
      let day = cities.current.is_day;
            
      if(day === 1){
        // cambia el valor de 1 por día
        day = "Dia";
        
      }else{
        // cambia el valor de 0 a noche
        day = "Noche";
      }
      return (
        <Content>
          <H1>{cities.location.name}</H1>
          <Card cardBody>
            <Text>Estado: {cities.current.condition.text}</Text>
            <Text>Temperatura: {cities.current.temp_c} C°</Text>
            <Text>Humedad: {cities.current.humidity} </Text>
            <Text>Viento: {cities.current.wind_kph} kph</Text>
            <Text>Sensación termica: {cities.current.feelslike_c} C°</Text>
            <Text>Temp Máxima: {cities.forecast.forecastday[0]['day']['maxtemp_c']} C° </Text>
            <Text>Temp Mínima: {cities.forecast.forecastday[0]['day']['mintemp_c']} C°</Text>
            <Text>Día: {day}</Text>
            <Image source={{uri: linkImage}} style={{width: 64, height: 64}}/>
          </Card>
        </Content>
      );       
}
// Estilos de nuestra pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageURL: {
    flex: 1,
    width: 64,
    height: 64
  }
});

export default WheatherInfo;