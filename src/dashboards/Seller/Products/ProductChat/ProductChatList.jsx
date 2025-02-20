import React, { useEffect, useState } from "react";
import akane from '../../../../media/images/akane.png'
import search from '../../../../media/images/search.svg'
import edit from '../../../../media/images/edit-2.png'
import Modal from "../../../../components/Layout/Modal";
import bank from '../../../../media/images/Group 1000006194.png'
import blank from '../../../../media/images/blankuser.jpg'
import { createChatRoom, getChatList, getCreatedChatList } from "../../../../utils/api";
import Swal from "sweetalert2";

const chats = [
  { id: 1, name: "My AI Chat", lastMessage: "Will head to the Help Center...", profilePic: akane },
  { id: 2, name: "Simion D", lastMessage: "Let's go", profilePic: akane },
  { id: 3, name: "Daren Smith", lastMessage: "Let's go", profilePic: akane },
  { id: 4, name: "Elvis Fer", lastMessage: "Let's go", profilePic: akane },
  { id: 5, name: "Denny", lastMessage: "Let's go", profilePic: akane },
  { id: 6, name: "Garry", lastMessage: "Let's go", profilePic: akane }
  // Add more dummy chats as needed
];


const ProductChatList = ({selectedChat , setSelectedChat, createdChatData , fetchCreatedChatList }) => {
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [newChatData, setNewChatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [filteredChats, setFilteredChats] = useState();
  const [filteredCreatedChats, setFilteredCreatedChats] = useState();


  const userData = localStorage.getItem("login-user-data");
  const parsedData = JSON.parse(userData);
  const userId = parsedData?.data?.id;



  const handleCloseModal3 = () => {
    setIsModalVisible3(false);
  };

  const handleOrderNowClick3 = () => {
    setIsModalVisible3(true);
  };
  const handleSuccess = () => {
    setIsModalVisible3(false);

  };

  const fetchGetChatList = async () => {
    setLoading(true);
    try {
      const response = await getChatList("seller");
      setNewChatData(response?.data?.data?.seller); // Adjust based on API response structure
      console.log(response?.data?.data?.seller, "new chat response?.data?.data?.seller")
      console.log(newChatData, "new chat dataaa")
    } catch (error) {
      console.error('Error fetching top-rated products:', error);
    } finally {
      setLoading(false);
    }
  };

 
  const handleCreateChatRoom = async (id) => {


    console.log(userId, "user id")
    console.log(id, "seller id")

    const formData = {
      uid: userId,
      participants: id,
      status: 1,
      about_vendor_status: 0
    }

    try {
      const result = await createChatRoom(formData);
      console.log(result?.data?.data, "chat created")
      setLoading(false)

      await Swal.fire({
        icon: 'success',
        text: 'Chat room created',
        timer: 1500,
      });
      fetchCreatedChatList();
    } catch (error) {
      console.error('Error adding to cart:', error);
      setLoading(false)
      await Swal.fire({
        icon: 'error',
        text: 'Something Went Wrong',
        timer: 1500,
        confirmButtonText: 'Back',
      });
    }
  }

  useEffect(() => {
    fetchGetChatList();
  }, []);


  // Debounce Function
  useEffect(() => {
    const filterChats = () => {
      if (searchQuery.trim() === "") {
        setFilteredChats(newChatData);
      } else {
        setFilteredChats(
          newChatData?.filter(chat => chat?.shop_name?.toLowerCase().includes(searchQuery?.toLowerCase()))
        );
      }
    };
  
    // Run immediately on mount
    filterChats();
  
    // Set timeout for debounce
    const timeoutId = setTimeout(filterChats, 300);
  
    return () => clearTimeout(timeoutId);
  }, [searchQuery, newChatData]); // newChatData ko bhi include karna zaroori hai!


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery2.trim() === "") {
        setFilteredCreatedChats(createdChatData);
      } else {
        setFilteredCreatedChats(
          createdChatData?.filter(chat => chat?.sender_last_name?.toLowerCase().includes(searchQuery2?.toLowerCase()))
        );
      }
    }, 300); // Debounce delay

    return () => clearTimeout(timeoutId);
  }, [searchQuery2, createdChatData]);


  return (
    <div className="chat-list-div" style={{ width: "35%", border: "2px solid #ddd", borderRadius:"22px",  overflowY: "auto" }}>
      <div className="chat-search-search-box">
        <div style={{ width: "350px" }}>
          <input
            type="text"
            placeholder="Search for any service..."
            className="chat-search-input"
            value={searchQuery2}
            onChange={(e) => setSearchQuery2(e.target.value)}
          />
          <span className="chat-search-icon"><img src={search} /></span>
        </div>
        <div className="new-chat" onClick={handleOrderNowClick3}>
          <img src={edit} />
        </div>

      </div>



      
    {createdChatData?.length > 0 ?
      (filteredCreatedChats?.map((chat) => (
        <div className={chat?.read_count > 0 ? `chat-list-chat-main-one-unseen` : selectedChat?.id === chat?.id ? `chat-list-chat-main-one-selected` : `chat-list-chat-main-one`}
        key={chat?.id}
        onClick={() => setSelectedChat({ 
          id: chat?.id, 
          name: chat?.sender_last_name, 
          profileImage: chat?.sender_profile_image,
          participants: chat?.participants
        })}>
        <div
          className="chat-list-chat-main"
        >
          <img src={chat.sender_profile_image} alt={chat.sender_last_name} style={{ borderRadius: "50%", marginRight: "10px" }} />
          <div>
            <div className="chat-list-chat-name">{chat.sender_last_name}</div>
            <div className="chat-list-chat-last-message" style={{ color: "gray", fontSize: "0.9em" }}>{chat.message}</div>
          </div>
        </div>
        <div className="chat-list-chat-last-time" style={{ color: "gray", fontSize: "0.9em" }}>
          {chat.date}
          {chat?.read_count > 0 && <p className="unread-mesg">{chat?.read_count}</p>}
        </div>

        </div>
      )))
     : <>
      <div className="chat-list-chat-main" style={{marginTop:"20px"}}>
          <img src={blank} style={{ borderRadius: "50%", marginRight: "10px" }} />
          <div>
            <div className="chat-list-chat-name-no-user"></div>
            <div className="chat-list-chat-last-message-no-message" style={{ color: "gray", fontSize: "0.9em" }}></div>
          </div>
        </div>
      <div className="chat-list-chat-main">
          <img src={blank} style={{ borderRadius: "50%", marginRight: "10px" }} />
          <div>
            <div className="chat-list-chat-name-no-user"></div>
            <div className="chat-list-chat-last-message-no-message" style={{ color: "gray", fontSize: "0.9em" }}></div>
          </div>
        </div>
      <div className="chat-list-chat-main">
          <img src={blank} style={{ borderRadius: "50%", marginRight: "10px" }} />
          <div>
            <div className="chat-list-chat-name-no-user"></div>
            <div className="chat-list-chat-last-message-no-message" style={{ color: "gray", fontSize: "0.9em" }}></div>
          </div>
        </div>
        </>
    }




      <Modal isVisible={isModalVisible3} onClose={handleCloseModal3}>
        <div className='wallet-modal-content-here'>
          <div className="wallet-modal-heading">
            <div>
              <img src={require("../../../../media/images/close-circle.png")} onClick={handleCloseModal3} className="close-circle" />
            </div>
            <div className="new-chat" onClick={handleOrderNowClick3}>
              <img src={edit} />
            </div>
            <h3>New Chat</h3>
          </div>
          <br></br>
          <div className="chat-search-search-box">
            <input
              type="text"
              placeholder="Search for any service..."
              className="chat-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="chat-search-icon"><img src={search} /></span>
          </div>
          <div className="wallet-modal-form-wrapper">
            {filteredChats?.map((chat) => (
              <div
                key={chat.user_id}
                onClick={() => handleCreateChatRoom(chat?.user_id)}
                className="chat-list-chat-main"
              >
                <img src={chat.profile_image} alt={chat.shop_name} style={{ borderRadius: "50%", marginRight: "10px" }} />
                <div>
                  <div className="chat-list-chat-name">{chat.shop_name}</div>
                  <div className="chat-list-chat-last-message" style={{ color: "gray", fontSize: "0.9em" }}>{chat.lastMessage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default ProductChatList;
