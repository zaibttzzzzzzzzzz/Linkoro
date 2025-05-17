// screens/LoginScreen.js
import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');

  const handleSendOTP = async () => {
    Alert.alert('OTP Sent!', 'Check your email (use 123456 for testing)');
  };

  const handleVerifyOTP = async () => {
    if (otp === '123456') {
      try {
        await signInWithEmailAndPassword(auth, email, 'dummyPassword');
        navigation.navigate('Chat');
      } catch (error) {
        Alert.alert('Error', 'Login failed!');
      }
    } else {
      Alert.alert('Invalid OTP', 'Please enter correct OTP!');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
      />
      <Button title="Send OTP" onPress={handleSendOTP} />
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOTP}
        style={{ marginTop: 10, padding: 10, borderWidth: 1 }}
      />
      <Button title="Verify OTP" onPress={handleVerifyOTP} />
    </View>
  );
};

export default LoginScreen;
