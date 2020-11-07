import React from "react";
import CitiesListResultsScreen from "./src/screens/CitiesListResultsScreen";
import mainScreen from "./src/screens/mainScreen";
import WheatherInfoScreen from "./src/screens/WheatherInfoScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Crear nuestra navegación basada en stack (pilas)
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="mainScreen">
        <Stack.Screen name="mainScreen" component={mainScreen} />
        <Stack.Screen name="citiesListResults" component={CitiesListResultsScreen} />
        <Stack.Screen name="wheatherInfo" component={WheatherInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


