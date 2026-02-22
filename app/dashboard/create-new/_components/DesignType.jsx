"use client";

import Image from "next/image";
import React, { useState } from "react";

function DesignType({ selectedDesignType }) {
  const Designs = [
    { name: "Modern", image: "/Modern.jfif" },
    { name: "Industrial", image: "/Industrial.jfif" },
    { name: "Bohemian", image: "/Bohemian.jfif" },
    { name: "Traditional", image: "/Traditional.jfif" },
    { name: "Minimalist", image: "/Minimalist.jfif" },
    { name: "Rustic", image: "/Rustic.jfif" },
  ];

  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="mt-5">
      <label className="text-gray-500">Select Interior Design Type</label>

      <div className="grid grid-cols-2 mt-3 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Designs.map((design, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(design.name);
              selectedDesignType(design.name);
            }}


          >
            <Image
  src={design.image}
  width={100}
  height={100}
  alt={design.name}
  className="h-[70px] rounded-md transition-all cursor-pointer hover:scale-105 hover:border-2 hover:border-primary hover:p-1"
/>

            <h2 className="text-center text-sm mt-2">{design.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesignType;
