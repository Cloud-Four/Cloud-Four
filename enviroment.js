import Constants from "expo-constants";

const ENV = {
    dev: {
        apiUrl: "https://api.weatherapi.com/v1/",
        apiKey: "142c000a0ec642a5a7620649200211"
       /* apiImageUrl: "https://image.tmdb.org/t/p/",
        apiImageSize: "w780"*/

    }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) =>{
    // What is __DEV__?
    // This variable is set to true when react-native is running in Dev mode
    // __DEV__ is true when run locally, but false when published.
    if(__DEV__){
        return ENV.dev;
    }
};

export default getEnvVars;

