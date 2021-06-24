import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet} from 'react-native';
import {Card,Icon,ListItem} from 'react-native-elements'
import MyHeader from '../components/Myheader';
import firebase from 'firebase';
import db from '../config.js'
import {SafeAreaProvider} from 'react-native-safe-area-context';
export default class MyDonationScreen extends Component {
  

   constructor(){
     super()
     this.state = {
      donorId : firebase.auth().currentUser.email,
       donorName : "",
       contactid : '',
       addressid : "",
       allDonations : []
     }
     this.requestRef= null
   }
static navigationOptions = { header: null };

 getDonorDetails=(donorId)=>{
     db.collection("users").where("email_id","==", donorId).get()
     .then((snapshot)=>{
       snapshot.forEach((doc) => {
         this.setState({
           "donorName" : doc.data().first_name + " " + doc.data().last_name,
            "contactid" : doc.data().contact,
            "addressid" : doc.data().address,
         })
       });
     })
   }



 
   getAllDonations =()=>{
     this.requestRef = db.collection("all_donations").where("donor_id" ,'==', this.state.donorId)
     .onSnapshot((snapshot)=>{
       var allDonations = []
       snapshot.docs.map((doc) =>{
         var donation = doc.data()
         donation["doc_id"] = doc.id
         allDonations.push(donation)
       });
       this.setState({
         allDonations : allDonations
       });
     })
   }
 sendItem=(ItemDetails)=>{
     if(ItemDetails.request_status === "Item Sent"){
       var requestStatus = "Donor Interested"
       db.collection("all_donations").doc(ItemDetails.doc_id).update({
         "request_status" : "Donor Interested"
       })
       this.sendNotification(ItemDetails,requestStatus)
     }
     else{
       var requestStatus = "Item Sent"
       db.collection("all_donations").doc(ItemDetails.doc_id).update({
         "request_status" : "Item Sent"
       })
       this.sendNotification(ItemDetails,requestStatus)
     }
   }

   sendNotification=(ItemDetails,requestStatus)=>{
     var requestId = ItemDetails.request_id
     var donorId = ItemDetails.donor_id
     db.collection("all_notifications")
     .where("request_id","==", requestId)
     .where("donor_id","==",donorId)
     .get()
     .then((snapshot)=>{
       snapshot.forEach((doc) => {
         var message = ""
         if(requestStatus === "Item Sent"){
           message = this.state.donorName + " sent you an item" + "" + this.state.contactid +  '' +      this.state.addressid
         }else{
            message =  this.state.donorName  + " has shown interest in donating the item"
         }
         db.collection("all_notifications").doc(doc.id).update({
           "message": message,
           "notification_status" : "unread",
           "date"                : firebase.firestore.FieldValue.serverTimestamp()
         })
       });
     })
   }
   keyExtractor = (item, index) => index.toString()

   renderItem = ( {item, i} ) =>(
     <ListItem
       key={i}
       title={item. ItemtoRequest}
       subtitle={"Requested By : " + item.requested_by +"\nStatus : " + item.request_status}
       leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
       titleStyle={{ color: 'black', fontWeight: 'bold' }}
       rightElement={
           <TouchableOpacity  style={[
              styles.button,
              {
                backgroundColor : item.request_status === "Item Sent" ? "green" : "#ff5722"
              }
            ]}
                onPress = {()=>{
              this.sendItem(item)
            }}>
              <Text style={{color:'#ffff'}}>{
               item.request_status === "Item Sent" ? "Item Sent" : "Send Item"
             }</Text>
           </TouchableOpacity>
         }
        
       bottomDivider
     />
   )


   componentDidMount(){
      this.getDonorDetails(this.state.donorId)
     this.getAllDonations()
   }

   componentWillUnmount(){
     this.requestRef();
   }

   render(){
     return(
          <SafeAreaProvider>
       <View style={{flex:1}}>
         <MyHeader navigation={this.props.navigation} title="My Donations"/>
         <View style={{flex:1}}>
           {
             this.state.allDonations.length === 0
             ?(
               <View style={styles.subtitle}>
                 <Text style={{ fontSize: 20}}>List of all item Donations</Text>
               </View>
             )
             :(
               <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allDonations}
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
     },
    elevation : 16
  },
  subtitle :{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  }
})