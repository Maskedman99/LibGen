import React, {useState} from 'react';
import {StyleSheet, Share} from 'react-native';
import {FAB, Portal} from 'react-native-paper';

const HomeFab = ({nav}) => {
  const [open, setOpen] = useState(false);
  return (
    <Portal>
      <FAB.Group
        open={open}
        icon={open ? 'unfold-less-horizontal' : 'unfold-more-horizontal'}
        fabStyle={styles.fabstyle}
        style={styles.fab}
        actions={[
          {
            icon: 'share-variant',
            label: 'Share',
            color: '#B40404',
            onPress: () => {
              Share.share(
                {
                  message: 'http://gen.lib.rus.ec/  ',
                  url: 'http://gen.lib.rus.ec/', //Only IOS
                  title: 'Hey there, checkout this app!'
                },
                {
                  // Android only:
                  dialogTitle: 'Share LibGen, spread the knowledge!',
                  // iOS only:
                  excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter']
                }
              );
            }
          },
          {
            icon: 'information-variant',
            label: 'About',
            color: '#B40404',
            onPress: () => nav.navigate('AboutScreen')
          },
          {
            icon: 'settings',
            label: 'Settings',
            color: '#B40404',
            onPress: () => nav.navigate('SettingScreen')
          },
          {
            icon: 'file-download',
            label: 'Downloads',
            color: '#B40404',
            onPress: () => nav.navigate('DownloadsScreen')
          }
        ]}
        onStateChange={() => setOpen(!open)}
      />
    </Portal>
  );
};

export const styles = StyleSheet.create({
  fab: {paddingBottom: 10, paddingRight: 10},
  fabstyle: {backgroundColor: '#B40404'}
});

export default HomeFab;
