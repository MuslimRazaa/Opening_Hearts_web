import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductOptions = ({ attributes, onColorChange, onSizeChange }) => {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    onColorChange(color); // Pass the selected color to parent
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    onSizeChange(size); // Pass the selected size to parent
  };

  useEffect(() => {
    if (attributes?.length > 0) {
      const sizeAttribute = attributes.find((attr) => attr.key === "Size");
      const colorAttribute = attributes.find((attr) => attr.key === "Colors");

      setSize(sizeAttribute?.value || []);
      setColor(colorAttribute?.value || []);
    }
  }, [attributes]);


  console.log(color, "color options")

  return (
    <div className="d-flex align-items-center gap-4">
      {/* Colors Section */}
      <div className="d-flex align-items-center">
        <span className="me-2">Colours:</span>
        {color?.map((color) => (
          <div
            key={color?.id}
            className="rounded-circle me-2"
            style={{
              width: "25px",
              height: "25px",
              backgroundColor: color?.color_code,
              border: selectedColor === color?.id ? `3px solid black` : "1px solid #ccc",
              cursor: "pointer",
              transform: selectedColor === color?.id ? "scale(1.2)" : "scale(1)", // Slightly enlarge the selected color
              transition: "all 0.2s ease",
            }}
            onClick={() => handleColorChange(color?.id)}
          ></div>
        ))}
      </div>

      {/* Sizes Section */}
      {size?.length > 0 ? (
        <div className="d-flex align-items-center">
          <span className="me-2">Size:</span>
          {size?.map((size) => (
            <button
              key={size}
              className={`detail-size-btn btn ${
                selectedSize === size ? "btn-primary text-white" : "btn-outline-secondary"
              }`}
              style={{
                fontWeight: selectedSize === size ? "bold" : "normal",
                borderWidth: selectedSize === size ? "2px" : "1px",
              }}
              onClick={() => handleSizeChange(size)}
            >
              {size?.name || "Not Available"}
            </button>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductOptions;
