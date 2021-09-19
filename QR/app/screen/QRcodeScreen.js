//홈 화면에서 클릭시 나오는 QR코드 화면
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet,  Text, View, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function QRcodeScreen({navigation}) {
  const [count, setCount] = useState(60);
  const [timeout, setTimeout] = useState(true);
  const [did, setDid] = useState(" ");
  const [email, setEmail] = useState(" ");
  const savedCallback = useRef();
  
  useEffect(() => {
    AsyncStorage.getAllKeys( (err, keys) => {
      var key = keys[0]
        if(key){
            AsyncStorage.getItem(key, (err,result) =>{
                result=result.split(", ")
                setDid(result[0])
                setEmail(result[1])
            })
        }else if(key==null){
        }
    });
  },[]);

  //리셋버튼
  function reset() {
    setCount(60)
    setTimeout(true)
  }

  //남은시간이 0초일때
  useEffect(() => {
    if(count==0){
      setTimeout(false)
    }  
  },[count]);
  
  //0초전까지 1씩감소
  function callback() {
    if(count>0){
      setCount(count - 1);
    }
  }
  
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
  },[]);

  
    return (
          <View style={styles.container}>
            <View style={styles.main}>
              <View style={{flex:1,flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                <Text>남은시간</Text>
                <Text style={{color:"red", paddingLeft:5}}>{count}초</Text>
              </View>
              <View style={{flex:9, justifyContent:"center"}}>
                <QRCode 
                  value={timeout ? did+","+email: "시간초과"}
                  size={200}
                  logoBackgroundColor='#ffff'
                  />
              </View>
            </View>
            <View style={styles.mainBottom}>
              <TouchableOpacity style={{backgroundColor:"#021B79",borderColor:"#021B79",borderWidth:1, borderRadius:50, padding:10}} onPress={()=>reset()}>
                <Ionicons name={'refresh-outline'} size={30} color={"#ffff"}/>
              </TouchableOpacity>
            </View>
          </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
    justifyContent: 'center',
  },
  main:{
    flex:2,
    justifyContent: 'center',
    alignItems:"center",
  },
  mainBottom:{
    flex:2,
    justifyContent: "center",
    alignItems:"center"
  }
});