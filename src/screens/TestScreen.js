// Importar los módulos necesarios
/*import { Spinner } from  "native-base";*/
import { Text, View } from "react-native";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import React, { useEffect, useState } from "react";

const { apiKey } = getEnvVars();

const TestScreen = () => {
  const [forecasts, setForecast] = useState(null);
  const [error, setError] = useState(false);

  const getForecast = async () => {
      // Consultar la API de WheatherAPI
      try {
        const response = await backend.get(`/forecast.json?key=${apiKey}&q=London`);
        console.log(response.data);
        setForecast(response.data);
      } catch (error) {
        setError(true);
      }
      
    
  }
  useEffect(() => {
    getForecast();
  }, []);
    
 
  return(
    <View style={{flex: 1, justifyContent: "center"}}>
      <Text>Aplicación del clima </Text>
    </View>
  );

};
 
  export default TestScreen;