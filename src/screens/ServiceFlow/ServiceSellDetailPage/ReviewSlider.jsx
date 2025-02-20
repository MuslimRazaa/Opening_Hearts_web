import React from "react";
import sampleImage from "../../../media/images/Rectangle 18258.png"; // Replace with your image path
import user from "../../../media/images/methewSmall.png"; // Replace with your image path
import userChatIcon from "../../../media/images/chat.png"; // Replace with your chat icon
import afg from "../../../media/images/Afghanistan (AF).png"; // Replace with your chat icon
import s from '../../../media/images/singleStar.png'


function ReviewSlider() {

    const testimonials = [
        {
          name: "Mathew",
          countryFlag: afg, // Replace with the actual image or emoji
          image: user, // Placeholder for profile image
          stars: 5,
          text: "Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo.",
        },
    ]
  return (
    <div className="container">
         <div className="row">
        {testimonials.map((item, index) => (
          <div className="col-lg-12 col-md-12 mb-4" key={index}>
            <div className="custom-card p-3 border rounded">
              <div className="d-flex align-items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", marginRight: "15px" }}
                />
                <div> 
                  <h6 className="mb-1 d-flex align-items-center gap-20">
                    {item.name} <img src={item.countryFlag} />
                  </h6>
                  <div className="stars-revies">
                    {Array.from({ length: item.stars }).map((_, idx) => (
                      <img
                        key={`filled-star-${idx}`}
                        src={s} // Replace `s` with the actual path or variable holding the star image source
                        alt="filled star"
                        style={{ width: "16px", height: "16px", marginRight: "2px" }}
                      />
                    ))}
                    {Array.from({ length: 5 - item.stars }).map((_, idx) => (
                      <img
                        key={`empty-star-${idx}`}
                        src={s} // Replace `s` with the image source for the empty or gray star
                        alt="empty star"
                        style={{ width: "16px", height: "16px", marginRight: "2px", opacity: "0.2" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 mb-0">{item?.text}</p>
            </div>
          </div>
        ))}
        </div >
    </div>
  )
}

export default ReviewSlider
