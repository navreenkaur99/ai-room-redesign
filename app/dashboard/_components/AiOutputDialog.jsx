"use client";

import React from "react";
import { Button } from "../../../components/ui/button";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";

import ReactBeforeAfterSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

function AiOutputDialog({ openDialog, closeDialog, orgImage, aiImage }) {
  const FIRST_IMAGE = { imageUrl: orgImage || "" };
  const SECOND_IMAGE = { imageUrl: aiImage || "" };

  return (
    <AlertDialog open={openDialog} onOpenChange={closeDialog}>
      <AlertDialogContent className="max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Result</AlertDialogTitle>

          {orgImage && aiImage ? (
            <div className="mt-4">
              <ReactBeforeAfterSliderComponent
                firstImage={FIRST_IMAGE}
                secondImage={SECOND_IMAGE}
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-4">
              Images not available.
            </p>
          )}

          <div className="mt-4 flex justify-end">
            <Button onClick={() => closeDialog(false)}>Close</Button>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AiOutputDialog;

// "use client";

// import React from "react";
// import { Button } from "../../../../components/ui/button";
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "../../../../components/ui/alert-dialog";

// import ReactBeforeAfterSliderComponent from "react-before-after-slider-component";
// import "react-before-after-slider-component/dist/build.css";

// function AiOutputDialog({ openDialog, closeDialog, orgImage, aiImage }) {
//   const FIRST_IMAGE = { imageUrl: orgImage || "" }; // Before
//   const SECOND_IMAGE = { imageUrl: aiImage || "" }; // After

//   return (
//     <AlertDialog open={openDialog} onOpenChange={closeDialog}>
//       <AlertDialogContent className="max-w-3xl">
//         <AlertDialogHeader>
//           <AlertDialogTitle>Result</AlertDialogTitle>

//           {orgImage && aiImage ? (
//             <div className="mt-4">
//               <ReactBeforeAfterSliderComponent
//                 firstImage={FIRST_IMAGE}
//                 secondImage={SECOND_IMAGE}
//               />
//             </div>
//           ) : (
//             <p className="text-sm text-gray-500 mt-4">
//               Images not available yet.
//             </p>
//           )}

//           <div className="mt-4 flex justify-end">
//             <Button onClick={() => closeDialog(false)}>Close</Button>
//           </div>
//         </AlertDialogHeader>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// export default AiOutputDialog;