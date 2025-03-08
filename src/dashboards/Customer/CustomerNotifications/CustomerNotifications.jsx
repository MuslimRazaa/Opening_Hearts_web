import React, { useEffect, useState } from 'react'
import settings from '../../../media/images/setting.svg';
import notifyImage from '../../../media/images/Notified.png';
import { notifications } from '../../../utils/api';
import LoadingComponents from '../../../components/shared/loaders/LoadingComponents';
import NoDataFound from '../../../components/shared/noDataFound/NoDataFound';

function CustomerNotifications() {
    const [notificationTab, setNotificationTab] = useState("");
    const [notificationLoading, setNotificationLoading] = useState(false);
    const [getNotification, setGetNotification] = useState();

    const FetchNotifications = async (tab) => {
        setNotificationLoading(true)
        try {
            const response = await notifications(tab);
            setGetNotification(response?.data?.data)
            console.log(getNotification, "notifications")
            setNotificationLoading(false)

        }
        catch (err) {
            console.error(err)
            setNotificationLoading(false)

        }
    }

    const handleNotificationsTab = (tab) => {
        setNotificationTab(tab)
    }
    useEffect(() => {
        FetchNotifications();
    }, []);

    useEffect(() => {
        FetchNotifications(notificationTab);
    }, [notificationTab]);


    if (notificationLoading) {
        return (
            <>
                <div className='notification-heading-bar'>
                    <div className="notification-title">
                        <h2>Notifications</h2>
                    </div>
                    <div className="notification-title">
                        <img src={settings} className='settings-not' width={"55px"} />
                    </div>
                </div>
                <br></br>
                <div className="main-notifications-wrapper">
                    <LoadingComponents />
                </div>

            </>
        )
    }

    else {
        return (
            <div>
                <div className='notification-heading-bar'>
                    <div className="notification-title">
                        <h2>Notifications</h2>
                    </div>
                    <div className="notification-title">
                        <img src={settings} className='settings-not' width={"55px"} />
                    </div>
                </div>
                <br></br>
                <div className="main-notifications-wrapper">
                    <div className="notification-tabs">
                        <button onClick={() => handleNotificationsTab("")} className={notificationTab === "" ? `notification-btn-active` : `notification-btn`}>All</button>
                        <button onClick={() => handleNotificationsTab("important")} className={notificationTab === "important" ? `notification-btn-active` : `notification-btn`}>Important</button>
                        <button onClick={() => handleNotificationsTab("buying")} className={notificationTab === "buying" ? `notification-btn-active` : `notification-btn`}>Buying</button>
                        <button onClick={() => handleNotificationsTab("selling")} className={notificationTab === "selling" ? `notification-btn-active` : `notification-btn`}>Selling</button>
                        <button onClick={() => handleNotificationsTab("donation")} className={notificationTab === "donation" ? `notification-btn-active` : `notification-btn`}>Donation</button>
                    </div>
                    <hr></hr>
                    {getNotification?.notifications?.length > 0 ?
                        (<>
                            {getNotification?.notifications?.map((item, index) => (
                                <div className="all-notifications-section">
                                    <div className="new-notification-title">
                                        <div className='all-notification-message'>
                                            <img src={notifyImage} />
                                            <p>{item?.message}</p>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <h6>{item?.date}</h6>
                                            <div className='notification-dot' >
                                            </div>
                                        </div>
                                    </div>
                                </div>))}
                        </>) : <NoDataFound title="No Notifications Available" />}
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className='notification-heading-bar'>
                <div className="notification-title">
                    <h2>Notifications</h2>
                </div>
                <div className="notification-title">
                    <img src={settings} className='settings-not' width={"55px"} />
                </div>
            </div>
            <br></br>
            <div className="main-notifications-wrapper">
                <div className="notification-tabs">
                    <button onClick={() => handleNotificationsTab("")} className={notificationTab === "" ? `notification-btn-active` : `notification-btn`}>All</button>
                    <button onClick={() => handleNotificationsTab("important")} className={notificationTab === "important" ? `notification-btn-active` : `notification-btn`}>Important</button>
                    <button onClick={() => handleNotificationsTab("buying")} className={notificationTab === "buying" ? `notification-btn-active` : `notification-btn`}>Buying</button>
                    <button onClick={() => handleNotificationsTab("selling")} className={notificationTab === "selling" ? `notification-btn-active` : `notification-btn`}>Selling</button>
                    <button onClick={() => handleNotificationsTab("donation")} className={notificationTab === "donation" ? `notification-btn-active` : `notification-btn`}>Donation</button>
                </div>
                <hr></hr>
                {getNotification?.notifications?.length > 0 ?
                    (<>
                        {getNotification?.notifications?.map((item, index) => (
                            <div className="all-notifications-section">
                                <div className="new-notification-title">
                                    <div className='all-notification-message'>
                                        <img src={notifyImage} />
                                        <p>{item?.message}</p>
                                        <div className='d-flex align-items-center'>
                                            <h6>{item?.date}</h6>
                                            <div className='notification-dot' >
                                            </div>
                                        </div>
                                    </div>
                                    <div className='notification-dot' >
                                    </div>
                                </div>
                            </div>))}
                    </>) : <NoDataFound title="No Notifications Available" />}
            </div>
        </div>
    )
}

export default CustomerNotifications
