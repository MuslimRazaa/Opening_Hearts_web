import React from "react";
import image from '../../../media/images/Rectangle 17911.png'
const categories = [
  { name: "For Home", image: image },
  { name: "For Office Use", image: image },
  { name: "Outdoor", image: image },
  { name: "Travel", image: image },
  { name: "Car", image: image },
  { name: "Retail Stores", image: image },
  { name: "Retail Stores", image: image },
  { name: "Retail Stores", image: image },
];

export default function FeatureCatagoriesSection2() {
  return (
    <div className="feature-cat-sec-2-main">
      {categories.map((category, index) => (
        <div
          key={index}
          className="feature-cat-sec-2-wrapper"
          style={{ width: "100px", height: "100px" }}
        >
          <img
            src={category.image}
            alt={category.name}
            className="rounded-full object-cover w-full h-full"
          />
          <p className="text-center text-sm font-medium">{category.name}</p>
        </div>
      ))}
    </div>
  );
}
