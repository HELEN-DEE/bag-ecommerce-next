"use client"
import React from "react";

import {motion} from 'framer-motion'
import { PiStarFourFill } from "react-icons/pi";

const CouponBadge = () => {


  return (
    <motion.div 
        className="flex relative justify-center items-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
        <svg className="w-32 h-32">
            <circle cx="64" cy="63" r="57" fill="none" stroke="gray" />
            <path className="" 
                id="curve" 
                d="M 53, 63 m -31, 0 a 34,34 0 1,1 84,0 a 34,34 0 1,1 -84,0"
                fill="none"
                
            ></path>
            <text className="" fill="black" fontSize={10.4} >
                <textPath href="#curve" startOffset="50%" textAnchor="middle">
                • 20% off coupon - Bag20 • 20% off coupon - Bag20 
                </textPath>
            
            </text>
        </svg>
            <div className="absolute text-gray-300 ">
                <PiStarFourFill size={25}/>
            </div>
    </motion.div>
  );
};

export default CouponBadge;
