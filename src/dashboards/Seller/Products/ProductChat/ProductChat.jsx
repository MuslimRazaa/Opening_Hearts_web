import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import laravelEcho from "../../../../socket/index";
import apis from '../../../../service';
import Swal from 'sweetalert2';
import LoadingComponents from '../../../../components/shared/loaders/LoadingComponents';
import NoDataFound from '../../../../components/shared/noDataFound/NoDataFound';
import { IoSend } from "react-icons/io5";
import blankUser from "../../../../media/images/blankuser.jpg"

function ProductChat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [chatLists, setChatList] = useState([]);
  const [newChat, setNewChat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem('user_data'));
  const user_id = loggedInUser?.id;
  const location = useLocation();
  const navigator = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const room_id = searchParams.get('room-id');
  const [showChat, setShowChat] = useState(false);
  const status = 0;
  const type =

    useEffect(() => {
      const channel = laravelEcho.channel("chat-channel-" + user_id);
      channel.listen(".chat-channel", (data) => {
        console.log(data, 'chatsocket');
        getProductChat({ participants: room_id });
      });
      return () => {
        channel.stopListening(".chat-channel");
      };
    }, [user_id]);


  const getProductChat = async (data) => {
    try {
      const response = await apis.getProductChat(user_id, status)
      setChatList(response?.data?.data);
      for (let i = 0; i < response?.data?.data?.length; i++) {
        if (+data?.participants == +response?.data?.data[i]?.id) {
          getMessagesById(response?.data?.data[i]?.id)
          if (selectedChat === null) {
            setSelectedChat(response?.data?.data[i])
          }
        }
      }
      setNewChat(false)
      setLoading(false)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message
      });
      setLoading(false)
    }
  };

  const handleChatSelection = async (reciptId, chat) => {
    setLoadingChat(true)
    setShowChat(true)
    try {
      const response = await apis.getMessagesById(reciptId)
      setSelectedChat(chat);
      setMessages(response?.data?.data);
      setLoadingChat(false)
      getProductChat(null)
      navigator(`/dashboard/product-Chat?room-id=${reciptId}`)
    } catch (error) {
      setLoadingChat(false)
      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message
      });
    }
  };

  const getMessagesById = async (reciptId) => {
    try {
      const response = await apis.getMessagesById(reciptId, user_id)
      setMessages(response?.data?.data);
      setLoadingChat(false)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message
      });
      setLoadingChat(false)
    }
  };

  const sendMessage = async () => {
    
    if (newMessage.trim() !== "") {
      try {
        console.log('calling');
        const Massage = {
          room_id: selectedChat?.id,
          uid: user_id,
          from_id: selectedChat?.participants,
          message_type: 1,
          message:newMessage,
          status: 0
        };
        const response = await apis.sendChatMessage(Massage);
        getProductChat({ participants: selectedChat?.id });
        setNewMessage("");
      } catch (error) {
        Swal.fire({
          icon: 'error',
          text: error.response?.data?.message
        });
      }
    }
  };

  const filterChats = () => {
    return chatLists?.filter(
      (chat) =>
        chat?.receiver_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
  };

  const createChatRooms = async (data) => {
    setLoadingChat(true)
    try {
      const response = await apis.createChatRooms({
        uid: user_id,
        participants: data?.guid,
        status: 0,
        about_vendor_status: 1
      })
      setNewChat(false)
      navigator(`/dashboard/product-Chat?room-id=${response?.data?.data?.id}`)
    } catch (error) {
      setLoadingChat(false)
      setNewChat(false)
      Swal.fire({
        icon: 'error',
        text: error.response?.data?.message
      });
    }
  }

  useEffect(() => {
    if (room_id != null) {
      getProductChat({ participants: room_id });
    } else {
      getProductChat(null);
    }
  }, [room_id]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const seller_Id = searchParams.get('id');
    if (seller_Id) {
      createChatRooms({ guid: seller_Id });
    }
  }, []);

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {loading ?
        <div className="customer-chat-loader main-content w-full md:w-3/4 px-4 py-0">
          <LoadingComponents />
        </div>
        :
        <>
          <div className="main-content w-full" id="hide-on-mobile-chat">
            <div className="chat-container">
              <div className="chat-container-wrap">
                <div className="chat-container-wrap-left">
                  <div className="sidebar">
                    <input type="text" placeholder="Search chats..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <div className="chat-listing-wrap">
                      <ul>
                        {filterChats().map((chat, index) => {
                          return (
                            <li key={chat?.id} onClick={() => handleChatSelection(chat?.id, chat)}
                              className={selectedChat?.id === chat?.id ? "active-chat" : chat?.read_count > 0 ? "active-count" : ""}>
                              <div className="list-image-chat">
                                <div>
                                  {chat?.sender_profile_image?.includes('http') ?
                                    <img src={chat?.sender_profile_image} style={{ borderRadius: "40px" }} width="40" height="40" />
                                    :
                                    <img src={blankUser} style={{ borderRadius: "40px" }} width="40" height="40" />
                                  }
                                </div>
                                <div className="name-mgs">
                                  <div className="name">{chat?.sender_name} {chat?.sender_last_name}</div>
                                  <p className="message">{chat?.message?.substring(0, 10)}...</p>
                                </div>
                                <div className="time">
                                  {selectedChat?.id == messages?.[0]?.room_id && selectedChat?.id && messages?.[0]?.room_id ? null :
                                    chat?.read_count > 0 && <div className="read"><span>{chat?.read_count}</span></div>
                                  }
                                  <div className="time">
                                    {chat?.date?.slice(0, 5)}
                                    {chat?.date?.slice(9, 20)}
                                  </div>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="chat-container-wrap-right">
                  <div className="conversation">
                    {messages?.length > 0 ? (
                      loadingChat ?
                        <div className="customer-chat-detail-loader"><LoadingComponents /></div>
                        :
                        <div className="messages-container">
                          <div className="chat-header">
                            {selectedChat?.sender_profile_image ? (
                              <><img src={selectedChat?.sender_profile_image} /></>) : (<><img src={blankUser} alt="blank" /></>)}
                            {selectedChat?.sender_id}
                            <div className="name-last-seen">
                              <h3>{selectedChat?.sender_name} {selectedChat?.sender_last_name}</h3>
                            </div>

                          </div>
                          <div className="messages-cont" ref={chatContainerRef}>
                            <div className="messages-cont-wrap">
                              {messages?.map((msg) => {
                                if (msg?.uid == user_id) {
                                  return (
                                    <div key={msg?.id} className="sent-message">
                                      <div className="sent-message-wrap"><p className="message">{msg?.message}</p></div>
                                    </div>);
                                } else {
                                  return (
                                    <div key={msg?.id} className="received-message">
                                      <div className="received-message-wrap"><p>{msg?.message}</p></div>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </div>
                          <div className="message-input">
                            <input type="text" placeholder="Type a message..." value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)} />
                            <span onClick={sendMessage}><IoSend /></span>
                          </div>
                        </div>
                    ) : (
                      loadingChat ? <div className="customer-chat-detail-loader"><LoadingComponents /></div>
                        : <div className="no-chat-selected"><NoDataFound title={'No chat found'} /></div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default ProductChat
