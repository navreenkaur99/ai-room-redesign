"use client";

import React, { useState } from "react";
import ReactBeforeAfterSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

import AiOutputDialog from "./AiOutputDialog";

function RoomDesignCard({ room }) {
  const [openDialog, setOpenDialog] = useState(false);

  const FIRST_IMAGE = { imageUrl: room?.orgImage || "" };
  const SECOND_IMAGE = { imageUrl: room?.aiImage || "" };

  return (
    <>
      <div
        className="shadow-md rounded-md cursor-pointer overflow-hidden border bg-white hover:shadow-lg transition"
        onClick={() => setOpenDialog(true)}
      >
        <ReactBeforeAfterSliderComponent
          firstImage={FIRST_IMAGE}
          secondImage={SECOND_IMAGE}
        />

        <div className="p-4">
          <h2 className="text-sm font-medium">
            🏠 Room Type:{" "}
            <span className="text-gray-600">{room?.roomType || "N/A"}</span>
          </h2>

          <h2 className="text-sm font-medium mt-1">
            🎨 Design Type:{" "}
            <span className="text-gray-600">{room?.designType || "N/A"}</span>
          </h2>
        </div>
      </div>

      <AiOutputDialog
        openDialog={openDialog}
        closeDialog={setOpenDialog}
        orgImage={room?.orgImage}
        aiImage={room?.aiImage}
      />
    </>
  );
}

export default RoomDesignCard;