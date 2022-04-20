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
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const signin = () => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            navigation.navigate('Chat');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                
                <View style={{ marginTop:55 }}>
                    <Text style={{ color: '#b2b2b2',}}>Email</Text>
                    <TextInput
                        style={styles.textinput}
                        placeholder="Enter your email"
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

                <TouchableOpacity style={styles.touchableopacity} 
                    onPress={signin} >
                    <Text style={styles.text}>Sign in</Text>
                </TouchableOpacity>
                    
                <TouchableOpacity style={styles.touchableopacity} 
                    onPress={() => navigation.navigate('Register')}>
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
