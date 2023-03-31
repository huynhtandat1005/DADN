import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Switch } from 'react-native-gesture-handler';

// START SCREEN
const Start = props => {
  const change = () => {
    props.navigation.navigate('Login');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={require('./assets/logo.png')} style = {{width: 250,height: 250}}/>
      <Text style = {styles.title}>LET MAKE YOUR HOME !</Text>
      <TouchableOpacity onPress={change}>
        <Text style = {styles.start_btn}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
};

// LOGIN SCREEN
const Login = props => {
  const login = () => {
  props.navigation.navigate('HomeScreen');
  };

  return (
    <KeyboardAvoidingView behavior = {Platform.OS === "ios" ? "padding" : "height"} style = {{flex: 1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style = {{fontSize: 24, fontWeight: 'bold', marginTop: -100}}>
        Welcome back !
      </Text>
      <Image 
        source={require('./assets/loginscreen.png')} 
        style = {{width: 400, height: 200, marginBottom: 50, marginTop: 100}}
      />
      {/* PHONE */}
      <TextInput style={styles.input} placeholder="Phone number"/>

      {/* PASSWORD */}
      <TextInput style={styles.input} placeholder="Password" secureTextEntry = {true}/>

      {/* LOGIN BUTTON */}
      <TouchableOpacity onPress={login}>
        <Text style = {styles.login_btn}>LOG IN</Text>
      </TouchableOpacity>
    </View>

    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};


// HOME SCREEN
const HomeScreen = props => {
  // GO TO CONTROL SCREEN
  const control = () => {
    props.navigation.navigate('Control');
  };
  // GO TO DATA SCREEN
  const data = () => {
    props.navigation.navigate('Data');
  };

  return (
    <View> 
      {/* HEADER */}
      <View style={styles.header}>
        <Text style = {{fontSize: 24,color: 'white',fontWeight:'bold'}}>
          Hello , USER 
        </Text>
      </View>
      
      <View>
      {/* CONTROL */}
      <TouchableOpacity style ={styles.button} onPress={control}>
        <Text style = {styles.button1}>
          <Icon name='adjust' size={15}/>
          {"   "}CONTROL
        </Text>
      </TouchableOpacity>
      {/* DATA */}
      <TouchableOpacity style ={styles.button} onPress={data}>
        <Text style={styles.button1}>
          <Icon name='database' size={15}/>
          {"   "}DATA
        </Text>
      </TouchableOpacity>
      {/* ENERGY USE*/}
      <TouchableOpacity style ={styles.button}>
        <Text style = {styles.button1}>
          <Icon name='battery-full'size={15}/>
          {"   "}ENERGY USE
        </Text>
      </TouchableOpacity>

      </View>
    </View>
  );
};

// CONTROL SCREEN
const Control = props => {
  const [fan, setFAN] = useState(false)
  const toggleFAN = (value) => {
    setFAN(value)
  }
  const [light, setLIGHT] = useState(false)
  const toggleLIGHT = (value) => {
    setLIGHT(value)
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style = {{fontSize: 24,color: 'white',fontWeight:'bold'}}>
          Control
        </Text>
      </View>
      <View>
        <View style ={styles.control}>
          <View style ={styles.button}>
            <Text style = {{fontSize: 20}}>
              <Icon name='fan' size={20}/>{"   "}SMART FAN
            </Text>
          <Text style={styles.on_off}>{fan ? 'ON':'OFF'}</Text>
          {/*BUTTON TO TURN ON/OFF FAN */}
          <Switch 
            style={{ marginTop: 50, marginLeft: 100}}
            onValueChange={toggleFAN}
            value={fan}/>
        </View>
      </View>

      <View style ={styles.control}>
        <View style ={styles.button}>
          <Text style = {{fontSize: 20}}>
            <Icon name='lightbulb' size={20}/>{"   "}SMART LIGHT
          </Text>
          <Text style={styles.on_off}>{light ? 'ON':'OFF'}</Text>
          {/*BUTTON TO TURN ON/OFF LIGHT */}
          <Switch
            style={{marginTop: 50, marginLeft: 100}}
            onValueChange={toggleLIGHT}
            value={light}/>
        </View>
      </View>
      </View>
    </View>
  );
};

// DATA SCREEN
const Data = props => {

  return (
    <View>
      <View style={styles.header}>
        <Text style = {{fontSize: 24,color: 'white',fontWeight:'bold'}}>
          DATA
        </Text>
      </View>
      <View>
      <View style ={styles.button}>
        <Text style = {styles.button1}>
          <Icon name='temperature-high'size={15}/>
          {"   "}TEMPERATURE{"\n\n"}
          <Text style={{fontWeight: 'bold'}}>
            32°C {/* TEMPERATURE */}
          </Text>
        </Text>
      </View>
      <View style ={styles.button}>
        <Text style={styles.button1}>
          <Icon name='water' size={15}/>
          {"   "}HUMIDITY{"\n\n"}
          <Text style={{fontWeight: 'bold'}}>
            80 % {/* HUMIDITY */}
          </Text>
        </Text>
      </View>
      </View>
    </View>
  );
};

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Control" component={Control} />
        <Stack.Screen name="Data" component={Data} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// CSS
const styles = StyleSheet.create({
  input: {
    margin: 10,
    height: 50,
    width: 220,
    borderColor: '#bcbcbc',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
  header: {
    width : 1000,
    height: 100,
    backgroundColor: '#3f6ff0',
    justifyContent: 'center',
    paddingLeft: 50,
    marginBottom: 80
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25
  },
  button1: {
    paddingVertical: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#eae2e2',
    borderRadius: 15,
    fontSize: 20,
    backgroundColor: '#eae2e2',
    overflow: 'hidden',
    width: 250,
    textAlign: "center",
  },
  control:{
    backgroundColor: '#eae2e2',
    marginBottom: 50,
    width: 250,
    left: 90,
    borderColor: '#eae2e2',
    borderWidth: 1,
    borderRadius: 15
  },
  on_off:{
    top: 80,
    left: 25,
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold'
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 100,
    marginTop: 150
  },
  start_btn:{
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: '#3f6ff0',
    borderRadius: 15,
    color: 'white',
    fontSize: 20,
    backgroundColor: '#3f6ff0',
    overflow: 'hidden'
  },
  login_btn:{
    marginBottom: -50,
    marginTop: 80,
    padding: 10,
    borderWidth: 1,
    borderColor: '#3f6ff0',
    borderRadius: 15,
    color: 'white',
    fontSize: 20,
    backgroundColor: '#3f6ff0',
    overflow: 'hidden',
    width: 150,
    textAlign: "center"
  }
});

export default App;