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
        <Stack.Screen name="mainScreen" component={mainScreen} options={{headerShown:false}}/>
        <Stack.Screen name="citiesListResults" component={CitiesListResultsScreen} options={{headerShown:false}}/>
        <Stack.Screen name="wheatherInfo" component={WheatherInfoScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}


