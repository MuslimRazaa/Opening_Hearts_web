import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductOptions = () => {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");

  const handleColorChange = (color) => setSelectedColor(color);
  const handleSizeChange = (size) => setSelectedSize(size);

  return (
    <div className="d-flex align-items-center gap-4">
      {/* Colors Section */}
      <div className="d-flex align-items-center">
        <span className="me-2">Colours:</span>
        <div
          className="rounded-circle me-2"
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: "black",
            border: selectedColor === "black" ? "2px solid #FF4500" : "1px solid #ccc",
            cursor: "pointer",
          }}
          onClick={() => handleColorChange("black")}
        ></div>
        <div
          className="rounded-circle"
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: "orange",
            border: selectedColor === "orange" ? "2px solid #FF4500" : "1px solid #ccc",
            cursor: "pointer",
          }}
          onClick={() => handleColorChange("orange")}
        ></div>
      </div>

      {/* Sizes Section */}
      <div className="d-flex align-items-center">
        <span className="me-2">Size:</span>
        {["XS", "S", "M", "L", "XL"].map((size) => (
          <button
            key={size}
            className={`detail-size-btn ${
              selectedSize === size ? "text-black" : ""
            }`}
            onClick={() => handleSizeChange(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductOptions;
