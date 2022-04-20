import React, { useState } from 'react';
import { View, 
        StyleSheet,
        TextInput,
        Keyboard,
        TouchableOpacity, 
        Text,
        TouchableWithoutFeedback,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'


export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Registered
              const user = userCredential.user;
              updateProfile(user, {
                  displayName: name,
                  photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
              })
              .then(() => {
                  alert('Registered, please login.');
              })
              .catch((error) => {
                  alert(error.message);
              })
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorMessage);
          });
      }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                
                <View style={{ marginTop:55 }}>
                    <Text style={{ color: '#b2b2b2',}}>Name</Text>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Enter your name"
                        placeholderTextColor='grey'
                        selectionColor='grey'
                        onChangeText={text => setName(text)}
                    />
                </View>

                <View style={{ marginTop:15 }}>
                    <Text style={{ color: '#b2b2b2',}}>Email</Text>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Enter your name"
                        placeholderTextColor='grey'
                        selectionColor='grey'
                        onChangeText={text => setEmail(text)}
                    />
                </View>

                <View style={{ marginTop:15 }}>
                    <Text style={{ color: '#b2b2b2',}}>Password</Text>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Enter Password"
                        placeholderTextColor='grey'
                        selectionColor="grey"
                        secureTextEntry={!password}
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setPassword(!password)}
                    >
                    {password ? (
                        <Ionicons name="eye-off" size={24} color='grey' />
                    ) : (
                        <Ionicons name="eye" size={24} color='grey' />
                    )}
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop:15 }}>
                    <Text style={{ color: '#b2b2b2',}}>Avatar</Text>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Enter your avatar url"
                        placeholderTextColor='grey'
                        selectionColor='grey'
                        onChangeText={text => setAvatar(text)}
                    />
                </View>

                <TouchableOpacity style={styles.touchableopacity}
                    onPress={register} >
                    <Text style={styles.text}>Register</Text>
                </TouchableOpacity>

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor:'white'
    },
    button: {
        width: 370,
        marginTop: 10
    },
    text:{
        marginLeft:15, 
        color: 'white',
        alignItems:'center'
    },
    touchableopacity:{
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 15,
        padding: 15,
        borderRadius:5,
        backgroundColor:'blue',
        color:'white'
    },
    textinput:{
        marginVertical: 15,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        height: 40,
        color: 'grey'
    }
});
