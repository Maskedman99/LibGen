import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Text,
  Appbar,
  TouchableRipple,
  Provider as PaperProvider,
  Portal,
  Modal,
  Dialog
} from 'react-native-paper';
import txt from '../Assets/aboutInfos.json';

const Credits = ({navigation}) => {
  const [visibleTC, setVisibleTC] = useState(false);
  const [visibleCredits, setVisibleCredits] = useState(false);
  const [visibleDialog, setVisibleDialog] = useState(false);

  const _showTC = () => setVisibleTC(true);
  const _hideTC = () => setVisibleTC(false);
  const _showCredits = () => setVisibleCredits(true);
  const _hideCredits = () => setVisibleCredits(false);
  const _showDialog = () => setVisibleDialog(true);
  const _hideDialog = () => setVisibleDialog(false);

  return (
    <PaperProvider>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="About" />
      </Appbar.Header>

      <TouchableRipple onPress={_showCredits} rippleColor="#B40404">
        <Text style={styles.text}>Credits</Text>
      </TouchableRipple>
      <TouchableRipple onPress={_showDialog} rippleColor="#B40404">
        <Text style={styles.text}>App Version</Text>
      </TouchableRipple>
      <TouchableRipple onPress={_showTC} rippleColor="#B40404">
        <Text style={styles.text}>Terms and Conditions</Text>
      </TouchableRipple>

      <Portal>
        <Modal visible={visibleTC} onDismiss={_hideTC} contentContainerStyle={styles.modal}>
          <ScrollView>
            <View style={styles.modalview}>
              <Text style={styles.modalheading}>Terms and Conditions{'\n'}</Text>
              <Text style={styles.modaltext}>
                {txt.TC}
                {'\n\n'}
              </Text>
            </View>
          </ScrollView>
        </Modal>
      </Portal>

      <Portal>
        <Modal
          visible={visibleCredits}
          onDismiss={_hideCredits}
          contentContainerStyle={styles.modal}>
          <ScrollView>
            <View style={styles.modalview}>
              <Text style={styles.modalheading}>Credits{'\n'}</Text>
            </View>
            <Text style={styles.modaltext}>
              {txt.Credits}
              {'\n\n'}
            </Text>
          </ScrollView>
        </Modal>
      </Portal>

      <Portal>
        <Dialog visible={visibleDialog} onDismiss={_hideDialog}>
          <Dialog.Title>App Version</Dialog.Title>
          <Dialog.Content>
            <Text>{txt.Version}</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 5,
    marginTop: 30,
    fontSize: 19,
    borderBottomWidth: 1,
    borderBottomColor: '#B40404'
  },
  header: {backgroundColor: '#B40404'},
  modal: {justifyContent: 'center', alignItems: 'center', margin: 5},
  modaltext: {color: 'lime', fontWeight: 'bold', fontSize: 15},
  modalheading: {color: '#00FFE4', fontSize: 17, fontWeight: 'bold'},
  modalview: {justifyContent: 'center', alignItems: 'center'}
});

export default Credits;
