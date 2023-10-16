import { StyleSheet, Text, TextInput, Dimensions, Image, TouchableOpacity, Button, View } from 'react-native'
import React, {useState} from 'react'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const VerifyOTP = ({route}) => {
    const navigation = useNavigation();
    const {email,name} = route.params;
    const [otp, setOTP] = useState('');

    handleVerify = async () => {
        try{
            console.log({email,otp});
            const verificationDeets = {
                email: email,
                otp: otp
            }
            const response = await axios.post('http://192.168.1.6:6969/api/v1/email_verification/verify/', verificationDeets);
            if(response.status === 200){
                console.log("User verified");
                navigation.navigate('welcome', {email:email, name: name});
            }
            else{
                console.log("Error")
            }
        }catch(error){
            console.error('Verification Error', error);
        }
    }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./../../assets/logo.png")} />
      <Text style={styles.label}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.otpInput}
          keyboardType="numeric"
          value={otp}
          onChangeText={(text) => setOTP(text)}
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width, height } = Dimensions.get('window');
export default VerifyOTP


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0782F9',
    },
    label: {
      color: '#FAF9F6',
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 15,
    },
    otpContainer :{
      width: '100%',
      alignItems: 'center'
    },
    otpInput: {
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 8,
      width: '40%',
      marginBottom: 16,
      backgroundColor: '#FAF9F6'	
    },
    button: {
      marginTop: 5,
      width: '20%',
      backgroundColor: '#FAF9F6',
      borderRadius: 5,
      alignItems: 'center',
      padding: 10,
    },
    buttonText: {
      color: '#0782F9',
      fontSize: 16,
      fontWeight: '600'
    },
    image: {
      width:width*0.5,
      height:height*0.1,
      marginBottom: 90,
    }
});
