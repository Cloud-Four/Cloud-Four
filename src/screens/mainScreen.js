import {  Container, 
          Header, 
          Item, 
          Input, 
          Icon, 
          Button, 
          H2, 
          Content, 
          Spinner, 
          Card, 
          Text, 
          CardItem 
        } from "native-base";
import { StyleSheet, Image, View, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import backend from "../api/backend";
import getEnvVars from "../../enviroment";
import { useFonts } from "expo-font";
import { TouchableOpacity } from "react-native-gesture-handler";


const { apiUrl, apiKey } = getEnvVars();
const MainScreen = ( { navigation }) => {
    // Obtener fuentes para la pantalla
    let [fontsLoaded] = useFonts({
      'Goldman-Bold': require("../../assets/fonts/Goldman-Bold.ttf"),
      'Goldman-Regular': require("../../assets/fonts/Goldman-Regular.ttf"),
    });

    const [search, setSearch] = useState("");
    const [searchError, setSearchError] = useState(false);
    const [Tegucigalpa, setTegucigalpa] = useState(null);
    const [Intibuca, setIntibuca] = useState(null);
    const [Siguatepeque, setSiguatepeque] = useState(null);
    const [SanPedroSula, setSanPedroSula] = useState(null);
    const [Comayagua, setComayagua] = useState(null);
    const [ElParaiso, setElParaiso] = useState(null);
    const [error, setError] = useState(false);
 

      // Obtiene la información de la api correspondiente a Tegucigalpa
      const getWeaterInfoTegucigalpa = async () => { 
        try {
          const t = await backend.get(`${apiUrl}forecast.json?key=${apiKey}&q=Tegucigalpa&days=1&lang=es`);
          setTegucigalpa(t.data);       
        } catch(error) {
          setError(true);
        }
      };
      // Obtiene la información de la api correspondiente a Intibucá
      const getWeatherInfoIntibuca = async () => { 
        try {
          const t = await backend.get(`${apiUrl}forecast.json?key=${apiKey}&q=Intibuca&days=1&lang=es`);
          setIntibuca(t.data);
        } catch(error) {
          setError(true);
        }
      };
      // Obtiene la información de la api correspondiente a Siguatepeque
      const getWeatherInfoSiguatepeque = async () => { 
        try {
          const t = await backend.get(`${apiUrl}forecast.json?key=${apiKey}&q=Siguatepeque&days=1&lang=es`);
          setSiguatepeque(t.data);  
        } catch(error) {
          setError(true);
        }
      };
      // Obtiene la información de la api correspondiente a San Pedro Sula
      const getWeaterInfoSanPedroSula = async () => { 
        try {
          const t = await backend.get(`${apiUrl}forecast.json?key=${apiKey}&q=San Pedro Sula&days=1&lang=es`);
          setSanPedroSula(t.data);       
        } catch(error) {
          setError(true);
        }
      };
      // Obtiene la información de la api correspondiente a El Paraíso
      const getWeatherInfoElParaiso = async () => { 
        try {
          const t = await backend.get(`${apiUrl}forecast.json?key=${apiKey}&q=El Paraiso&days=1&lang=es`);
          setElParaiso(t.data);
        } catch(error) {
          setError(true);
        }
      };
      // Obtiene la información de la api correspondiente a Comayagua
      const getWeatherInfoComayagua = async () => { 
        try {
          const t = await backend.get(`${apiUrl}forecast.json?key=${apiKey}&q=Comayagua&days=1&lang=es`);
          setComayagua(t.data);  
        } catch(error) {
          setError(true);
        }
      };

      // Verifica si el usuario ingresa información en el input de búsqueda
    const handlerSearch = () =>{
      if (!search) {
        setSearchError(true)
      }else
      {
        navigation.navigate("citiesListResults", {search})
        // Borra la búsqueda anterior y coloca el espacio vacío
        setSearch("");
        setSearchError(false);
      }
    };


     // Remueve el valor de error del input de búsqueda si el usuario ingresa información
     // y llama a los hooks correspondientes para obtener la información.  
      useEffect(() => {
        getWeaterInfoTegucigalpa();
        getWeatherInfoIntibuca();
        getWeatherInfoSiguatepeque();
        getWeaterInfoSanPedroSula();
        getWeatherInfoElParaiso();
        getWeatherInfoComayagua();
        if (search) setSearchError(false);
      }, [search]);
  
     
     // Pantalla de espera, obteniendo la información de la api y de las fuentes. 
      if (!Tegucigalpa||!Intibuca||!Siguatepeque||!SanPedroSula||!ElParaiso||!Comayagua||!fontsLoaded){
        return (
          <View style={{flex: 1, justifyContent: "center", backgroundColor:"#325A73"}}>
            <Spinner color="yellow"/>
          </View>
        )
      }

      // Enum encargado de almacenar para después mostrar las imágenes de fondo
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

      // Variables que capturan el código de la condición del día
      let codeTegucigalpa = Tegucigalpa.current.condition.code ;
      let codeSanPedroSula= SanPedroSula.current.condition.code ;
      let codeIntibuca= Intibuca.current.condition.code ;
      let codeSiguatepeque= Siguatepeque.current.condition.code ;
      let codeElParaiso= ElParaiso.current.condition.code ;
      let codeComayagua= Comayagua.current.condition.code ;
    
      // variable que captura el día puede ser 1 o 0
      // 1 es día, 0 es noche
      let dayTegucigalpa = Tegucigalpa.current.is_day;
      let daySanPedroSula = SanPedroSula.current.is_day;
      let dayIntibuca = Intibuca.current.is_day;
      let daySiguatepeque = Siguatepeque.current.is_day;
      let dayElParaiso = ElParaiso.current.is_day;
      let dayComayagua = Comayagua.current.is_day;


      // Condiciones necesarias para mostrar backgrounds dinamicos,
      // es decir, que el fondo cambiará según el día que puede ser:
      // día o noche, de esa forma elegirá el fondo referente al estado
      // del día.
      if(dayTegucigalpa === 0){ 
        // El fondo de pantalla muestra una noche estrellada
        if(codeTegucigalpa === 1000)
        {
          codeTegucigalpa = "1000-1";
        }
        if(codeTegucigalpa === 1003)
        {
          codeTegucigalpa = "1003-1";
        }
        if(codeTegucigalpa === 1006)
        {
          codeTegucigalpa = "1006-1";
        }
      } 
      if(daySanPedroSula === 0){
        // El fondo de pantalla muestra una noche estrellada
        if(codeSanPedroSula === 1000)
        {
          codeSanPedroSula = "1000-1";
        }
        if(codeSanPedroSula === 1003)
        {
          codeSanPedroSula = "1003-1";
        }
        if(codeSanPedroSula === 1006)
        {
          codeSanPedroSula = "1006-1";
        }
      } 
      if(dayIntibuca === 0){
        // El fondo de pantalla muestra una noche estrellada
        if(codeIntibuca === 1000)
        {
          codeIntibuca = "1000-1";
        }
        if(codeIntibuca === 1003)
        {
          codeIntibuca = "1003-1";
        }
        if(codeIntibuca === 1006)
        {
          codeIntibuca = "1006-1";
        }
      } 
      if(daySiguatepeque === 0){
        // El fondo de pantalla muestra una noche estrellada
        if(codeSiguatepeque === 1000)
        {
          codeSiguatepeque = "1000-1";
        }
        if(codeSiguatepeque === 1003)
        {
          codeSiguatepeque = "1003-1";
        }
        if(codeSiguatepeque === 1006)
        {
          codeSiguatepeque = "1006-1";
        }
      } 
      if(dayElParaiso === 0){
        // El fondo de pantalla muestra una noche estrellada
        if(codeElParaiso === 1000)
        {
          codeElParaiso = "1000-1";
        }
        if(codeElParaiso === 1003)
        {
          codeElParaiso = "1003-1";
        }
        if(codeElParaiso === 1006)
        {
          codeElParaiso = "1006-1";
        }
      } 
      if(dayComayagua === 0){
        // El fondo de pantalla muestra una noche estrellada
        if(codeComayagua === 1000)
        {
          codeComayagua = "1000-1";
        }
        if(codeComayagua === 1003)
        {
          codeComayagua = "1003-1";
        }
        if(codeComayagua === 1006)
        {
          codeComayagua = "1006-1";
        }
      }
      
 
  // Variable que captura el link de la imagen
  let linkImageTegucigalpa = `http:${Tegucigalpa.current.condition.icon}`;
  let linkImageIntibuca = `http:${Intibuca.current.condition.icon}`;
  let linkImageSigua = `http:${Siguatepeque.current.condition.icon}`;
  let linkImageElParaiso = `http:${ElParaiso.current.condition.icon}`;
  let linkImageSPS = `http:${SanPedroSula.current.condition.icon}`;
  let linkImageComayagua = `http:${Comayagua.current.condition.icon}`;


    /* Se renderiza la pantalla principal mostrando un header que contiene una barra de búsqueda
      con su respectivo botón.
      Al hacer una búsqueda abre un
      Se muestra una pequeña lista de 6 lugares de honduras, nos muestra información en pequeña escala
      al tocar cada tarjeta accedemos a la información completa que se presenta en otra pantalla.
    */
    return(
        <Container>
          <Header searchBar style={styles.headerSearch}>
            <Item >
              <Input placeholder="Buscar" value={search} onChangeText={setSearch} style={searchError ? styles.inputError : null} />
                <Button icon onPress={handlerSearch} style={styles.button}>
                  <Icon name="search" style={{backgroundColor:"#021D40"}}/>
                </Button>
            </Item>
          </Header>
          {/* Contenedores que se encargan de tener tarjetas que muestran la información del estado del tiempo 
              de algunas zonas de Honduras.
              Tiene la función para poder navegar a otra pantalla donde muestra la información de forma completa.
              Solo se muestra un pequeño listado con fondo dínamico.

              Todas las tarjetas presentan la misma funcionalidad con la diferencia de la variable de llamado que
              puede ser:
              Tegucigalpa, Intibuca, SanPedroSula, ElParaiso, Comayagua, Siguatepeque.
          */}
          <Content style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("weatherInfo", {name: Tegucigalpa.location.name})}>    
              <Card style={styles.cardStyle}>
                <ImageBackground source ={backgroundImage[codeTegucigalpa]} style={styles.background}>
                  <View style={styles.viewConfiguration}>
                    <H2 style={styles.Title}>{Tegucigalpa.location.name}</H2>
                    <Image source={{uri: linkImageTegucigalpa}} style={styles.iconSize}/>
                  </View>
                  <CardItem style={styles.cardItem}>
                    <Text style={styles.letra}>Estado: {Tegucigalpa.current.condition.text}</Text>
                    <Text style={styles.letra}>Temperatura: {Tegucigalpa.current.temp_c} C°</Text>
                    <Text style={styles.letra}>Sensación termica: {Tegucigalpa.current.feelslike_c} C°</Text>                  
                  </CardItem>
                </ImageBackground>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("weatherInfo", {name: Intibuca.location.name})}>
              <Card style={styles.cardStyle}>
                <ImageBackground source ={backgroundImage[codeIntibuca]} style={styles.background}>
                  <View style={styles.viewConfiguration}>
                    <H2 style={styles.Title}>{Intibuca.location.name}</H2>
                    <Image source={{uri: linkImageIntibuca}} style={styles.iconSize}/>
                  </View>
                  <CardItem style={styles.cardItem}>
                    <Text style={styles.letra}>Estado: {Intibuca.current.condition.text}</Text>
                    <Text style={styles.letra}>Temperatura: {Intibuca.current.temp_c} C°</Text>
                    <Text style={styles.letra}>Sensación termica: {Intibuca.current.feelslike_c} C°</Text>
                  </CardItem>
                </ImageBackground>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("weatherInfo", {name: Siguatepeque.location.name})}>
              <Card style={styles.cardStyle}>
                <ImageBackground source ={backgroundImage[codeSiguatepeque]} style={styles.background}>
                  <View style={styles.viewConfiguration}>
                    <H2 style={styles.Title}>{Siguatepeque.location.name}</H2>
                    <Image source={{uri: linkImageSigua}} style={styles.iconSize}/>
                  </View>
                  <CardItem style={styles.cardItem}>
                    <Text style={styles.letra}>Estado: {Siguatepeque.current.condition.text}</Text>
                    <Text style={styles.letra}>Temperatura: {Siguatepeque.current.temp_c} C°</Text>
                    <Text style={styles.letra}>Sensación termica: {Siguatepeque.current.feelslike_c} C°</Text>                
                  </CardItem>
                </ImageBackground>    
              </Card >
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("weatherInfo", {name: SanPedroSula.location.name})}>
              <Card style={styles.cardStyle}>
                <ImageBackground source ={backgroundImage[codeSanPedroSula]} style={styles.background}>          
                  <View style={styles.viewConfiguration}>
                    <H2 style={styles.Title}>{SanPedroSula.location.name}</H2>
                    <Image source={{uri: linkImageSPS}} style={styles.iconSize}/>
                  </View>
                  <CardItem style={styles.cardItem}>
                    <Text style={styles.letra}>Estado: {SanPedroSula.current.condition.text}</Text>
                    <Text style={styles.letra}>Temperatura: {SanPedroSula.current.temp_c} C°</Text>
                    <Text style={styles.letra}>Sensación termica: {SanPedroSula.current.feelslike_c} C°</Text>                 
                  </CardItem>
                </ImageBackground>                   
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("weatherInfo", {name: ElParaiso.location.name})}>
              <Card style={styles.cardStyle}>
                <ImageBackground source ={backgroundImage[codeElParaiso]} style={styles.background}>
                  <View style={styles.viewConfiguration}>
                    <H2 style={styles.Title}>{ElParaiso.location.name}</H2>
                    <Image source={{uri: linkImageElParaiso}} style={styles.iconSize}/>
                  </View>
                  <CardItem style={styles.cardItem}>
                    <Text style={styles.letra}>Estado: {ElParaiso.current.condition.text}</Text>
                    <Text style={styles.letra}>Temperatura: {ElParaiso.current.temp_c} C°</Text>
                    <Text style={styles.letra}>Sensación termica: {ElParaiso.current.feelslike_c} C°</Text>                  
                  </CardItem>
                </ImageBackground> 
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("weatherInfo", {name: Comayagua.location.name})}>
              <Card style={styles.cardStyle}>
                <ImageBackground source ={backgroundImage[codeComayagua]} style={styles.background}>
                  <View style={styles.viewConfiguration}>
                    <H2 style={styles.Title}>{Comayagua.location.name}</H2>
                    <Image source={{uri: linkImageComayagua}} style={styles.iconSize}/>
                  </View> 
                  <CardItem style={styles.cardItem}>
                    <Text style={styles.letra}>Estado: {Comayagua.current.condition.text}</Text>
                    <Text style={styles.letra}>Temperatura: {Comayagua.current.temp_c} C°</Text>
                    <Text style={styles.letra}>Sensación termica: {Comayagua.current.feelslike_c} C°</Text>                 
                  </CardItem>
                </ImageBackground>
              </Card>
            </TouchableOpacity>  
          </Content>
        </Container>
    
      );
};
  // Estilos que afectan a las distintas distribuciones de las etiquetas utilizadas en pantalla
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:10,
      marginBottom:10,
      backgroundColor:"#325A73",
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
      marginRight:15,
      marginLeft:15,
      marginBottom:15,
    },
    letra:{
      fontSize:22, 
      color: "#F7F3EC",
      fontFamily: "Goldman-Regular",
      alignSelf:"baseline",
    },
    cardItem:{
      flex:1,
      flexDirection:"column",
      backgroundColor: "rgba(50,90,115,0.5)",
      margin:'2%',
    },
    iconSize:{
      width: 64, 
      height: 64,
    },
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
    viewConfiguration:{
      flex:1,
      flexDirection:"row",
      alignSelf:"center",
      backgroundColor: "rgba(50,90,115,0.5)",
      borderRadius: 500,
      marginTop:'2%',
    },
    headerSearch:{
      backgroundColor:"#021D40",     
      marginTop:'2%',
      marginBottom:'2%',
      marginLeft:'2%',
      marginRight:'0.5%'
    },
    button:{
      backgroundColor:"#021D40",
      alignSelf:"auto"
    },
    background:{
      width: '100%', 
      height: '100%', 
      flex:1,
    }
  });


export default MainScreen; 
