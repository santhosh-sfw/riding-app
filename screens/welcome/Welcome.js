import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Card, Title, Paragraph } from 'react-native-paper';

const Welcome = ({route}) => {
  // const {name} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome user,</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Title>About the App</Title>
          <Paragraph>
            App Description
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#0782F9',
  },

  card: {
    width: '80%',
    height: '35%',
    margin: 10
  },

  header: {
    position: 'absolute',
    top: 25,
    left: 40,
    fontSize: 16,
    fontWeight: '600',
    color: '#FAF9F6'
  }
});

export default Welcome;