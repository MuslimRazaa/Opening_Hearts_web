import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import user from '../../../media/images/userrr.png'
import s from '../../../media/images/singleStar.png'
import arg from '../../../media/images/Argentina (AR).png'
import afg from '../../../media/images/Afghanistan (AF).png'
import pak from '../../../media/images/Pakistan (PK).png'
import Pagination from "../../../components/Main/Pagination";
const ReviewComponent = () => {
  const [currentPage2, setCurrentPage2] = useState(1);


  const itemsPerPage2 = 4;
    const totalItems2 = 14; // Total number of products
    

  const testimonials = [
    {
      name: "Mathew",
      countryFlag: afg, // Replace with the actual image or emoji
      image: user, // Placeholder for profile image
      stars: 5,
      text: "Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo.",
    },
    {
      name: "Sophia",
      countryFlag: pak,
      image: user,
      stars: 3,
      text: "Participating in Super September increased our exposure to global buyers and boosted sales significantly.",
    },
    {
      name: "Jhon",
      countryFlag: afg,
      image: user,
      stars: 5,
      text: "Amazing opportunities to connect with industry leaders during online trade shows and sourcing events.",
    },
    {
      name: "Darren",
      countryFlag: pak,
      image: user,
      stars: 2,
      text: "Amazing opportunities to connect with industry leaders during online trade shows and sourcing events.",
    },
    {
      name: "Darren",
      countryFlag: pak,
      image: user,
      stars: 2,
      text: "Amazing opportunities to connect with industry leaders during online trade shows and sourcing events.",
    },
    {
      name: "Simon",
      countryFlag: arg,
      image: user,
      stars: 1,
      text: "Amazing opportunities to connect with industry leaders during online trade shows and sourcing events.",
    },
    {
      name: "Harry",
      countryFlag: arg,
      image: user,
      stars: 5,
      text: "Amazing opportunities to connect with industry leaders during online trade shows and sourcing events.",
    },
    {
      name: "Mathew",
      countryFlag: afg, // Replace with the actual image or emoji
      image: user, // Placeholder for profile image
      stars: 5,
      text: "Boost brand exposure during our biggest sourcing events and online trade shows, including Super September and March Expo.",
    },
    {
      name: "Sophia",
      countryFlag: pak,
      image: user,
      stars: 3,
      text: "Participating in Super September increased our exposure to global buyers and boosted sales significantly.",
    },
    {
      name: "Jhon",
      countryFlag: afg,
      image: user,
      stars: 5,
      text: "Amazing opportunities to connect with industry leaders during online trade shows and sourcing events.",
    },
    {
      name: "Darren",
      countryFlag: pak,
      image: user,
      stars: 2,
      text: "Amazing opportunities to connect with industry leaders during online trade shows and sourcing events.",
    },
    {
      name: "Darren",
      countryFlag: pak,
      image: user,
      stars: 2,
      text: "Amazing opportunities to connect with industry leaders during online trade shows and sourcing events.",
    },
    {
      name: "Simon",
      countryFlag: arg,
      image: user,
      stars: 1,
      text: "Amazing opportunities to connect with industry leaders during online trade shows and sourcing events.",
    },
    {
      name: "Harry",
      countryFlag: arg,
      image: user,
      stars: 5,
      text: "Amazing opportunities to connect with industry leaders during online trade shows and sourcing events.",
    },
  ];



        // for supplier
        const startIndex2 = (currentPage2 - 1) * itemsPerPage2;
        const endIndex2 = startIndex2 + itemsPerPage2;
        const displayedSupplier = testimonials.slice(startIndex2, endIndex2);
        
      
  return (
    <div className="container mt-4">
      <div className="row">
        {displayedSupplier.map((item, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="custom-card p-3 border rounded">
              <div className="d-flex align-items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", marginRight: "15px" }}
                />
                <div>
                  <h6 className="mb-1">
                    {item.name} <img src={item.countryFlag} />
                  </h6>
                  <div>
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
              <p className="mt-3 mb-0">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="feature-product-paginantion">
              <Pagination
                totalItems={totalItems2}
                itemsPerPage={itemsPerPage2}
                onPageChange={setCurrentPage2}
              />
            </div>
    </div>
  );
};

export default ReviewComponent;
