import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const NavBar = props => {
  const navigation = useNavigation();

  return (
    <Appbar.Header style={styles.navBarStyle}>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title={props.title} subtitle={props.subtitle} />
      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  navBarStyle: {backgroundColor: '#B40404'}
});

export default NavBar;
