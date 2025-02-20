import React, { useState, useEffect, useRef } from "react";
import emojiIcon from "../../../../media/images/smile.png";
import send from "../../../../media/images/send.png";
import blankUser from "../../../../media/images/blankuser.jpg";
import lsp from "../../../../media/images/logo-sign-up.png";
import InputEmoji from "react-input-emoji";
import { ChatBox, sendMessage } from "../../../../utils/api";
import { Spinner } from "react-bootstrap";

const ProductChatView = ({ selectedChat, fetchCreatedChatList }) => {
    const [createdChatData, setCreatedChatData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [newMessage, setNewMessage] = useState(""); // Fix: State reset issue
    const chatContainerRef = useRef(null); // Ref for the chat container to control scroll

    
    const userData = localStorage.getItem("login-user-data");
    const parsedData = JSON.parse(userData);
    const userId = parsedData?.data?.id;

    // ✅ Message send function
    const handleOnEnter = async (msg) => {
        if (!msg?.trim()) return;

        setLoading2(true);
        const messageData = { text: msg, sender: "me" };

        try {
            const data = {
                room_id: selectedChat?.id,
                uid: userId,
                from_id: selectedChat?.participants,
                message_type: 0,
                message: msg,
                status: 1
            };

            await sendMessage(data); // API call to send message
            await fetchCreatedChatList(); // Refresh chat list
            await fetchChatList(); // Fetch updated messages

        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading2(false);
            setNewMessage(""); // Fix: Clear input after sending message
        }
    };

    // ✅ Fetch chat messages
    const fetchChatList = async () => {
        setLoading(true);
        try {
            const response = await ChatBox(selectedChat?.id || "");
            setCreatedChatData(response?.data?.data);
        } catch (error) {
            console.error("Error fetching chat list:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(selectedChat) {
            fetchChatList();
        }
        fetchCreatedChatList();
    }, [selectedChat]);


    useEffect(() => {
        if (chatContainerRef.current) {
            // Scroll to the bottom of the chat container
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [createdChatData]);

    return (
        <>
            {createdChatData?.length ?
                (<div className="chat-view-div" style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff" }}>
                    <div className="selected-chat-top-wrapper" style={{ padding: "20px", borderBottom: "1px solid #ddd", fontWeight: "bold" }}>
                        <div className="d-flex align-items-center gap-10">
                            <div className="selected-chat-image">
                                <img src={selectedChat.profileImage} alt="Profile" />
                            </div>
                            <div>
                                <span className="chat-view-user-name">{selectedChat.name} </span>
                            </div>
                        </div>
                    </div>

                    {loading ?
                    <div ref={chatContainerRef} style={{ flex: 1, padding: "20px", overflowY: "auto", scrollbarWidth: "none", textAlign:"center" }}>
                        <Spinner animation="border" role="statuss" size="sm" />
                    </div>
                        : <div ref={chatContainerRef} style={{ flex: 1, padding: "20px", overflowY: "auto", scrollbarWidth: "none" }}>
                            {createdChatData?.map((msg, index) => (
                                <div key={index} className={msg?.uid == userId ? "chat-view-message-me-main" : "chat-view-message-user-main"}>
                                    <button>{msg?.message}</button>
                                    <p>{msg?.time}</p>
                                </div>
                            ))}
                        </div>}

                    {/* ✅ Message Input */}
                    <div style={{ padding: "10px", borderTop: "1px solid #ddd", position: "relative", display: "flex", alignItems: "center" }}>
                        {loading2 ? (
                            <div className="message-loader">
                                <div className="spinner-grow spinner-grow-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> Sending ...
                            </div>
                        ) : (
                            <InputEmoji
                                value={newMessage}
                                onChange={setNewMessage} // Fix: Prevents first letter disappearing
                                onEnter={handleOnEnter}
                                placeholder="Type a message"
                                style={{
                                    flex: 1,
                                    padding: "10px",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    outline: "none",
                                }}
                            />
                        )}

                        <div className="input-chat-icons" style={{ display: "flex", gap: "5px" }}>
                            {!loading2 && <img
                                src={send}
                                alt="Send"
                                style={{ marginBottom: "3px", cursor: "pointer" }}
                                onClick={() => handleOnEnter(newMessage)} // ✅ Send message on click
                            />}
                        </div>
                    </div>
                </div>
                ) : (loading ?
                    <div ref={chatContainerRef} style={{ flex: 1, padding: "20px", overflowY: "auto", scrollbarWidth: "none", textAlign:"center" }}>
                        <Spinner animation="border" role="statuss" size="sm" style={{marginTop: "10rem"}}/>
                    </div> :
                    <div className="chat-logo-screen" >
                        <img src={lsp} alt="User" />
                    </div>
                )}
        </>
    );
};

export default ProductChatView;
