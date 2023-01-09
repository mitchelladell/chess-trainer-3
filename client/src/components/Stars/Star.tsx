import React from "react";

const Stars = ({ percent }: any) => {
  const filledStars = Math.floor(percent / 20); // Calculate the number of filled stars
  const halfStars = (percent / 20) % 1; // Calculate the number of half stars
  const emptyStars = 5 - filledStars - Math.ceil(halfStars); // Calculate the number of empty stars

  return (
    <div>
      {/* Render the filled stars */}
      {Array.from({ length: filledStars }, (_, i) => (
        <i
          className="fa fa-star"
          key={i}
          style={{ fontSize: "35px", color: "gold" }}
        ></i>
      ))}

      {/* Render the half stars */}
      {Array.from({ length: Math.ceil(halfStars) }, (_, i) => (
        <span key={i} role="img" aria-label="half star">
          <i
            className="fa fa-star-half-full"
            key={i}
            style={{ fontSize: "35px", color: "gold" }}
          ></i>
        </span>
      ))}

      {/* Render the empty stars */}
    </div>
  );
};

export default Stars;
