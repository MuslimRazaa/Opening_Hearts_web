import React, { useEffect, useState } from 'react'
import ProductChatList from '../../dashboards/Seller/Products/ProductChat/ProductChatList';
import ProductChatView from '../../dashboards/Seller/Products/ProductChat/ProductChatView';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { getCreatedChatList } from '../../utils/api';
import { useUserData } from '../../components/shared/helperMethod';

function UserChat() {
    const [selectedChat, setSelectedChat] = useState(() => {
        const savedChat = localStorage.getItem("selectedChat");
        return savedChat ? JSON.parse(savedChat) : null;
      });
    const [createdChatData, setCreatedChatData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (selectedChat) {
          localStorage.setItem("selectedChat", JSON.stringify(selectedChat));
        }
        else{
            
        }
      }, [selectedChat]);


    const userfetch = useUserData()

    // const userData = localStorage.getItem("user_data");
    // const parsedData = JSON.parse(userData);
    const userId = userfetch?.id;

    const fetchCreatedChatList = async () => {
        setLoading(true);
        try {
            const response = await getCreatedChatList(userId, "seller", "1");
            setCreatedChatData(response?.data?.data); // Adjust based on API response structure
            console.log(response?.data?.data, "new chat chatchatchatchatchat response?.data?.data?.seller")
            console.log(createdChatData, "new chat dataaa")
        } catch (error) {
            console.error('Error fetching top-rated products:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCreatedChatList();
    }, []);

    return (
        <>
            <Header />
            <div className="container my-4">
                <div style={{ display: "flex", height: "75vh", background: "#fff" }}>
                    <ProductChatList  selectedChat={selectedChat} setSelectedChat={setSelectedChat} createdChatData={createdChatData} fetchCreatedChatList={fetchCreatedChatList} />
                    <ProductChatView selectedChat={selectedChat} fetchCreatedChatList={fetchCreatedChatList} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UserChat
