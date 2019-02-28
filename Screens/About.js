import React, { Component } from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import { Text, Appbar, TouchableRipple, Provider as PaperProvider, Portal, Modal, Dialog} from 'react-native-paper';
import txt from '../Assets/aboutInfos.json'        

export class Credits extends Component {

  state = {
    visible: false,
    visibleTC: false,
    visibleCredits: false,
    visibleDialog: false,
  }
  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.setState({ visible: false });
  _showTC = () => this.setState({visibleTC: true });
  _hideTC = () => this.setState({visibleTC: false});
  _showCredits = () => this.setState({visibleCredits: true});
  _hideCredits = () => this.setState({visibleCredits: false});
  _showDialog = () => this.setState({ visibleDialog: true });
  _hideDialog = () => this.setState({ visibleDialog: false });

  render() {

    return (
      <PaperProvider>

        <Appbar.Header style={{backgroundColor: "#B40404"}}>
        <Appbar.BackAction  onPress = {() => this.props.navigation.goBack()}/>
        <Appbar.Content title="About"/>
        </Appbar.Header>
    
        <TouchableRipple onPress={this._showModal} rippleColor="#B40404">
            <Text style = {styles.text}>Letter of Solidarity</Text>
        </TouchableRipple>   
        <TouchableRipple onPress={this._showDialog} rippleColor="#B40404">
            <Text style = {styles.text}>App Version</Text>
        </TouchableRipple>
        <TouchableRipple onPress={this._showTC} rippleColor="#B40404">
            <Text style = {styles.text}>Terms and Conditions</Text>
        </TouchableRipple>
        <TouchableRipple onPress={this._showCredits} rippleColor="#B40404">
            <Text style = {styles.text}>Credits</Text>
        </TouchableRipple>
       
        <Portal>
          <Modal visible={this.state.visible} onDismiss={this._hideModal} contentContainerStyle={styles.modal}>
          <ScrollView>
            <Text style={{color: '#00FFE4', fontSize:16, fontWeight: "bold"}}>  In solidarity with Library Genesis and Sci-Hub</Text>      
            <Text style={{color: '#00FFE4', fontWeight: 'bold',}}>{'\t'}(as provided in the website){'\n'}</Text>
            <Text style={{color:'lime', fontWeight:'bold'}}>{txt.Solidarity}{'\n\n'}</Text> 
          </ScrollView>  
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={this.state.visibleTC} onDismiss={this._hideTC} contentContainerStyle={styles.modal}>
          <ScrollView>
            <View style={{justifyContent: "center", alignItems: 'center'}}>
            <Text style={{color: '#00FFE4', fontSize:17, fontWeight: "bold"}}>Terms and Conditions{'\n'}</Text>      
            <Text style={{color:'lime', fontWeight:'bold'}}>{txt.TC}{'\n\n'}</Text>
            </View>
          </ScrollView>  
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={this.state.visibleCredits} onDismiss={this._hideCredits} contentContainerStyle={{margin:5, flex:1}}>
          <ScrollView>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#00FFE4', fontSize:18, fontWeight: "bold",}}>Credits{'\n'}</Text>      
            </View>
            <Text style={{color:'lime', fontWeight:'bold', marginLeft: 5, fontSize: 15}}>{txt.Credits}{'\n\n'}</Text>
          </ScrollView>  
          </Modal>
        </Portal>

        <Portal>
          <Dialog visible={this.state.visibleDialog}  onDismiss={this._hideDialog}>
            <Dialog.Title>App Version</Dialog.Title>
            <Dialog.Content>
              <Text>{txt.Version}</Text>
            </Dialog.Content>
          </Dialog>
        </Portal>

    </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
    text:
    {
        marginLeft: 5,
        marginTop: 30,
        fontSize: 19,
        borderBottomWidth: 1,
        borderBottomColor: "#B40404"
    },
    modal:{
        justifyContent:'center',
        alignItems: 'center',
        margin: 5,
    }
})


export default Credits;