

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

//import {AsyncStorage} from '@react-native-community/async-storage';

import React, { Component } from 'react';
import {
    ActivityIndicator,
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    InputAccessory,
    KeyboardAvoidingView,
    Alert,
    Switch,
    StatusBar,
    Button,
    AsyncStorage
} from 'react-native';

import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator,
    createDrawerNavigator
}from 'react-navigation';

import Image from 'react-native-scalable-image';
import Communications from 'react-native-communications';
import ImagePicker from 'react-native-image-picker';





const WeeklyMenu =(props)=>{
    return (
            <View style = {{justifyContent: 'center', alignItems: 'center'}}>
            <View>
            <Image
            width={Dimensions.get('window').width}
            source = {require('./affiliateImages/weekMenu.jpg')}
            />
            </View>
            </View>
            )
}





const CompanyPage = (props)=> {
    return (
            
            <View style = {{flex: 1, backgroundColor: 'white', borderRadius: 1}}>
            <View style = {{alignSelf: 'center'}}>
            <Text style = {{fontWeight:'200', color:'black', fontSize: 25 }}> Our Affiliates! </Text>
            </View>
            <ScrollView horizontal = {true}>
            
            <View style = {{flex: 1,  flexDirection: 'column'}}>
            
            <View style = {{justifyContent: 'space-between', flexDirection: 'row', padding: 10}}>
            <Image style = {styles.img} source = {require('./affiliateImages/RunningManHands.png')}/>
            <Image style = {styles.img} source = {require('./affiliateImages/FNLabs.jpg')}/>
            <Image style = {styles.img} source = {require('./affiliateImages/CalSportNutrition.png')}/>
            <Image style = {styles.img} source = {require('./affiliateImages/rawBaby.png')}/>
            <Image style = {styles.img} source = {require('./affiliateImages/DefinedMeals.jpg')}/>
            
            </View>
            
            <View style = {{justifyContent: 'space-between', flexDirection: 'row', padding: 10}}>
            <Image style = {styles.img} source = {require('./affiliateImages/Fitnation.jpg')}/>
            <Image style = {styles.img} source = {require('./affiliateImages/UNTMD.jpg')}/>
            <Image style = {styles.img} source = {require('./affiliateImages/HardKour.png')}/>
            <Image style = {styles.img} source = {require('./affiliateImages/KraftedOrganics.png')}/>
            <Image style = {styles.img} source = {require('./affiliateImages/Grunner.jpg')}/>
            </View>
            
            </View>
            
            </ScrollView>
            </View>
            
            )
}


const MyTextInput=(props) =>{
    return(
           <View>
           <TextInput
           style={props.style}
           multiline={true}
           placeholder= {'Please type Order, if needed provide details.'}
           srollEnabled = {true}
           spellCheck={true}
           keyboardAppearance = {'dark'}
           onChangeText = {props.textChanging}
           value={props.passStateText}/>
           </View>
           );
}



const DataInput = (props) =>{
    return(
           <View>
           <TextInput
           style={{height: 20,
           width:200,
           backgroundColor: 'white',
           borderRadius: 10
           }}
           placeholder={props.mocText}
           onChangeText={props.onChangeText}
           value = {props.value}
           keyboardAppearance = 'dark'
           keyboardType = {props.keyboardType}
           />
           </View>
           )
}



RedTextError = (props) =>{
    
    const {hide} = props;
    
    if (hide){
        return null;
    }return(
            <View style = {{justifyContent: 'flex-end', flexDirection: 'row', padding: 10}}>
            <Text style = {{ fontWeight:'200', color: 'red'}}>{props.textError}</Text>
            </View>
            )
}

const SwitchComponent =(props) => {
    return(
           <View>
           <Switch
           onValueChange={props.onValueChange}
           value={props.value}/>
           </View>
           );
}



