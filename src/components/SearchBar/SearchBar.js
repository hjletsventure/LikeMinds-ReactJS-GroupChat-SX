import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myClient } from "../..";
import { GroupContext } from "../../Main";
import { getChatRoomDetails, getTaggingList, markRead } from "../../sdkFunctions";
import { ChatRoomContext } from "../Groups/Groups";
import NotFoundLogo from "./../../assets/Icon.png";
import { groupMainPath } from "../../routes";

function SearchBarContainer({searchResults}) {
  const [searchArray, setSearchArray] = useState([])
  const [shouldShowSearchScreen, setShouldShowSearchScreen] = useState(false)
  const groupContext = useContext(GroupContext)
  useEffect(()=>{
    if(searchResults.length > 0){
      setSearchArray(searchResults)
    }
  })
  useEffect(()=>{
    if(searchResults.length > 0){
      for(let obj of searchResults){
        if(obj[Object.keys(obj)[0]].length > 0){
          setShouldShowSearchScreen(true)
          return ()=>{}
        }
      }
    }
    setShouldShowSearchScreen(false)
  })
  

  return (
    <div className="max-h-[500px] w-[100%] rounded-[10px] bg-white overflow-auto">

      {
        shouldShowSearchScreen ?
          (<>
          {
            searchArray.map((item, itemIndex) => {
              let title = Object.keys(item)[0]
              return (
                <MatchFoundContainer
                  matchArray={item[title]}
                  key={title}
                  title = {title}
                />

              );
            
          })}
          </>)
          : (<NothingFound />)
      }
      {/* <NothingFound/> */}
    </div>
  );
}

function MatchFoundContainer({ matchArray, title }) {
 

  return <MatchTileHead matchObject={matchArray} title={title} />;
}

function MatchTileHead({ matchObject, title }) {
  
  return (
    <div>
      <div
        className="text-base px-4 py-5                       
                        h-14 w-[100%] border-b border-b-solid border-b-[#EEEEEE]
                        flex items-center
                        "
      >
        <span
          className="text-xl font-sans text-center font-semibold
                            leading-6 text-[#323232] h-6
                            "
        >
          {title}
        </span>
      </div>
      {matchObject?.map((searchItem, searchIndex) => {
        
        return (
          <MatchTileFields
            title={searchItem?.chatroom?.title}
            key={searchItem?.chatroom?.title + searchIndex}
            match={searchItem}
          />
        );
      })}
    </div>
  );
}

function MatchTileFields({ title, match }) {
  const groupContext = useContext(GroupContext)
  const chatroomContext = useContext(ChatRoomContext)
  const navigate = useNavigate()
  let markReadFromSearch= () => {
    markRead(match.chatroom.id)
      .then((res) => {
        chatroomContext.refreshChatroomContext();
        navigate(groupMainPath)
      })
      .catch((e) => console.log(e));
    // groupcontext.refreshContextUi();
  }
  async function getChatRoomDataFromSearch(chatroomId) {
    try {
      const chatRoomData = await getChatRoomDetails(myClient, chatroomId);
      console.log(chatRoomData);
      if (!chatRoomData.error) {
        const tagCall = await getTaggingList(
          chatRoomData.data.community.id,
          chatRoomData.data.chatroom.id
        );

        chatRoomData.data.membersDetail = tagCall.data.members;
        groupContext.setActiveGroup(chatRoomData.data);
      } else {
        console.log(chatRoomData.errorMessage);
      }
  
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className="flex items-center
                        px-4 py-5 bg-white
                        h-[54px] border-b border-b-solid border-b-[#EEEEEE]
                        cursor-pointer"
    onClick={()=>{
      console.log("clicked")
      getChatRoomDataFromSearch(match.chatroom.id)
      markReadFromSearch()
    }}
    >
      <span className="leading-[19px] font-normal text-center font-normal text-[#323232]">
        {title}
      </span>
    </div>
  );
}

function NothingFound() {
  return (
    <div className="flex justify-center items-center flex-col px-14 py-7 w-[100%] rounded-[10px] border ">
      <img src={NotFoundLogo} />
      <p className="leading-12 text-2xl text-center">
        Oops, There are no posts related to this search.
      </p>
    </div>
  );
}

export default SearchBarContainer;

// A context array for getting seacrh fields

export const SearchContext = React.createContext({
  contextArray: [],
});
