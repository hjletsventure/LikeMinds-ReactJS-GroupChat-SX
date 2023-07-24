import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import { myClient } from '../..';
import routeVariable from '../../enums/routeVariables';

export function useFirebaseChatConversations(getChatroomConversations: any, setBufferMessage: any) {
  const db = myClient.fbInstance();
  const params = useParams();
  const id: any = params[routeVariable.id];
  const mode: any = params[routeVariable.mode];
  const operation: any = params[routeVariable.operation];
  useEffect(() => {
    const query = ref(db, `collabcards`);

    return onValue(query, (snapshot: any) => {
      if (snapshot.exists()) {
        getChatroomConversations(id, 100).then(() => {
          setBufferMessage(null);
        });
      }
    });
  }, [id]);
}