class ImageOptions extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
        photo: ' ',
        };
         const {enableComponent} = this.props;
        this.holdToChoosePhoto = this.holdToChoosePhoto.bind(this);
    }
   
    

    holdToChoosePhoto = ()=> {
    
        const options = {
        noData: true
        };
        ImagePicker.launchImageLibrary(options, response =>{
                                       if (response.uri){
                                       const source = { uri: response.uri}
                                       this.setState({photo: source});
                                       }
                                       })
    }
    
    render(){
        
        if (this.state.photo != ' '){
        return(
               <View style = {{justifyContent: 'center', alignItems: 'center' }}>
               <TouchableOpacity
               onPress = {this.holdToChoosePhoto}>
               <Image
               source = {this.state.photo}
               width={Dimensions.get('window').width}
               />
               </TouchableOpacity>
               </View>
               
               )
            
        }else if (this.state.photo == ' '){
            return(
                   <View style = {{justifyContent: 'center', alignItems: 'center' }}>
                   <TouchableOpacity
                   onPress = {this.holdToChoosePhoto}>
                   <Image
                   width = {Dimensions.get('window').width}
                   source = {require('./affiliateImages/weekMenu.jpg')}
                   />
                   </TouchableOpacity>
                   </View>
            )
        }
    }
    
}

const HomeScreenWhiteText = (props) => {
    return (
            <Text style = {styles.homeScreenWhiteText}>
            {props.message}
            </Text>
            )
}



class SignInScreen extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
        visible: true,
        username: '',
        password: '',
        }
        
        this._logIn = this._logIn.bind(this);
        this.saveItem = this.saveItem.bind(this);
        this.toggleTextError = this.toggleTextError.bind(this);
        
        
    }
    
    
    static navigationOptions = ({navigation})=> {
        return{
        headerStyle: { backgroundColor: 'black'},
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
        }};
    
    
    toggleTextError (){
        this.setState((prevState, props) => {
                      return {visible:!prevState.visible}
                      })
    }
    
    
    async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }
  
    
    _logIn (){
        if (!this.state.username || !this.state.password) return;
        fetch('http://192.168.1.70:3001/sessions/create',{
              method: 'POST',
              headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
              body: JSON.stringify({
                                   username: this.state.username,
                                   password: this.state.password,
                                   })
              })
        .then((response) => response.json())
        .then((responseData) => {
              this.saveItem('id_token', responseData.id_token),
              this.props.navigation.navigate('Home', {admin: this.state.username});
              })
        .catch((error) =>{
               console.log(error);
               this.toggleTextError();
               });
    }
    
    
    render() {
        return (
                <View style={styles.container}>
                <StatusBar
                barStyle = 'light-content'
                networkActivityIndicatorVisible = {true}
                />
                
                <KeyboardAvoidingView
                behavior={'position'}
                style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                backgroundColor: 'black',
                }}>
                
                <Image source={{uri:'https://img1.wsimg.com/isteam/ip/617621af-c4f2-4498-8b1f-76e48e71a462/4F8E84CE-F1CC-4DD5-8BF3-7850547BB3DC.jpeg/:/cr=t:31.27%25,l:0%25,w:100%25,h:46.18%25/rs=w:365,h:365,cg:true'}}
                style = {{height: 150, width: 150, padding: 25}}/>
                
                <View style ={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text
                style={{fontWeight: "200", fontSize: 30, color: 'white'}}>
                LEAN MEAN MEALS
                </Text>
                
                <TextInput
                style={styles.transparentTextInput}
                keyboardAppearance = 'dark'
                keyboardType = 'default'
                onChangeText = {(username) => this.setState({username})}
                value={this.state.username}
                />
                
                <View style = {{alignSelf:'flex-end', flexDirection: 'row', borderRightWidth: 25}}>
                <Text style = {{ color: 'white', fontWeight: "200"}}> Username </Text>
                </View>
                
                <RedTextError
                textError = {"username or password is incorrect"}
                hide = {this.state.visible}/>
                
                <TextInput
                style={styles.transparentTextInput}
                keyboardAppearance = 'dark'
                keyboardType = 'default'
                secureTextEntry = {true}
                onChangeText = {(password)=> this.setState({password})}
                value={this.state.password}
                />
                
                <View style = {{alignSelf:'flex-end', flexDirection: 'row', borderRightWidth: 25}}>
                <Text style = {{color: 'white', fontWeight: "200"}}> Password </Text>
                </View>
                </View>
                
                
                
                <View style = {{flex: 1,alignItems: 'center', justifyContent: 'space-between'}}>
                <Button
                style={{fontWeight: "200"}}
                onPress={this._logIn}
                title="Sign In"
                color = 'white'
                />
                
                <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('createAccount')}
                style = {{alignSelf: 'flex-end', flexDirection: 'row', padding: 30}}
                >
                <Text
                style={{fontWeight:'200' ,color:'red', textDecorationLine: "underline"}}>
                Create Account
                </Text>
                </TouchableOpacity>
                </View>
                </KeyboardAvoidingView>
                </View>
                
                
                )
    }
}




