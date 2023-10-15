import { StyleSheet, Text, Dimensions, Button, TextInput, View, TouchableOpacity, Image, LayoutAnimation, ActivityIndicator} from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otpBanner, setOtpBanner] = useState(false);
  const [wrongOtp, setWrongOtp] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const uname = 'User';
  const password = "password";
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([null, null, null, null]);


  const handleInputChange = (text, index) => {
    if (/^\d*$/.test(text) && text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text.length === 1 && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  handleRegister = async () => {
    setShowLoader(true);
    try {
      const userData = {
        name: uname,
        email: email,
        password: password,
      };
      console.log(userData);
      const response = await axios.post('http://192.168.1.6:6969/api/v1/user/signup/', userData);

      if (response.status === 200) {
        console.log('Registration Successful');
        console.log('Response Data:', response.data);
        
        setOtpBanner(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        
        setTimeout(() => {
          hideOtpBanner();
        }, 5000);

        setShowOTP(true);
      } else {
        console.log('Registration Failed');
      }
    } catch (error) {
      console.error('Registration Error', error);
    } finally {
      setShowLoader(false); 
    }
  }

  const hideOtpBanner = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOtpBanner(false);
  };

  const hideWrongBanner = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setWrongOtp(false);
  }

  handleVerify = async () => {
    try{
        const newotp = otp.join('');
        console.log({email,newotp});
        const verificationDeets = {
            email: email,
            otp: newotp
        }
        const response = await axios.post('http://192.168.1.6:6969/api/v1/email_verification/verify/', verificationDeets);
        if(response.status === 200){
            console.log("User verified");
            navigation.navigate('welcome', {email:email, name: uname});
        }
        else{
            console.log("Error")
        }
    }catch(error){
        console.error('Verification Error', error);
        setWrongOtp(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setTimeout(() => {
          hideWrongBanner();
        }, 5000);
    } 
  }

  return (
    <View style={styles.container}>
      {otpBanner && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>OTP sent!</Text>
        </View>
      )}

      {wrongOtp && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Incorrect OTP</Text>
        </View>
      )}

      <Image style={styles.image} source={require("./../../assets/logo.png")} />

      <View style={styles.emailContainer}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {showLoader ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#0782F9" />
          </View>
        ) : (
          <TouchableOpacity style={styles.buttonOTP} onPress={handleRegister}>
            <Text style={styles.buttonOTPText}>Send OTP</Text>
          </TouchableOpacity>
        )}
      </View>

      {showOTP && (<View style={{ flexDirection: 'row' }}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            style={styles.otpInput}
            value={value}
            onChangeText={(text) => handleInputChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>)}

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>By clicking register you accpet to the Terms and Conditions, Privacy Policy of the platform</Text>
    </View>
  )
}

const { width, height } = Dimensions.get('window');

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0782F9',
  },

  input: {
    fontSize: 11,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    width: '80%',
    marginBottom: 16,
    backgroundColor: '#FAF9F6'	
  },

  button: {
    marginTop: 5,
    width: '40%',
    backgroundColor: '#FAF9F6',
    borderRadius: 5,
    alignItems: 'center',
    padding: 8,
  },

  buttonText: {
    color: '#0782F9',
    fontSize: 13,
    fontWeight: '600'
  },

  image: {
    width:width*0.5,
    height:height*0.1,
    marginBottom: 90,
  },

  emailContainer: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },

  buttonOTP: {
    position: 'absolute',
    right: 10,
    top: 14
  },

  buttonOTPText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0782F9',
  },

  otpInput: {
    // color: '#0782F9',
    width: 50,
    height: 50,
    borderWidth: 1,
    textAlign: 'center',
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    marginRight: 5,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    textAlign: 'center',
    fontSize: 10,
    margin: 5,
    color: '#ccc'
  },

  banner: {
    backgroundColor: '#FAF9F6', 
    width: '50%',
    borderRadius: 5,
    padding: 5,
    position: 'absolute',
    top: 35,
    alignItems: 'center'
  },

  bannerText: {
    color: '#0782F9',
  },

  loaderContainer: {
    position: 'absolute',
    right: 10,
    top: 13,
  },
})