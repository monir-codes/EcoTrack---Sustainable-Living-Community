import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-[#1d2327] p-8 rounded-[2.5rem] border border-white/5 animate-pulse w-full">
      {/* Image/Icon Skeleton */}
      <div className="w-14 h-14 bg-white/5 rounded-2xl mb-6"></div>
      
      {/* Title Skeleton */}
      <div className="h-6 bg-white/10 rounded-lg w-3/4 mb-4"></div>
      
      {/* Description Skeleton */}
      <div className="space-y-2 mb-6">
        <div className="h-3 bg-white/5 rounded w-full"></div>
        <div className="h-3 bg-white/5 rounded w-5/6"></div>
      </div>
      
      {/* Bottom Metrics Skeleton */}
      <div className="flex justify-between items-center mt-auto">
        <div className="h-4 bg-white/5 rounded w-20"></div>
        <div className="h-8 bg-white/10 rounded-xl w-24"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;