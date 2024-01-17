import React from "react";

function LandingCard() {
  return (
    <div>
      <div className="max-w-md mx-auto mt-8 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 rounded-md overflow-hidden shadow-lg">
        <div className="relative">
          <div className="absolute inset-0 backdrop-blur-md"></div>

          <div className="relative z-10 p-6">
            <h3 className="text-black text-2xl font-semibold">
              Glass Card Title
            </h3>
            <p className="text-black mt-2">
              This is some glass card content. Lorem ipsum dolor sit amet...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingCard;
