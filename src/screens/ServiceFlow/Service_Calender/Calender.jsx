import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import clock from '../../../media/images/clocl.png'
import { Link } from "react-router-dom";
const Calender = ({ isVisible, onClose }) => {

    const [date, setDate] = useState(new Date());
    const [duration] = useState("30 Minutes");
    const [timezone] = useState("UTC - 04:00");
    if (!isVisible) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="calendar-container" onClick={(e) => e.stopPropagation()}>
            <div className="row">
                <div className="col-lg-7">
                    <div className="header">
                        <div className="duration">
                            <h3>Duration</h3>
                            <p>{duration}</p>
                        </div>
                        <div className="timezone">
                            <h3>Time Zone</h3>
                            <p>{timezone}</p>
                        </div>
                    </div>
                    <div className="calendar-section">
                        <h3>Set a Date</h3>
                        <Calendar
                            onChange={setDate}
                            value={date}
                            tileClassName={({ date: calendarDate, view }) =>
                                view === "month" && calendarDate.getDate() === date.getDate()
                                    ? "selected-date"
                                    : null
                            }
                        />
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="div">

                    </div>
                    <div className="clock-calender">
                        <img src={clock} />
                    </div>
                    <div className="confirm-section">
                    <Link to="/confirmAppointment" style={{textDecoration:"none"}} ><button className="confirm-button">Confirm</button></Link> 
                    </div>
                </div>
            </div>

            </div>
        </div>
    );
};

export default Calender;
