import React from "react";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";

const StarRating = ({ rating = 0 }) => (
  <span className="flex items-center">
    {[1,2,3,4,5].map(i =>
      i <= Math.round(rating) ? (
        <SolidStar key={i} className="w-5 h-5 text-yellow-400" />
      ) : (
        <OutlineStar key={i} className="w-5 h-5 text-gray-300" />
      )
    )}
  </span>
);

export default StarRating;
