import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import cndr from '../../media/images/Calendar.png'
import arr from '../../media/images/Vector.png'

const CustomDatePicker = ({ datelabel }) => {
    const [startDate, setStartDate] = useState(new Date());

    const customInput = React.forwardRef(({ value, onClick }, ref) => (
        <div
            onClick={onClick}
            ref={ref}
            style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 15px",
                border: "1px solid #ff0080",
                borderRadius: "8px",
                background: "#fff",
                cursor: "pointer",
                color: "#000",
                fontWeight: "500",
                fontSize: "16px",
                gap: "10px",
            }}
        >
            <FaCalendarAlt style={{ color: "#ff0080" }} />
            {value}
            <span style={{ marginLeft: "auto", color: "#ff0080" }}>▼</span>
        </div>
    ));

    return (
        <div className="clander-js">
            {datelabel &&
                <label style={{
                    fontSize: "16px",
                    color: "#7E7E7E",
                    fontWeight: "700",
                    marginBottom: "5px",
                    display: "block",
                    fontFamily: "Robotobold",
                }}>
                    Start Date
                </label>}
            <div className="calender-dpdown">
                <img src={cndr} className="calender-icon" />
                <img src={arr} className="arrow-down" />
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="d MMMM, yyyy"
                />
            </div>
        </div>
    );
};

export default CustomDatePicker;
