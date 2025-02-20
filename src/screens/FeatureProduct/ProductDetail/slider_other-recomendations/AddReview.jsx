import React from "react";

const ReviewForm = () => {
    return (
        <div className="add-review-form-container">
            <div className="add-review-form-header">
                <h1>Add Review Here</h1>
                <div className="add-review-rating-stars">
                    {/* {[...Array(5)].map((_, index) => (
            <span key={index} className="add-review-star">
              ★
            </span>
          ))} */}

                    <div class="rating">
                        <input type="radio" name="rating" id="rating-1" value="1" />
                        <label for="rating-1"></label>
                        <input type="radio" name="rating" id="rating-2" value="2" />
                        <label for="rating-2"></label>
                        <input type="radio" name="rating" id="rating-3" value="3" />
                        <label for="rating-3"></label>
                        <input type="radio" name="rating" id="rating-4" value="4" />
                        <label for="rating-4"></label>
                        <input type="radio" name="rating" id="rating-5" value="5" />
                        <label for="rating-5"></label>
                    </div>
                </div>
            </div>

            <form className="add-review-form">
                <input type="text" placeholder="Name" className="add-review-form-input" />
                <input type="email" placeholder="Email" className="add-review-form-input" />
                <textarea
                    placeholder="Your Review"
                    className="add-review-form-textarea"
                ></textarea>
                <p className="add-review-agreement">
                    By continuing you agree to our{" "}
                    <a href="#terms" className="add-review-link">
                        Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#privacy" className="add-review-link">
                        Privacy Policy
                    </a>
                </p>
                <button type="submit" className="add-review-submit-button">
                    AGREE & SUBMIT
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
