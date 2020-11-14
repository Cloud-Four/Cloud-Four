import { Container, Header, Item, Input, Icon, Button, H1, H2, Content, Spinner, Card, Text } from "native-base";
import { StyleSheet, Image, ScrollView, SafeAreaView, View } from "react-native";
import React, { useEffect, useState } from "react";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import Constants from "expo-constants";
//import { TouchableOpacity } from "react-native-gesture-handler";

const { apiUrl, apiKey } = getEnvVars();
const MainScreen = ( { navigation }) => {

    const [search, setSearch] = useState("");
    const [searchError, setSearchError] = useState(false);
    const [Tegucigalpa, setTegucigalpa] = useState(null);
    const [Intibuca, setIntibuca] = useState(null);
    const [Siguatepeque, setSiguatepeque] = useState(null);
    const [SanPedroSula, setSanPedroSula] = useState(null);
    const [Comayagua, setComayagua] = useState(null);
    const [ElParaiso, setElParaiso] = useState(null);
    const [error, setError] = useState(false);

    const getWeaterInfoTegucigalpa = async () => { 
        try {
          const t = await backend.get(`${apiUrl}forecast.json?key=${apiKey}&q=Tegucigalpa&days=1&lang=es`);
          setTegucigalpa(t.data);       
        } catch(error) {
          setError(true);
        }
      };
      const getWeatherInfoIntibuca = async () => { 
        try {
          const t = await backend.get(`${apiUrl}forecast.json?key=${apiKey}&q=Intibuca&days=1&lang=es`);
          setIntibuca(t.data);
        } catch(error) {
          setError(true);
        }
      };
      const getWeatherInfoSiguatepeque = async () => { 
        try {
          const t = await backend.get(`${apiUrl}forecast.json?key=${apiKey}&q=Siguatepeque&days=1&lang=es`);
          setSiguatepeque(t.data);  
        } catch(error) {
          setError(true);
        }
      };
      const getWeaterInfoSanPedroSula = async () => { 
        try {
          const t = await backend.get(`${apiUrl}forecast.json?key=${apiKey}&q=San Pedro Sula&days=1&lang=es`);
          setSanPedroSula(t.data);       
        } catch(error) {
          setError(true);
        }
      };
      const getWeatherInfoElParaiso = async () => { 
        try {
          const t = await backend.get(`${apiUrl}forecast.json?key=${apiKey}&q=El Paraiso&days=1&lang=es`);
          setElParaiso(t.data);
        } catch(error) {
          setError(true);
        }
      };
      const getWeatherInfoComayagua = async () => { 
        try {
          const t = await backend.get(`${apiUrl}forecast.json?key=${apiKey}&q=Comayagua&days=1&lang=es`);
          setComayagua(t.data);  
        } catch(error) {
          setError(true);
        }
      };

      // Verifica si el usuario ingresa información en el input de búsqueda
     const handlerSearch = () => {
      if (!search)
        setSearchError(true);
      else
      {
        navigation.navigate("citiesListResults", { search })
        setSearchError(false);
      }
    }
  
     // Remueve el valor de error del input de búsqueda si el usuario ingresa información  
      useEffect(() => {
        getWeaterInfoTegucigalpa();
        getWeatherInfoIntibuca();
        getWeatherInfoSiguatepeque();
        getWeaterInfoSanPedroSula();
        getWeatherInfoElParaiso();
        getWeatherInfoComayagua();
        if (search) setSearchError(false);
      }, [search]);
  
     
      
      if (!Tegucigalpa||!Intibuca||!Siguatepeque||!SanPedroSula||!ElParaiso||!Comayagua) {
        return (
          <Content>
            <Spinner color="red"/>
          </Content>
        )
      }


 
  // Variable que captura el link de la imagen
  let linkImageTegucigalpa = `http:${Tegucigalpa.current.condition.icon}`;
  let linkImageIntibuca = `http:${Intibuca.current.condition.icon}`;
  let linkImageSigua = `http:${Siguatepeque.current.condition.icon}`;
  let linkImageElParaiso = `http:${ElParaiso.current.condition.icon}`;
  let linkImageSPS = `http:${SanPedroSula.current.condition.icon}`;
  let linkImageComayagua = `http:${Comayagua.current.condition.icon}`;

    return(
        <Container>
          <Header searchBar>
        <Item>
          <Input placeholder="Buscar" value={search} onChangeText={setSearch} style={searchError ? styles.inputError : null} />
        <Button icon onPress={handlerSearch}>
          <Icon name="search" />
        </Button>
        </Item>
      </Header>
        <H1>Estado del tiempo</H1>
        <Content>    
          <Card style={styles.cardStyle}>
            <H2>{Tegucigalpa.location.name}</H2>
            <Text>Estado: {Tegucigalpa.current.condition.text}</Text>
            <Text>Temperatura: {Tegucigalpa.current.temp_c} C°</Text>
            <Text>Sensación termica: {Tegucigalpa.current.feelslike_c} C°</Text>
            <Image source={{uri: linkImageTegucigalpa}} style={{width: 64, height: 64}}/>
          </Card>
          <Card style={styles.cardStyle}>
            <H2>{Intibuca.location.name}</H2>
            <Text>Estado: {Intibuca.current.condition.text}</Text>
            <Text>Temperatura: {Intibuca.current.temp_c} C°</Text>
            <Text>Sensación termica: {Intibuca.current.feelslike_c} C°</Text>
            <Image source={{uri: linkImageIntibuca}} style={{width: 64, height: 64}}/>
          </Card >
          <Card style={styles.cardStyle}>    
          <H2>{Siguatepeque.location.name}</H2>
          <Text>Estado: {Siguatepeque.current.condition.text}</Text>
            <Text>Temperatura: {Siguatepeque.current.temp_c} C°</Text>
            <Text>Sensación termica: {Siguatepeque.current.feelslike_c} C°</Text>
            <Image source={{uri: linkImageSigua}} style={{width: 64, height: 64}}/>
            </Card >
          <Card style={styles.cardStyle}>          
  
          <H2>{SanPedroSula.location.name}</H2>
          <Text>Estado: {SanPedroSula.current.condition.text}</Text>
            <Text>Temperatura: {SanPedroSula.current.temp_c} C°</Text>
            <Text>Sensación termica: {SanPedroSula.current.feelslike_c} C°</Text>
            <Image source={{uri: linkImageSPS}} style={{width: 64, height: 64}}/>
                   
          </Card>
          <Card style={styles.cardStyle}>    
          <H2>{ElParaiso.location.name}</H2>
          <Text>Estado: {ElParaiso.current.condition.text}</Text>
            <Text>Temperatura: {ElParaiso.current.temp_c} C°</Text>
            <Text>Sensación termica: {ElParaiso.current.feelslike_c} C°</Text>
            <Image source={{uri: linkImageElParaiso}} style={{width: 64, height: 64}}/>
                 
          </Card>
          <Card style={styles.cardStyle}>    
          <H2>{Comayagua.location.name}</H2>
          <Text>Estado: {Comayagua.current.condition.text}</Text>
            <Text>Temperatura: {Comayagua.current.temp_c} C°</Text>
            <Text>Sensación termica: {Comayagua.current.feelslike_c} C°</Text>
            <Image source={{uri: linkImageComayagua}} style={{width: 64, height: 64}}/>
           
          </Card>  
          </Content>
          </Container>
    
    );
};
  // Estilos de nuestra pantalla
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
      marginHorizontal: 16,
   },
    input: {
      margin: 15,
    },
    searchInput: {
      flex: 1,
      flexDirection: "column",
      marginTop: 10,
      marginRight: 15,
    },
    cardStyle:{
      flex:1,
      flexDirection:"column",
      alignItems:"center",
      backgroundColor:"#5377A6",
      
    },
    letra:{
      color: "#F7F3EC"
    }
  });


export default MainScreen; 
