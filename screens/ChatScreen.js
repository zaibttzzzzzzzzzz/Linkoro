// screens/ChatScreen.js
import { GiftedChat } from 'react-native-gifted-chat';
import { useEffect, useState } from 'react';
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map(doc => ({
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }));
      setMessages(allMessages);
    });
    return () => unsubscribe();
  }, []);

  const onSend = async (newMessages = []) => {
    const { _id, createdAt, text, user } = newMessages[0];
    await addDoc(collection(db, 'messages'), {
      _id,
      createdAt,
      text,
      user
    });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: auth.currentUser?.email,
        name: auth.currentUser?.email,
        avatar: 'https://placeimg.com/140/140/any'
      }}
    />
  );
};

export default ChatScreen;
