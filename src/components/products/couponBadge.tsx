import React from "react";

const CouponBadge = () => {
  const text = "* 20% Off Coupon - Bag20 * 20% Off Coupon - Bag20 *"; // Circular text
  const chars = text.split(""); // Split text into individual characters

  return (
    <div className="relative w-[120px] h-[120px] flex items-center justify-center">
      {/* Outer Circle */}
      <div className="absolute w-full h-full border border-gray-500 rounded-full"></div>

      {/* Circular Text */}
      {chars.map((char, index) => {
        const angle = (360 / chars.length) * index; // Calculate rotation angle
        return (
          <span
            key={index}
            className="absolute text-[10px] text-gray-700 font-semibold"
            style={{
              transform: `rotate(${angle}deg) translate(55px) rotate(-${angle}deg)`,
            }}
          >
            {char}
          </span>
        );
      })}

      {/* Center Icon (Star Shape) */}
      <div className="absolute text-gray-700 text-xl">✦</div>
    </div>
  );
};

export default CouponBadge;
