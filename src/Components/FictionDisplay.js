import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

class FictionDisplay extends React.Component {
  render() {
    return (
      <View>
        <Text>
          <Text style={styles.textstyle}>Title:{'\t\t\t\t\t\t\t\t'}</Text>
          {this.props.T.replace(/"/g, '')}
          {'\n'}
          <Text style={styles.textstyle}>Series:{'\t\t\t\t\t\t'}</Text>
          {this.props.S.replace(/"/g, '')}
          {'\n'}
          <Text style={styles.textstyle}>Author:{'\t\t\t\t\t'}</Text>
          {this.props.A.replace(/"/g, '')}
          {'\n'}
          <Text style={styles.textstyle}>File:{'\t\t\t\t\t\t\t\t'}</Text>
          {this.props.F.replace(/"/g, '')}
          {'\n'}
          <Text style={styles.textstyle}>Language:{'\t\t'}</Text>
          {this.props.L.replace(/"/g, '')}
        </Text>
        <View style={styles.countstyle}>
          <Text style={styles.textstyle}>{this.props.no}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textstyle: {
    fontWeight: 'bold',
  },
  countstyle: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
});

export default FictionDisplay;
