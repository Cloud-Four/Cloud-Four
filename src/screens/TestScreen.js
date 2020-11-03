// Importar los módulos necesarios
import { Container, Header, Item, Input, Icon, Button, Spinner  } from "native-base";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, FlatList } from "react-native";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";


const { apiKey } = getEnvVars();
const { width, height } = Dimensions.get("window");

const TestScreen = () => {
  const [forecasts, setForecast] = useState(null);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const getForecast = async () => {
      // Consultar la API de WheatherAPI
      try {
        const response = await backend.get(`/current.json?key=${apiKey}&q=Tegucigalpa&lang=es`);
        console.log(response.data); 
        setForecast(response.data);
      } catch (error) {
        setError(true);
      }
  }

  // 
  useEffect(() => {
    getForecast();
  }, []);
    
  if (!forecasts) {
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
        <Spinner color="blue" />
      </View>
    )
  }

  
  return(
    <Container>
      <Header searchBar> 
        <Item>
          <Input placeholder="Buscar" value={search} onChangeText={setSearch}/> 
        <Button icon onPress={() => {navigation.navigate("movieSearch", {search})}}>
          <Icon name="search"/>
        </Button>  
        </Item>    
      </Header>
      
      <FlatList
        data={forecasts.las}
        keyExtractor={(item) => item.code}
        ListEmptyComponent={<Text>¡No se encontro ninguna ciudad :c !</Text>}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("Wheather ", {code: item.code})}>
                <Card>
                  <CardItem>
                    <Body>

                      <H3>Si funciona</H3>
                      
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
  movieImage: {
    width: width * 0.99,
    height: height * 0.5,
  },
  searchInput: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    marginRight: 15,
  },
  logoApp: {
    width: width,
    height: height * 0.15,
    resizeMode: "contain"
  }
});

 
export default TestScreen;