// Importar los módulos necesarios
import { Container, Spinner, H1, Card, CardItem, Body, H3, Header  } from "native-base";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFonts } from "expo-font";


const { apiUrl, apiKey } = getEnvVars();

const CitiesListResults = ({ route, navigation }) => {
  const [cities, setCities] = useState(null);
  const [setError] = useState(false);
  const { search } = route.params;

    // Obtener fuentes para la pantalla
    // https://www.youtube.com/watch?v=MTkhqml1KM4&t=340s
    let [fontsLoaded] = useFonts({
      'Goldman-Bold': require("../../assets/fonts/Goldman-Bold.ttf"),
      'Goldman-Regular': require("../../assets/fonts/Goldman-Regular.ttf"),
    });

  const getCitiesList = async () => {
      // Consultar la API de WheatherAPI
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
    
  if (!cities ||!fontsLoaded) {
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <Spinner color="blue" />
      </View>
    )
  }

  
  return(
    <Container>
      <Header style={styles.titleContainer}><Text style={styles.Title}>Búsquedas encontradas:</Text>
      </Header>
      <FlatList style={styles.background}
        data={cities}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={<Text>¡No se han encontrado ciudades!</Text>}
        renderItem={({ item }) => {
          return (
            <View>
             <TouchableOpacity onPress={() => navigation.navigate("wheatherInfo", {name: item.name})}>
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
  titleContainer: {
    backgroundColor:"#021D40",
    alignItems:"center",
  },
  Title: {
    color: "#F7F3EC",
    fontFamily: "Goldman-Bold",
    fontSize: 28,
    paddingTop: "1%",
  },
  background: {
    backgroundColor: "#325A73",
    padding: "2%",
  },
  lyric:{
    color: "#F7F3EC",
    fontFamily: "Goldman-Regular",
  }
});

 
export default CitiesListResults;