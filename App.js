import React, { useState, useEffect } from 'react';
import {
  Button,
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
import axios from 'axios';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Switch } from 'react-native-gesture-handler';

// const WebSocket = require('ws')
const socket = new WebSocket('ws://localhost:3000/ws');

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
  // GO TO OPEN DOOR SCREEN
  const door = () => {
    props.navigation.navigate('OpenDoor');
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
      {/* OPEN DOOR*/}
      <TouchableOpacity style ={styles.button} onPress={door}>
        <Text style = {styles.button1}>
          <Icon name='key'size={15}/>
          {"   "}OPEN DOOR
        </Text>
      </TouchableOpacity>

      </View>
    </View>
  );
};
const ID_USERNAME = 'huyn02';
const IO_KEY = 'aio_DDhg69zMJVLWup6x8AmCI8GhfFRb';
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
  const sendSignalLight1 = async (light1) => {
    try {
      let lightsignal = 0;
      if (light1 === true) {
        lightsignal = 1
      }
      else lightsignal = 0
      const response = await fetch(`https://io.adafruit.com/api/v2/${ID_USERNAME}/feeds/button1/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AIO-Key': IO_KEY
        },
        body: JSON.stringify({ value: lightsignal  })
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  const sendSignalFan = async (fan) => {
    try {
      let fansignal = 0;
      if (fan === true) {
        fansignal = 1
      }
      else fansignal = 0
      const response = await fetch(`https://io.adafruit.com/api/v2/${ID_USERNAME}/feeds/button3/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AIO-Key': IO_KEY
        },
        body: JSON.stringify({ value: fansignal  })
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
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
          {/* <Button title="Send Signal" onPress={sendSignalLight} /> */}
          <Switch 
            style={{ marginTop: 50, marginLeft: 100}}
            onValueChange={toggleFAN}
            value={fan}
            onGestureEvent={sendSignalFan(fan)}
            />
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
            value={light}
            onGestureEvent={sendSignalLight1(light)}/>
        </View>
      </View>
      </View>
    </View>
  );
};

// DATA SCREEN
const Data = props => {
  let TEMPERATURE = 32;
  let HUMIDITY = 80;
  const [temp, setTemp] = useState(0)
  const [light, setLight] = useState(0)
  const [humid, setHumid] = useState(0)
  useEffect(() => {

    
    socket.onmessage = (message) => {
      const data = JSON.parse(message.data)
      setTemp(data.temp)
      setHumid(data.humid)
      setLight(data.light)
      
    }
    // return () => intervalId; //This is important???
  }, [])
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
             { temp }°C
          </Text>
        </Text>
      </View>
      <View style ={styles.button}>
        <Text style={styles.button1}>
          <Icon name='lightbulb' size={15}/>
          {"   "}LIGHT{"\n\n"}
          <Text style={{fontWeight: 'bold'}}>
             { light }%
          </Text>
        </Text>
      </View>
      <View style ={styles.button}>
        <Text style={styles.button1}>
          <Icon name='water' size={15}/>
          {"   "}HUMIDITY{"\n\n"}
          <Text style={{fontWeight: 'bold'}}>
             { humid }%
          </Text>
        </Text>
      </View>
      </View>
    </View>
  );
};
//OPEN DOOR SCREEN
const OpenDoor = props => {
  // const openWebcam = () => {
    
  // };
  const sendSignalDoor = async () => {
    try {
      let doorsignal = "4";
      const response = await fetch(`https://io.adafruit.com/api/v2/${ID_USERNAME}/feeds/receive/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-AIO-Key': IO_KEY
        },
        body: JSON.stringify({ value: doorsignal  })
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View>
      <View style={styles.header}>
        <Text style = {{fontSize: 24,color: 'white',fontWeight:'bold'}}>
          OPEN DOOR
        </Text>
      </View>
      <TouchableOpacity style ={styles.button} onPress={sendSignalDoor}>
        <Text style = {styles.button1}>
          <Icon name='adjust' size={15}/>
          {"   "}CHECK BY FACE
        </Text>
      </TouchableOpacity>

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
        <Stack.Screen name="OpenDoor" component={OpenDoor} />
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