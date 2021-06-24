import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Image
} from "react-native";
import MyHeader from '../components/Myheader'
import { DrawerItems } from "react-navigation-drawer";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import db from "../config";
import axios from "axios";
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class MyPrescriptionScreen extends Component{
 constructor(){
    super()
  this.state = {
    userId: firebase.auth().currentUser.email,
    image: "#",
    name: "",
    docId: "",
  };
 }
 
  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  getUserProfile() {
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().first_name + " " + doc.data().last_name,
            docId: doc.id,
            image: doc.data().image,
          });
        });
      });
  }

  componentDidMount() {
    this.fetchImage(this.state.userId);
    this.getUserProfile();
  }

  render() {
    return (
    <SafeAreaProvider> 
    <View>
       <MyHeader navigation={this.props.navigation} title="My Prescriptions"/>
     <Text style={styles.logOutText}> Put the image of the prescription given by the doctor</Text> 
     <View style={{ alignItems: "center", justifyContent : 'center' }} > 
     <TouchableOpacity onPress={() => this.selectPicture()}>
      <Image source={{ uri: this.state.image, }} style={styles.imageContainer} />
       </TouchableOpacity> 
       </View> 
       </View>
        </SafeAreaProvider>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerItemsContainer: {
    flex: 0.8,
  },
  logOutContainer: {
    flex: 0.2,
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  logOutButton: {
    height: 30,
    width: "100%",
    justifyContent: "center",
    padding: 10,
  },
  imageContainer: {
  //  flex: 1,
    width: 350,
    height: 300,
    marginLeft: 20,
    marginTop: 50,
 //   borderRadius: 40,
  },
  logOutText: {
    marginTop : 100,
    fontSize: 20,
    fontWeight: "bold",
  },
});