class CreateAccount extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
        visible: true,
        username: '',
        password: '',
        }
        
        this.saveItem = this.saveItem.bind(this);
        this._signUp = this._signUp.bind(this);
        this.toggleTextError = this.toggleTextError.bind(this);
        
    }
    
    toggleTextError (){
        this.setState((prevState, props) => {
                      return {visible:!prevState.visible}
                      })
    }
    
    
    async saveItem(item, selectedValue) {
        try {
            await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
            console.error('AsyncStorage error: ' + error.message);
        }
    }
    
    _signUp () {
        if(!this.state.username || !this.state.password) return;
        fetch('http://192.168.1.70:3001/users', {
              method: 'POST',
              headers: {
              'Accept': 'application/json', 'Content-Type': 'application/json'},
              body: JSON.stringify({
                                   username : this.state.username,
                                   password: this.state.password,
                                   })
              })
        .then((response) => response.json())
        .then((responseData) => {
              this.saveItem('id_token',responseData.id_token),
              this.props.navigation.goBack();
              })
        .catch((error) =>{
               console.log(error);
               this.toggleTextError();
               });
    }
    
    
    static navigationOptions = ({navigation})=> {
        return{
        headerStyle: {
        backgroundColor: 'black',
        },
            
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
        }};
    
    render(){
        return(
               <View style = {{ flex: 1, backgroundColor: 'black', justifyContent: 'flex-start', alignItems: 'center' }}>
               <View style = {{padding: 50}}>
               <Text style = {{color: 'white', fontWeight: "700"}}> Hello, Please create an Account. </Text>
               </View>
               <RedTextError hide = {this.state.visible} textError ={"The username already exists"}/>
               <View style = {{justifyContent: 'center', alignItems: 'space-between'}}>
               <TextInput
               onChangeText = {(username)=>this.setState({username})}
               value = {this.state.username}
               placeholder = {'User Name'}
               keyboardType = 'default'
               style = {styles.transparentTextInput}
               keyboardAppearance = 'dark'
               />
               <View style = {{alignItems:'flex-end', flexDirection: 'row'}}>
               <Text style = {{color: 'white', fontWeight: "700"}}> Username </Text>
               </View>
               <TextInput
               onChangeText = {(password)=>this.setState({password})}
               value = {this.state.password}
               placeholder = {'password'}
               keyboardType = 'default'
               keyboardAppearance = 'dark'
               style ={styles.transparentTextInput}
               />
               <View style = {{alignItems:'flex-end', flexDirection: 'row'}}>
               <Text style = {{color: 'white', fontWeight: "700"}}> Password </Text>
               </View>
               </View>
               <View style = {{ flex: 1 , alignItems: 'center'}}>
               <Button
               title = "Sign-Up"
               onPress = {this._signUp}
               color = 'white'
               style ={{fontWeight: '200'}}/>
               </View>
               </View>
               )
    }
    
}





class HomeScreen extends Component {
    
    constructor(props){
        super(props);
        
        this.state = {
        text:'',
        titleText: '',
        };
        
        
        this.sendSMSmessage = this.sendSMSmessage.bind(this);
        this.LogOut = this.LogOut.bind(this); 
    };
    
