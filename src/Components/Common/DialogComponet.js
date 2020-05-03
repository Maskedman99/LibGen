import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Provider as PaperProvider, Text, Portal, Dialog} from 'react-native-paper';

const DialogComponent = ({title, content}) => {
  const navigation = useNavigation();

  return (
    <PaperProvider>
      <Portal>
        <Dialog visible={true} onDismiss={() => navigation.goBack()}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <Text>{content}</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
};

export default DialogComponent;
