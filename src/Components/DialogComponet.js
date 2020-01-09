import React from 'react';
import {
  Provider as PaperProvider,
  Text,
  Portal,
  Dialog,
} from 'react-native-paper';

class DialogComponent extends React.Component {
  render() {
    return (
      <PaperProvider>
        <Portal>
          <Dialog visible={true} onDismiss={() => this.props.nav.goBack()}>
            <Dialog.Title>File not Found</Dialog.Title>
            <Dialog.Content>
              <Text>Retype your search query!</Text>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </PaperProvider>
    );
  }
}

export default DialogComponent;
