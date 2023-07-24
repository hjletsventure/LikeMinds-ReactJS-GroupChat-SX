/* eslint-disable react/jsx-no-constructed-context-values */
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatContainer from '.';
import ChatroomContext from '../../contexts/chatroomContext';
import { GeneralContext } from '../../contexts/generalContext';
import Tittle from '../chatroom-title';
import SelectChatroom from '../select-chatroom';
import { UserContext } from '../../contexts/userContext';
import GroupInfo from '../chatroom-info';
import routeVariable from '../../../enums/routeVariables';
import { log } from '../../../sdkFunctions';
import { Box, Button } from '@mui/material';
import UserProfileView from '../../../../modules/common/userProfileView';

const getChatroomComponents = (operation: string) => {
  switch (operation) {
    case '/':
      return <SelectChatroom />;
    case 'main':
      return <ChatContainer />;
    case 'info':
      return <GroupInfo />;
    case 'personal-info':
      return null;
    // case 'invitation': return <InvitationScreen/>
    default: {
      return <SelectChatroom />;
    }
  }
};
const ChatroomWrapper: React.FC = () => {
  const [conversationList, setConversationList] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState({});
  const [isSelectedConversation, setIsSelectedConversation] = useState(false);
  const [showReplyPrivately, setShowReplyPrivately] = useState(false);
  const [replyPrivatelyMode, setReplyPrivatelyMode] = useState(null);
  const [showTitle, setShowTitle] = useState(false);
  const generalContext = useContext(GeneralContext);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const params = useParams();
  const { status } = params;
  const id = params[routeVariable.id];
  const mode = params[routeVariable.mode];
  const operation = params[routeVariable.operation];
  function getChatroomDisplayName() {
    if (mode === 'groups') {
      return generalContext?.currentChatroom?.header;
    }
    const currentUserId = userContext?.currentUser?.id;
    const generalContextUserIds = generalContext?.currentChatroom?.member?.id;
    if (currentUserId === generalContextUserIds) return generalContext?.currentChatroom?.chatroom_with_user?.name;
    return generalContext?.currentChatroom?.member?.name;
  }
  function getChatroomImageUrl() {
    if (generalContext?.chatroomUrl?.length > 0) {
      return generalContext?.chatroomUrl;
    }
    return generalContext?.currentChatroom?.chatroom_image_url;
  }
  useEffect(() => {
    if (id !== '' && id !== undefined) {
      generalContext.setShowLoadingBar(true);
      setShowTitle(false);
    }
    if (operation === 'personal-info') generalContext.setShowLoadingBar(false);
    return () => {
      generalContext.setShowLoadingBar(true);
      setShowTitle(false);
    };
  }, [id]);
  useEffect(() => {
    setShowTitle(true);
  }, [generalContext?.currentChatroom]);
  return (
    <ChatroomContext.Provider
      value={{
        conversationList,
        setConversationList,
        selectedConversation,
        setSelectedConversation,
        isSelectedConversation,
        setIsSelectedConversation,
        showReplyPrivately,
        setShowReplyPrivately,
        replyPrivatelyMode,
        setReplyPrivatelyMode
      }}
    >
      {mode !== 'groups' && operation === 'personal-info' ? (
        <Box mt="-2rem" ml="2rem">
          <UserProfileView
            userData={{ user_unique_id: status }}
            callBack={() => navigate(`/community/direct-message/main/${status}`)}
            callBackButtonText="Message"
          />
        </Box>
      ) : operation !== '' && showTitle && generalContext.currentChatroom?.id != undefined ? (
        <>
          <Tittle
            title={getChatroomDisplayName()}
            memberCount={mode === 'groups' ? generalContext?.currentProfile?.participant_count : null}
            chatroomUrl={getChatroomImageUrl()}
          />

          {getChatroomComponents(operation!)}
        </>
      ) : null}
    </ChatroomContext.Provider>
  );
};

export default ChatroomWrapper;
