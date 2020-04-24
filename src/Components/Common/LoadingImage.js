import React from 'react';
import {View, StyleSheet} from 'react-native';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress/Bar';

const LoadingImage = ({imageUrl}) => {
  return (
    <View style={styles.imgContainer}>
      {imageUrl === '/img/blank.png' ? (
        <Image
          style={{width: 240, height: 360}}
          resizeMode="cover"
          imageStyle={{width: 239, height: 360}}
          source={require('../../Assets/blank.png')}
        />
      ) : (
        <Image
          style={{width: 240, height: 360}}
          indicator={Progress.Pie}
          indicatorProps={{
            size: 40,
            borderWidth: 0,
            color: 'rgba(180, 4, 4, 1)',
            unfilledColor: 'rgba(0, 0, 0, 0.2)'
          }}
          resizeMode="cover"
          source={{uri: imageUrl}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: 243,
    height: 363,
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#B40404'
  }
});

export default LoadingImage;