    static navigationOptions = ({navigation})=> {

        return{
        headerRight:
            <View style = {{flex: 1}}>
            <Text style = {{color: 'white'}}></Text>
            </View>,
        headerStyle: {
        backgroundColor: 'black',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
        }};
    
    sendSMSmessage=() =>{
        const textmessage = this.state.titleText;
        Communications.text('3236952798',textmessage)
    }
    
    LogOut = async() =>{
        try{
            await AsyncStorage.removeItem('@id_token');
            this.props.navigation.navigate('Auth');
        }catch(error){
            console.error('Error: '+ error.message)
        }
    };
    
  
    
    render() {
        const {navigation} = this.props;
        const admin = navigation.getParam('admin', 'null');
        
        return (
                <ScrollView
                style = {{
                backgroundColor: 'black',
                }}>
                
                <StatusBar
                barStyle = 'light-content'
                networkActivityIndicatorVisible = {true}
                />
                
                <View style = {{flex: 1}}>
                <Image source={require('./affiliateImages/bannerLMM.jpg')}
                width = {Dimensions.get('window').width} />
                </View>

                <HomeScreenWhiteText message = {"WEEKLY MENU - AUG. 26TH, 2019"}/>
                <Text style = {{color: 'white'}}> admin:{JSON.stringify(admin)} </Text>
                <ImageOptions enableComponent = {true}/>
                
                <View style = {{ backgroundColor: 'transparent', alignItems: 'center', padding: 25}}>
                <MyTextInput
                style={{
                fontWeight: '200',
                width:250,
                height:300,
                borderRadius:10,
                backgroundColor:'#ffffe6',
                margin: 10
                }}
                passStateText = {this.state.titleText}
                textChanging ={(titleText)=>this.setState({titleText})
                }/>
                
                <View style = {{padding:25}}>
                <Button
                onPress = {this.sendSMSmessage}
                title="Send"
                color="red"
                />
                </View>
                </View>
                
                <CompanyPage/>
                
                <View style = {{padding: 50}}>
                <Button
                onPress = {this.LogOut}
                title = "sign out"
                color = "red"
                />
                
                </View>
                
                </ScrollView>
                );
    }
}



const styles = StyleSheet.create({
                                 
                                 LogInImage:{
                                 height: 255,
                                 width:255,
                                 },
                                 homeScreenWhiteText:{
                                 alignSelf: 'center',
                                 color: 'white',
                                 padding: 25,
                                 fontWeight: '100',
                                 fontSize: 18
                                 },
                                 
                                 LoginButton:{
                                 borderRadius:245,
                                 width:122.5,
                                 overflow: 'hidden',
                                 },
                                 
                                 transparentTextInput : {
                                 height: 50,
                                 width: 250,
                                 color: 'white',
                                 fontSize: 16,
                                 borderBottomColor: '#bbb',
                                 borderBottomWidth: StyleSheet.hairlineWidth,
                                 },
                                 
                                 miniRoundedButtonStyle:{
                                 borderRadius: 245,
                                 width: 125,
                                 overflow: 'hidden',
                                 },
                                 
                                 roundedButtonStyle:{
                                 borderRadius: 245,
                                 width: 250,
                                 overflow: 'hidden',
                                 },
                                 
                                 input: {
                                 width: 245,
                                 height: 50,
                                 padding: 10,
                                 marginBottom: 10,
                                 backgroundColor: '#ecf0f1',
                                 borderRadius: 250,
                                 },
                                 
                                 container:{
                                 flex: 1,
                                 backgroundColor:'black',
                                 },
                                 
                                 title:{
                                 margin: 24,
                                 fontSize: 16,
                                 fontWeight:'bold',
                                 textAlign: 'center',
                                 },
                                 
                                 image:{
                                 width: 250,
                                 height: 300,
                                 borderRadius: 10,
                                 },
                                 
                                 cardContainer:{
                                 justifyContent:'center',
                                 alignItems:'center',
                                 },
                                 
                                 card:{
                                 backgroundColor: 'white',
                                 justifyContent:'center',
                                 alignItems:'center',
                                 margin: 8,
                                 borderRadius: 10,
                                 width: 250,
                                 }
                                 
                                 });




const AppStack = createStackNavigator({
                                      Home: {
                                      screen: HomeScreen,
                                      }
                                      });

const AuthStack = createStackNavigator({signIn: SignInScreen,
                                       createAccount: CreateAccount
                                       });

export default createAppContainer(createSwitchNavigator({
                                                        Auth: AuthStack,
                                                        App: AppStack,
                                                        }
                                                        ));


