import React from 'react';
import {Provider as PaperProvider, Text, Portal, Dialog} from 'react-native-paper';

const DialogComponent = ({nav, title, content}) => {
  return (
    <PaperProvider>
      <Portal>
        <Dialog visible={true} onDismiss={() => nav.goBack()}>
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
