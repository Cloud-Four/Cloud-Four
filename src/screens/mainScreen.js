import { Container, Header, Item, Input, Icon, Button  } from "native-base";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
//import { TouchableOpacity } from "react-native-gesture-handler";


const MainScreen = ( { navigation }) => {

    const [search, setSearch] = useState("");
    const [searchError, setSearchError] = useState(false);


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
    if (search) setSearchError(false);
  }, [search]);


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


export default MainScreen; 