import React from "react";

const CouponBadge = () => {


  return (
    <div className="">
        <svg className="w-32 h-32">
            <path className="" 
                id="curve" 
                d="M 50, 62 m -35, 0 a 45,45 0 1,1 100,0 a 45,45 0 1,1 -100,0"
                fill="none"
                stroke="gray" 
                strokeWidth={1}
            ></path>
            <text className=" text-[13px] fill-black">
                <textPath href="#curve" textAnchor="middle" startOffset="50%">
                    • 20% Off Coupon - Bag20 
                    • 20% Off Coupon - Bag20 
                </textPath>
            </text>
        </svg>
    </div>
  );
};

export default CouponBadge;
