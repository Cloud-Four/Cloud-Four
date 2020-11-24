// Importar los módulos necesarios para la creación de la pantalla.
import React, { useEffect, useState} from "react";
import { Dimensions, ImageBackground, View, StyleSheet, Image } from "react-native";
import { Content, Text, Spinner} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { useFonts } from "expo-font";

// Variables para el uso de la api.
const { apiUrl, apiKey } = getEnvVars();

// Variables para obtener el alto y el ancho de la pantalla del dispositivo.
const { width, height } = Dimensions.get("window");

const WheatherInfo = ({route}) => {

  // Obtener las fuentes que se utilizaran en la pantalla.
  let [fontsLoaded] = useFonts({
    'Goldman-Bold': require("../../assets/fonts/Goldman-Bold.ttf"),
    'Goldman-Regular': require("../../assets/fonts/Goldman-Regular.ttf"),
  });

  // Obtener el nombre del lugar seleccionado por el usuario.
  const { name } = route.params;
  const [cities, setCities] = useState(null);

  // Se obtienen los resultados de la consulta, dependiendo de la ciudad seleccionada.
  const getWheaterInfo = async () => { 
    try {
      const response = await backend.get(`${apiUrl}forecast.json?key=${apiKey}&q=${name}&days=1&lang=es`);
      setCities(response.data);
    } catch(error) {
      setError(true);
    }
  };

  // Hook de efecto
  useEffect(() => {
    getWheaterInfo();
  }, []);

  // En caso de no encontrar resultados o tardar en encontrarlos se carga 
  // la siguiente pantalla temporal.
  if (!cities ||!fontsLoaded) {
    return (
      <View style={{flex: 1, justifyContent: "center", backgroundColor:"#325A73"}}>
        <Spinner color="yellow"/>
      </View>
    )
  }

  // Variable que captura el link del icono de estado del tiempo
  let linkImage = `http:${cities.current.condition.icon}`;

  
  // Listados de fondos de pantalla dependiendo del clima
  const backgroundImage = {
    "1000-1": require("../../assets/background/1000-1.jpg"),
    "1000": require("../../assets/background/1000.jpg"),
    "1003-1": require("../../assets/background/1003-1.jpg"),
    "1003": require("../../assets/background/1003.jpg"),
    "1006-1": require("../../assets/background/1006-1.jpg"),
    "1006": require("../../assets/background/1006.jpg"),
    "1009": require("../../assets/background/1009.jpg"),
    "1030": require("../../assets/background/1030.jpg"),
    "1063": require("../../assets/background/1063.jpg"),
    "1066": require("../../assets/background/1066.jpg"),
    "1069": require("../../assets/background/1069.jpg"),
    "1072": require("../../assets/background/1072.jpg"),
    "1087": require("../../assets/background/1087.jpg"),
    "1114": require("../../assets/background/1114.jpg"),
    "1117": require("../../assets/background/1117.jpg"),
    "1135": require("../../assets/background/1135.jpg"),
    "1147": require("../../assets/background/1147.jpg"),
    "1150": require("../../assets/background/1150.jpg"),
    "1153": require("../../assets/background/1153.jpg"),
    "1168": require("../../assets/background/1168.jpg"),
    "1171": require("../../assets/background/1171.jpg"),
    "1180": require("../../assets/background/1180.jpg"),
    "1183": require("../../assets/background/1183.jpg"),
    "1186": require("../../assets/background/1186.jpg"),
    "1189": require("../../assets/background/1189.jpg"),
    "1192": require("../../assets/background/1192.jpg"),
    "1195": require("../../assets/background/1195.jpg"),
    "1198": require("../../assets/background/1198.jpg"),
    "1201": require("../../assets/background/1201.jpg"),
    "1204": require("../../assets/background/1204.jpg"),
    "1207": require("../../assets/background/1207.jpg"),
    "1210": require("../../assets/background/1210.jpg"),
    "1213": require("../../assets/background/1213.jpg"),
    "1216": require("../../assets/background/1216.jpg"),
    "1219": require("../../assets/background/1219.jpg"),
    "1222": require("../../assets/background/1222.jpg"),
    "1225": require("../../assets/background/1225.jpg"),
    "1237": require("../../assets/background/1237.jpg"),
    "1240": require("../../assets/background/1240.jpg"),
    "1243": require("../../assets/background/1243.jpg"),
    "1246": require("../../assets/background/1246.jpg"),
    "1249": require("../../assets/background/1249.jpg"),
    "1252": require("../../assets/background/1252.jpg"),
    "1255": require("../../assets/background/1255.jpg"),
    "1258": require("../../assets/background/1258.jpg"),
    "1261": require("../../assets/background/1261.jpg"),
    "1264": require("../../assets/background/1264.jpg"),
    "1273": require("../../assets/background/1273.jpg"),
    "1276": require("../../assets/background/1276.jpg"),
    "1279": require("../../assets/background/1279.jpg"),
    "1282": require("../../assets/background/1282.jpg"),
  }
  let code = cities.current.condition.code ;

  // variable que cambia el fondo de pantalla si es de noche, en algunas ocasiones
  let day = cities.current.is_day;
  if(day === 0){
    if(code === 1000)
    {
      code = "1000-1";
    }
    if(code === 1003)
    {
      code = "1003-1";
    }
    if(code === 1006)
    {
      code = "1006-1";
    }
  }
    

  // Creación de la pantalla
  return (
    // Contenedor donde se cargaran todos los componentes de la pantalla
    <Content style={{}}>
      {/* Se muestra un fondo de pantalla, dependiendo del estado climatico */}
      <ImageBackground source ={backgroundImage[code]} style={{ width: width, height: height}}>
        <Text style={styles.Title}>{cities.location.name}</Text>
        {/* Se muestra la información mas importante del clima */}
        <View style={styles.pricipalContainer}>
          <Image source={{uri: linkImage}} style={{width: 120, height: 120}}/>
          <Text style={{fontSize:30, color: "#F7F3EC",fontFamily: "Goldman-Regular"}}>{cities.current.temp_c}°c</Text>
          <Text style={{fontSize: 25,color: "#F7F3EC",fontFamily: "Goldman-Regular"}}>{cities.current.condition.text}</Text>
          <Text style={styles.principalData}>{cities.forecast.forecastday[0]['day']['mintemp_c']}°/
                                    {cities.forecast.forecastday[0]['day']['maxtemp_c']}° </Text>
          <Text style={styles.principalData}>Sensación térmica {cities.current.feelslike_c}°</Text>
          <Text style={styles.principalData}>{new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}</Text>
        </View>
        {/* Se muestra información general del clima de la ciudad */}
        <View style={styles.secundaryContainer}>
          <View>
            <Text style={styles.secundaryData}>Humedad:</Text>
            <Text style={styles.secundaryData}>Probabilidad{"\n"}de lluvia:</Text>
            <Text style={styles.secundaryData}>Precipitación:</Text>
            <Text style={styles.secundaryData}>Amanecer:</Text>
            <Text style={styles.secundaryData}>Atardecer:</Text>
            <Text style={styles.secundaryData}>Velocidad del{"\n"}viento:</Text>
          </View>
          <View>
            <Text style={styles.secundaryData}>{cities.current.humidity}%</Text>
            <Text style={styles.secundaryData}>{cities.forecast.forecastday[0]['day']['daily_chance_of_rain']}%{"\n"} </Text>
            <Text style={styles.secundaryData}>{cities.forecast.forecastday[0]['day']['totalprecip_mm']} mm</Text>
            <Text style={styles.secundaryData}>{cities.forecast.forecastday[0]['astro']['sunrise']}</Text>
            <Text style={styles.secundaryData}>{cities.forecast.forecastday[0]['astro']['sunset']}</Text>
            <Text style={styles.secundaryData}>{cities.current.wind_kph} kmh</Text>
          </View>
        </View>
      </ImageBackground>
    </Content>
  ); 
};

// Estilos de la pantalla
const styles = StyleSheet.create({
  // Estilo del titulo de la pantalla
  Title:{
    fontFamily: 'Goldman-Bold',
    alignSelf: "center",
    fontSize: 30,
    paddingTop: '5%',
    textAlign: "center",
    color: "#F7F3EC",
    textShadowColor: "#021D40",
    textShadowRadius: 20,
  },
  // Estilos del contenedor de la informacion general del clima de la ciudad
  pricipalContainer:{
    alignItems: "center",
    backgroundColor: "rgba(50,90,115,0.5)",
    borderRadius: 500,
  },
  // Estilo del contenedor con infomación adicional del clima de la ciudad
  secundaryContainer:{
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginTop: '5%',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '2%',
    backgroundColor: "rgba(50,90,115,0.5)",
  },
  // Estilo del texto del contenedor principal
  principalData:{
    color: "#F7F3EC",
    fontFamily: "Goldman-Regular",
    fontSize: 18,
  },
  // Estilo del texto del contenedor secundario
  secundaryData:{
    marginLeft: '10%',
    paddingTop: '2%',
    color: "#F7F3EC",
    fontFamily: "Goldman-Regular",
    fontSize: 18,
  },
});

export default WheatherInfo;
