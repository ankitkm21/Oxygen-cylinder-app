import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity, Image } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/Myheader';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class DonateCylinder extends Component{
  constructor(){
    super()
      this.state = {
      requestedcylinderList : []
    }
  this.requestRef= null
  }
    //.where('itemRequest',==,'requested')
getRequestedcylinderList =()=>{
    this.requestRef = db.collection("requested_cylinders").where('ItemStatus','==','requested')
    .onSnapshot((snapshot)=>{
      var requestedcylinderList = snapshot.docs.map(document => document.data());
      this.setState({
        requestedcylinderList : requestedcylinderList
      });
    })
  }

  componentDidMount(){
    this.getRequestedcylinderList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.ItemtoRequest}
        subtitle={item.reason_to_request}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}  onPress ={()=>{
                this.props.navigation.navigate("RecieverDetails",{"details": item})
              }}>
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
          leftElement ={<Image
          style={{height:50,width:50}}
           source={{
          uri: item.image_link,
          }}
        />}
        bottomDivider
      />
    )
  }

  render(){
    return(
      <SafeAreaProvider>
      <View style={{flex:1}}>
        <MyHeader title="Donate Items" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.requestedcylinderList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>Request an Item in the request item tab</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedcylinderList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
      </SafeAreaProvider>
    )
  }
}
const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
