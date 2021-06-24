import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert, ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/Myheader';
import {SafeAreaProvider} from 'react-native-safe-area-context';
export default class BookRequestScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      ItemtoRequest:"",
      reasonToRequest:"",
      requestedItemName: "",
      ItemStatus:"",
      requestId:"",
      userDocId: '',
      docId :''
    }
  }
componentDidMount(){
  this.getItemRequest()
}

getItemRequest =()=>{
  // getting the requested book
var ItemRequest=  db.collection('requested_cylinders')
  .where('user_id','==',this.state.userId)
  .get()
  .then((snapshot)=>{
    snapshot.forEach((doc)=>{
      if(doc.data().ItemStatus !== "received"){
        this.setState({
          requestId : doc.data().request_id,
          requestedItemName: doc.data().ItemtoRequest,
          ItemStatus:doc.data().ItemStatus,
          docId     : doc.id
        })
      }
    })
})}


 createUniqueId(){
    return Math.random().toString(36).substring(7);
  }
  addRequest = async (ItemtoRequest,reasonToRequest)=>{
    if(ItemtoRequest !== '' && reasonToRequest !== ''){
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('requested_cylinders').add({
        "user_id": userId,
        "ItemtoRequest": ItemtoRequest,
        "reason_to_request":reasonToRequest,
        "request_id"  : randomRequestId,
         "ItemStatus" : "requested",
         "date"       : firebase.firestore.FieldValue.serverTimestamp()
    })

   this.setState({
       ItemtoRequest :'',
        reasonToRequest : '',
        requestId: randomRequestId
    })

    return Alert.alert("Item Requested Successfully")
  }
  }

render(){
    return(
      <SafeAreaProvider>
      
        <View style={{flex:1}}>
          <MyHeader title="Request Items" navigation ={this.props.navigation}/>

          <ScrollView>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter the item to request"}
                onChangeText={(text)=>{
                    this.setState({
                        ItemtoRequest:text
                    })
                }}
                value={this.state.ItemtoRequest}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Reason to request the item { Mention the oxygen level and doctor name with his contact number}"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
             
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{ this.addRequest(this.state.ItemtoRequest,this.state.reasonToRequest);
                }}
                >
                <Text>Request</Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>
         </ScrollView>
        </View>
        </SafeAreaProvider>
    )
  }
}



 

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)

