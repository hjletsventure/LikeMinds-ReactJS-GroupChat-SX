import { Box } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext, userObj } from "../..";
import MessageBox from "./MessageBox";

function MessageBlock({ conversationObject, userId }) {
  const [convoDetails, setConvoDetails] = useState(conversationObject);
  const userContext = useContext(UserContext);
  const currentUser = userContext.currentUser.id;
  return (
    <Box
      className="flex py-2 px-0 h-full overflow-auto"
      sx={{
        flexDirection: userId === currentUser ? "row-reverse" : "row",
      }}
    >
      <MessageBox
        userId={userId}
        username={convoDetails.member.name}
        messageString={convoDetails.answer}
        time={convoDetails.created_at}
        attachments={
          convoDetails.attachments !== undefined
            ? convoDetails.attachments
            : null
        }
        replyConversationObject={convoDetails?.reply_conversation_object}
        convoId={conversationObject.id}
        conversationReactions={conversationObject.reactions}
        conversationObject={conversationObject}
      />
    </Box>
  );
}

export default MessageBlock;