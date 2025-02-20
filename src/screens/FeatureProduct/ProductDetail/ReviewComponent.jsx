import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import s from "../../../media/images/singleStar.png";
import Pagination from "../../../components/Main/Pagination";

const ReviewComponent = ({ ratings, stars }) => {
  const [currentPage2, setCurrentPage2] = useState(1);

  const itemsPerPage2 = 4;
  const totalItems2 = ratings?.length || 0;

  // Filter ratings based on the stars count
  const filteredRatings = stars > 0 
    ? ratings?.filter((item) => Math.floor(item?.ratings) === stars) 
    : ratings;

  // Handle pagination
  const startIndex2 = (currentPage2 - 1) * itemsPerPage2;
  const endIndex2 = startIndex2 + itemsPerPage2;
  const displayedSupplier = filteredRatings?.slice(startIndex2, endIndex2);

  return (
    <div className="container mt-4">
     {displayedSupplier?.length > 0 ? <div className="row">
        {displayedSupplier?.map((item, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="custom-card p-3 border rounded">
              <div className="d-flex align-items-center">
                <img
                  src={item?.user?.profile_image}
                  alt={item?.user?.name}
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px", marginRight: "15px" }}
                />
                <div>
                  <h6 className="mb-1">
                    {item?.user?.name}{" "}
                    {/* <img
                      src={item?.countryFlag}
                      alt="country flag"
                      style={{ width: "20px", height: "20px", marginLeft: "5px" }}
                    /> */}
                  </h6>
                  <div>
                    {/* Filled stars */}
                    {Array.from({ length: item?.ratings }).map((_, idx) => (
                      <img
                        key={`filled-star-${idx}`}
                        src={s}
                        alt="filled star"
                        style={{
                          width: "16px",
                          height: "16px",
                          marginRight: "2px",
                        }}
                      />
                    ))}
                    {/* Empty stars */}
                    {Array.from({ length: 5 - item?.ratings }).map((_, idx) => (
                      <img
                        key={`empty-star-${idx}`}
                        src={s}
                        alt="empty star"
                        style={{
                          width: "16px",
                          height: "16px",
                          marginRight: "2px",
                          opacity: "0.2",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-3 mb-0">{item.comment}</p>
            </div>
          </div>
        ))}
      </div> : 
      
      <p className="No-review-found">No review Found</p>}

      {/* Pagination */}
      {filteredRatings?.length > itemsPerPage2 && (
        <div className="feature-product-paginantion">
          <Pagination
            totalItems={filteredRatings?.length}
            itemsPerPage={itemsPerPage2}
            onPageChange={setCurrentPage2}
          />
        </div>
      )}
    </div>
  );
};

export default ReviewComponent;
