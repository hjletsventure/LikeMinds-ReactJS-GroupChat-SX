import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./Main";
import Groups from "./components/Groups/Groups";
import GroupInfo from "./components/groupChatArea/GroupInfo";
import GroupChatArea from "./components/groupChatArea/GroupChatArea";
import AcceptInvite from "./components/groupChatArea/AcceptInvite";
import PersonInfo from "./components/groupChatArea/PersonInfo";
import {
  addedByMePath,
  directMessageChatPath,
  directMessageInfoPath,
  directMessagePath,
  eventsPath,
  forumPath,
  groupAcceptInvitePath,
  groupInfoPath,
  groupMainPath,
  groupPath,
  groupPersonalInfoPath,
  mainPath,
} from "./routes";
import DirectMessagesMain from "./components/direct-messages/DirectMessagesMain";
import "./App.css";
import { useEffect, useState } from "react";
import { UserContext } from ".";
import { initiateSDK } from "./sdkFunctions";
import ChatArea from "./components/direct-messages/ChatArea";

const router = createBrowserRouter([
  {
    path: mainPath,
    element: <Main />,
    children: [
      {
        path: forumPath,
        element: null,
      },
      {
        path: groupPath,
        element: <Groups />,
        children: [
          {
            path: groupMainPath,
            element: <GroupChatArea />,
          },
          {
            path: groupInfoPath,
            element: <GroupInfo />,
          },
          {
            path: groupAcceptInvitePath,
            element: <AcceptInvite />,
          },
          {
            path: groupPersonalInfoPath,
            element: <PersonInfo />,
          },
        ],
      },
      {
        path: eventsPath,
        element: null,
      },
      {
        path: directMessagePath,
        element: <DirectMessagesMain />,
        children: [
          {
            path: directMessageChatPath,
            element: <ChatArea />,
          },
          {
            path: directMessageInfoPath,
            element: <PersonInfo />,
          },
        ],
      },
      {
        path: addedByMePath,
        element: null,
      },
    ],
  },
]);

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [community, setCommunity] = useState({});
  useEffect(() => {
    initiateSDK(false, "53208f29-5d15-473e-ab70-5fd77605be0f", "Ankit")
      .then((res) => {
        console.log(res);
        setCommunity(res.data.data.community);
        setCurrentUser(res.data.data.user);
      })
      .catch((error) => {
        console.log(error);
        alert("error at " + __dirname + "inside useEffect");
      });
  }, []);

  useEffect(() => {
    console.log(currentUser);
    console.log(community);
  }, [currentUser]);

  return (
    <div className="App h-[100vh] flex flex-1">
      <UserContext.Provider
        value={{
          currentUser: currentUser,
          setCurrentUser: setCurrentUser,
          community: community,
          setCommunity: setCommunity,
        }}
      >
        {Object.keys(currentUser).length > 0 ? (
          <RouterProvider router={router} />
        ) : null}
      </UserContext.Provider>
      {/* <Block/> */}
    </div>
  );
}

export default App;
