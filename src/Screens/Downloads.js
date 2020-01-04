import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Appbar, Provider as PaperProvider} from 'react-native-paper';

export class Downloads extends Component {
  render() {
    return (
      <PaperProvider>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Downloads" />
        </Appbar.Header>

        <ScrollView />
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#B40404',
  },
  text: {
    marginLeft: 5,
    marginTop: 30,
    fontSize: 19,
    borderBottomWidth: 1,
    borderBottomColor: '#B40404',
  },
});

export default Downloads;
