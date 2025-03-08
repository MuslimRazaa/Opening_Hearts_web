import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import cndr from '../../media/images/Calendar.png'
import arr from '../../media/images/Vector.png'

const CustomDatePicker = ({ datelabel }) => {
    const [startDate, setStartDate] = useState();

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
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Enter start date"
                />
            </div>
        </div>
    );
};

export default CustomDatePicker;
