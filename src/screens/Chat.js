import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, 
        StyleSheet,
        TextInput,
        Keyboard,
        TouchableOpacity, 
        Text,
        Avatar,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';


export default function Chat({navigation}) {
    const [messages, setMessages] = useState([]);
    const signOutNow = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace('Login');
        }).catch((error) => {
            // An error happened.
        });
    }
    
    useLayoutEffect(() => {
        navigation.setOptions({
            // headerLeft: () => (
            //     <View style={{ marginLeft: 20 }}>
            //         <Avatar
            //             rounded
            //             source={{
            //                 uri: auth?.currentUser?.photoURL,
            //             }}
            //         />
            //     </View>
            // ),
            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 10
                }}
                    onPress={signOutNow}
                >
                    <Text>logout</Text>
                </TouchableOpacity>
            )
        })

        const q = query(collection(db, 'chats'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
        ));

        return () => {
        unsubscribe();
        };


    }, [navigation]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const { _id, createdAt, text, user,} = messages[0]
    
        addDoc(collection(db, 'chats'), { _id, createdAt,  text, user });
    }, []);


    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
            }}
        />
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
