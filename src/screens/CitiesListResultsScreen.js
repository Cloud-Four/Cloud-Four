// Importar los módulos necesarios
import { Container, Spinner, H1, Card, CardItem, Body, H3  } from "native-base";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";


const { apiUrl, apiKey } = getEnvVars();
const { width, height } = Dimensions.get("window");

const CitiesListResults = ({ route, navigation }) => {
  const [cities, setCities] = useState(null);
  const [error, setError] = useState(false);
  const { search } = route.params;

 

  const getCitiesList = async () => {
      // Consultar la API de WheatherAPI
      try {
        const response = await backend.get(`${apiUrl}search.json?key=${apiKey}&q=${search}`);
        setCities(response.data);
      } catch (error) {
        setError(true);
      }
  }

  // 
  useEffect(() => {
    getCitiesList();
  }, []);
    
  if (!cities) {
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <Spinner color="blue" />
      </View>
    )
  }

  
  return(
    <Container>
      <View><H1>Búsquedas encontradas:  </H1>
      </View>
      <FlatList
        data={cities}
        keyExtractor={(item) => item.name}
        ListEmptyComponent={<Text>¡No se han encontrado ciudades!</Text>}
        renderItem={({ item }) => {
          return (
            <View>
             <TouchableOpacity onPress={() => navigation.navigate("wheatherInfo", {name: item.name})}>
                <Card>
                  <CardItem>
                    <Body>
                      <H3>{item.name}</H3>     
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 15,
  },
  searchInput: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    marginRight: 15,
  }
});

 
export default CitiesListResults;