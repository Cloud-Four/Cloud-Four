// Importar los módulos necesarios para la creación de la pantalla.
import { Container, Spinner, Card, CardItem, Body, H3, Header  } from "native-base";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet} from "react-native";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFonts } from "expo-font";

// Variables para el uso de la api.
const { apiUrl, apiKey } = getEnvVars();

// Obtener desde los parámetros de la navegación el término de búsqueda
const CitiesListResults = ({ route, navigation }) => {
  const [cities, setCities] = useState(null);
  const [setError] = useState(false);
  const { search } = route.params;

  // Obtener las fuentes que se utilizaran en la pantalla.
  let [fontsLoaded] = useFonts({
    'Goldman-Bold': require("../../assets/fonts/Goldman-Bold.ttf"),
    'Goldman-Regular': require("../../assets/fonts/Goldman-Regular.ttf"),
  });

  // Consultar la API de WheatherAPI
  const getCitiesList = async () => {
    try {
      const response = await backend.get(`${apiUrl}search.json?key=${apiKey}&q=${search}`);
      setCities(response.data);
    } catch (error) {
      setError(true);
    }
  }

  // Hook de efecto
  useEffect(() => {
    getCitiesList();
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

  // Creación de la pantalla y despliegue de los posibles resultados
  return(
    <Container>
      {/* Se muestra el resultado de la busqueda realizada por el usario.
          Los resultados se muestran en tarjetas independientes.
          Dentro de cada tarjeta se muestra una informacion general de la ciudad. */}
      <Header style={styles.titleContainer}><Text style={styles.Title}>Búsquedas encontradas:</Text>
      </Header>
      <FlatList style={styles.background}
        data={cities}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={<Text>¡No se han encontrado ciudades!</Text>}
        renderItem={({ item }) => {
          return (
            <View>
             <TouchableOpacity onPress={() => navigation.navigate("weatherInfo", {name: item.name})}>
                <Card>
                  <CardItem style={{backgroundColor: "#688EA6"}}>
                    <Body>
                      <H3 style={styles.lyric}>{item.name}</H3>     
                    </Body>
                  </CardItem>
                </Card>
                </TouchableOpacity>
          </View>
          )
        }}
      />
     
    </Container>
    
  );
};

// Estilos de nuestra pantalla
const styles = StyleSheet.create({
  // Estilo del contenedor del titulo de la pantalla
  titleContainer: {
    backgroundColor:"#021D40",
    alignItems:"center",
  },
  // Estilo del titulo de la pantalla
  Title: {
    color: "#F7F3EC",
    fontFamily: "Goldman-Bold",
    fontSize: 28,
    paddingTop: "1%",
  },
  // Color de fondo de la pantalla
  background: {
    backgroundColor: "#325A73",
    padding: "2%",
  },
  // Estilo del texto de las tarjetas
  lyric:{
    color: "#F7F3EC",
    fontFamily: "Goldman-Regular",
  }
});

 
export default CitiesListResults;