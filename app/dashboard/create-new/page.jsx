"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useContext } from "react";
import { UserDetailContext } from "../../_context/UserDetailContext"; // ✅ adjust path if needed

import ImageSelection from "./_components/ImageSelection";
import RoomType from "./_components/RoomType";
import DesignType from "./_components/DesignType";
import AdditionalReq from "./_components/AdditionalReq";

import { Button } from "../../../components/ui/button";
import CustomLoading from "./_components/CustomLoading";

// Dialog (Result)
import AiOutputDialog from "../_components/AiOutputDialog";

function CreateNew() {
  const { user } = useUser();
const email = user?.primaryEmailAddress?.emailAddress || "";
const STORAGE_KEY = email ? `room_history_${email}` : "room_history_guest";
  const [generatedImage, setGeneratedImage] = useState(null); // AI (after)
  const [orgImage, setOrgImage] = useState(null); // Original (before preview)
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const [openOutputDialog, setOpenOutputDialog] = useState(false);

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  // cleanup blob preview
  useEffect(() => {
    return () => {
      if (orgImage?.startsWith("blob:")) URL.revokeObjectURL(orgImage);
    };
  }, [orgImage]);

  const uploadToCloudinary = async (file) => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error(
        "Cloudinary env missing: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME / NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET"
      );
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);
    data.append("folder", "room-redesign");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: data }
    );

    const json = await res.json();
    if (!res.ok) throw new Error(json?.error?.message || "Cloudinary upload failed");
    return json.secure_url;
  };
  const GenerateAIImage = async () => {
  try {
    
    if (!formData.image) return alert("Please select an image");
    const creditsLeft = Number(userDetail?.credits || 0);
if (creditsLeft <= 0) return alert("No credits left. Please buy credits.");

    setLoading(true);
    setGeneratedImage(null);

    // 1) Upload original image to Cloudinary
    const rawImageUrl = await uploadToCloudinary(formData.image);

    // 2) Call API (your route)
    const result = await axios.post("/api/redesign-room", {
      imageUrl: rawImageUrl,
      roomType: String(formData?.room || ""),
      designType: String(formData?.designType || ""),
      additionalReq: String(formData?.additionalreq || ""),
    });

    const dataUrl = result.data?.result?.dataUrl;
    if (!dataUrl) throw new Error("No image returned from API");

    // ✅ ✅ ADD THIS BLOCK RIGHT HERE (save for Listing)
    const newItem = {
  id: Date.now(),
  userEmail: email,
  orgImage: rawImageUrl,
  aiImage: dataUrl,
  roomType: String(formData?.room || ""),
  designType: String(formData?.designType || ""),
  createdAt: new Date().toISOString(),
};

const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
localStorage.setItem(STORAGE_KEY, JSON.stringify([newItem, ...prev]));
    // ✅ ✅ END BLOCK
    // ✅ Deduct 1 credit in DB
await axios.post("/api/add-credits", {
  email,
  credits: -1,
});

// ✅ Update context instantly
setUserDetail((prev) => ({
  ...prev,
  credits: Number(prev?.credits || 0) - 1,
}));

    setGeneratedImage(dataUrl);
    setOpenOutputDialog(true);
  } catch (err) {
    console.log(err);
    alert(err?.response?.data?.error || err.message);
  } finally {
    setLoading(false);
  }
};

  // const GenerateAIImage = async () => {
  //   try {
  //     if (!formData.image) return alert("Please select an image");

  //     setLoading(true);
  //     setGeneratedImage(null);

  //     // 1) Upload original image to Cloudinary
  //     const rawImageUrl = await uploadToCloudinary(formData.image);

  //     // 2) Call API (your route)
  //     const result = await axios.post("/api/redesign-room", {
  //       imageUrl: rawImageUrl,
  //       roomType: String(formData?.room || ""),
  //       designType: String(formData?.designType || ""),
  //       additionalReq: String(formData?.additionalreq || ""),
  //     });

  //     const dataUrl = result.data?.result?.dataUrl;
  //     if (!dataUrl) throw new Error("No image returned from API");

  //     setGeneratedImage(dataUrl);
  //     setOpenOutputDialog(true); // ✅ open result dialog
  //   } catch (err) {
  //     console.log(err);
  //     alert(err?.response?.data?.error || err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="p-3 md:p-8">
      <h2 className="font-bold text-3xl md:text-4xl text-primary text-center">
        Experience the Magic of Remodeling with AI
      </h2>

      <p className="text-center text-gray-500 mt-2">
        Transform any room with a click. Select a space, choose the style, and
        watch as AI instantly reimagines your environment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        {/* LEFT SIDE */}
        <div>
          <ImageSelection
            selectedImage={(file) => {
              onHandleInputChange(file, "image");
              // ✅ preview for before/after slider
              setOrgImage(URL.createObjectURL(file));
            }}
          />

          <RoomType
            selectedRoomType={(value) => onHandleInputChange(value, "room")}
          />

          <DesignType
            selectedDesignType={(value) =>
              onHandleInputChange(value, "designType")
            }
          />

          <AdditionalReq
            additionalRequirementInput={(value) =>
              onHandleInputChange(value, "additionalreq")
            }
          />

          <Button
            className="w-full mt-5"
            onClick={GenerateAIImage}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>

          <p className="text-sm text-gray-400 mb-10 mt-2">
            NOTE: Credit will use to redesign your room.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-center justify-start">
          {!loading && generatedImage && (
            <img
              src={generatedImage}
              alt="Redesigned Room"
              className="w-full rounded-lg border"
            />
          )}

          {!loading && !generatedImage && (
            <div className="w-full p-6 border rounded text-center text-gray-400">
              Your redesigned image will appear here.
            </div>
          )}

          {/* Loading popup */}
          <CustomLoading loading={loading} />
        </div>
      </div>

      {/* ✅ Result dialog with Before/After slider */}
      <AiOutputDialog
        openDialog={openOutputDialog}
        closeDialog={setOpenOutputDialog}
        orgImage={orgImage}
        aiImage={generatedImage}
      />
    </div>
  );
}

export default CreateNew;

// "use client";

// import axios from "axios";
// import { useState } from "react";

// import DesignType from "./_components/DesignType";
// import ImageSelection from "./_components/ImageSelection";
// import RoomType from "./_components/RoomType";
// import AdditionalReq from "./_components/AdditionalReq";
// import { Button } from "../../../components/ui/button";
// import CustomLoading from "./_components/CustomLoading";

// function CreateNew() {
  
//   const [generatedImage, setGeneratedImage] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);

//   const onHandleInputChange = (value, fieldName) => {
//     setFormData((prev) => ({ ...prev, [fieldName]: value }));
//   };

//   const uploadToCloudinary = async (file) => {
//     const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//     const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", uploadPreset);
//     data.append("folder", "room-redesign");

//     const res = await fetch(
//       `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//       { method: "POST", body: data }
//     );

//     const json = await res.json();
//     if (!res.ok) {
//       throw new Error(json?.error?.message || "Cloudinary upload failed");
//     }

//     return json.secure_url;
//   };

//   const GenerateAIImage = async () => {
//     try {
//       if (!formData.image) return alert("Please select an image");

//       setLoading(true);
//       setGeneratedImage(null);

//       // 1) Upload original image
//       const rawImageUrl = await uploadToCloudinary(formData.image);

//       // 2) Call API
//       const result = await axios.post("/api/redesign-room", {
//         imageUrl: rawImageUrl,
//         roomType: String(formData?.room || ""),
//         designType: String(formData?.designType || ""),
//         additionalReq: String(formData?.additionalreq || ""),
//       });

//       // ✅ Extract the redesigned image URL
//       const dataUrl = result.data?.result?.dataUrl;
//       if (!dataUrl) throw new Error("No image returned from API");

//       setGeneratedImage(dataUrl);
//     } catch (err) {
//       console.log(err);
//       alert(err?.response?.data?.error || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="font-bold text-4xl text-primary text-center">
//         Experience the Magic of Remodeling with AI
//       </h2>

//       <p className="text-center text-gray-500">
//         Transform any room with a click. Select a space, choose the style, and
//         watch as AI instantly reimagines your environment.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
//         {/* LEFT SIDE */}
//         <div>
//           <ImageSelection
//             selectedImage={(value) => onHandleInputChange(value, "image")}
//           />

//           <RoomType
//             selectedRoomType={(value) => onHandleInputChange(value, "room")}
//           />

//           <DesignType
//             selectedDesignType={(value) =>
//               onHandleInputChange(value, "designType")
//             }
//           />

//           <AdditionalReq
//             additionalRequirementInput={(value) =>
//               onHandleInputChange(value, "additionalreq")
//             }
//           />

//           <Button
//             className="w-full mt-5"
//             onClick={GenerateAIImage}
//             disabled={loading}
//           >
//             {loading ? "Generating..." : "Generate"}
//           </Button>

//           <p className="text-sm text-gray-400 mb-10">
//             NOTE: Credit will use to redesign your room.
//           </p>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex flex-col items-center justify-start">
//           {!loading && generatedImage && (
//             <img
//               src={generatedImage}
//               alt="Redesigned Room"
//               className="w-full rounded-lg border"
//             />
//           )}

//           {!loading && !generatedImage && (
//             <div className="w-full p-6 border rounded text-center text-gray-400">
//               Your redesigned image will appear here.
//             </div>
//           )}

//           {/* ✅ This is the correct usage */}
//           <CustomLoading loading={loading} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateNew;

// "use client";

// import axios from "axios";
// import { useState } from "react";

// import DesignType from "./_components/DesignType";
// import ImageSelection from "./_components/ImageSelection";
// import RoomType from "./_components/RoomType";
// import AdditionalReq from "./_components/AdditionalReq";
// import { Button } from "../../../components/ui/button";
// import CustomLoading from "./_components/CustomLoading";

// function CreateNew() {
//   const [generatedImage, setGeneratedImage] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);

//   const onHandleInputChange = (value, fieldName) => {
//     setFormData((prev) => ({ ...prev, [fieldName]: value }));
//   };

//   const uploadToCloudinary = async (file) => {
//     const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//     const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", uploadPreset);
//     data.append("folder", "room-redesign");

//     const res = await fetch(
//       `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//       { method: "POST", body: data }
//     );

//     const json = await res.json();
//     if (!res.ok) throw new Error(json?.error?.message || "Cloudinary upload failed");

//     return json.secure_url;
//   };

//   const GenerateAIImage = async () => {
//     try {
//       if (!formData.image) return alert("Please select an image");

//       setLoading(true);
//       setGeneratedImage(null);

//       // 1️⃣ Upload original image
//       const rawImageUrl = await uploadToCloudinary(formData.image);

//       // 2️⃣ Call API
//      const result = await axios.post("/api/redesign-room", {
//   imageUrl: rawImageUrl,
//   roomType: String(formData?.room || ""),
//   designType: String(formData?.designType || ""),
//   additionalReq: String(formData?.additionalreq || ""),
// });

//       // ✅ extract URL only
//     const dataUrl = result.data?.result?.dataUrl;

// if (!dataUrl) {
//   throw new Error("No image returned from API");
// }

// setGeneratedImage(dataUrl);

//       // const imageUrl = result.data?.result?.url;
//       // if (!imageUrl) throw new Error("No image URL returned");

//       setGeneratedImage(imageUrl);
//     } catch (err) {
//       console.log(err);
//       alert(err?.response?.data?.error || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="font-bold text-4xl text-primary text-center">
//         Experience the Magic of Remodeling with AI
//       </h2>

//       <p className="text-center text-gray-500">
//         Transform any room with a click. Select a space, choose the style, and
//         watch as AI instantly reimagines your environment.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
//         {/* LEFT SIDE */}
//         <div>
//           <ImageSelection selectedImage={(value) => onHandleInputChange(value, "image")} />

//           <RoomType selectedRoomType={(value) => onHandleInputChange(value, "room")} />

//           <DesignType selectedDesignType={(value) => onHandleInputChange(value, "designType")} />

//           <AdditionalReq
//             additionalRequirementInput={(value) => onHandleInputChange(value, "additionalreq")}
//           />

//           <Button className="w-full mt-5" onClick={GenerateAIImage} disabled={loading}>
//             {loading ? "Generating..." : "Generate"}
//           </Button>

//           <p className="text-sm text-gray-400 mb-10">
//             NOTE: Credit will use to redesign your room.
//           </p>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex flex-col items-center justify-start">
//           {loading && (
//             <div className="w-full p-4 border rounded text-center text-gray-500">
//               Generating AI Design... Please wait.
//             </div>
//           )}

//           {!loading && generatedImage && (
//             <img
//               src={generatedImage}
//               alt="Redesigned Room"
//               className="w-full rounded-lg border"
//             />
//           )}

//           {/* {!loading && !generatedImage && (
//             <div className="w-full p-6 border rounded text-center text-gray-400">
//               Your redesigned image will appear here.
//             </div>
//           )} */}
//           <CustomLoading loading={true} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateNew;


// "use client";
// import axios from "axios";


// import DesignType from "./_components/DesignType";
// import ImageSelection from "./_components/ImageSelection";
// import RoomType from "./_components/RoomType";
// import { useState } from "react";
// import AdditionalReq from "./_components/AdditionalReq";
// import { Button } from "../../../components/ui/button";

// function CreateNew() {
//   const [formData, setFormData] = useState({});

//   const onHandleInputChange = (value, fieldName) => {
//     setFormData((prev) => ({
//       ...prev,
//       [fieldName]: value,
//     }));
//     // console.log(formData);
//     setFormData((prev) => {
//   const updated = { ...prev, [fieldName]: value };
//   console.log(updated);
//   return updated;
// });

//   };
  
// const uploadToCloudinary = async (file) => {
//   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//   const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

//   if (!cloudName || !uploadPreset) {
//     throw new Error("Missing Cloudinary env: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME / NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET");
//   }

//   const data = new FormData();
//   data.append("file", file);
//   data.append("upload_preset", uploadPreset);
//   data.append("folder", "room-redesign"); // optional

//   const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//     method: "POST",
//     body: data,
//   });

//   const json = await res.json();
//   if (!res.ok) throw new Error(json?.error?.message || "Cloudinary upload failed");

//   return json.secure_url;
// };

// const GenerateAIImage = async () => {
//   try {
//     if (!formData.image) return alert("Please select an image");

//     // 1️⃣ Upload to Cloudinary
//     const rawImageUrl = await uploadToCloudinary(formData.image);
//     console.log("Raw Image URL:", rawImageUrl);

//     // 2️⃣ Send clean data to API
//     const result = await axios.post("/api/redesign-room", {
//       imageUrl: rawImageUrl,
//       roomType: formData?.room,
//       designType: formData?.designType,
//       additionalReq: formData?.additionalreq,
//     });

//     console.log("API result:", result.data);
//   } catch (err) {
//     console.log(err);
//     alert(err.message || "Something went wrong");
//   }
// };

//   return (
//     <div>
//       <h2 className="font-bold text-4xl text-primary text-center">
//      Experience the Magic of Remodeling with AI

//       </h2>

//       <p className="text-center text-gray-500">
//         Transform any room with a click. Select a space, choose the style, and watch as AI instantly reimagines your environment.
//     </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 
//       mt-10 gap-10">
        
//         {/* Image Selection */}
//         <ImageSelection
//           selectedImage={(value) =>
//             onHandleInputChange(value, "image")
//           }
//         />

//         {/* Form Section */}
//         <div>
//           <RoomType
//             selectedRoomType={(value) =>
//               onHandleInputChange(value, "room")
//             }
//           />

//           {/* Future fields can go here */}
//           {/* Design Type */}
//           <DesignType selectedDesignType={(value)=> onHandleInputChange(value,'designType')}/>
//           {/* Additional Requirement */}
//           <AdditionalReq additionalRequirementInput={(value)=> onHandleInputChange(value,'additionalreq')}/>
//          {/* <Button className="w-full mt-5">Generate</Button> */}
//          <Button className="w-full mt-5" onClick={GenerateAIImage}>
//   Generate
// </Button>

//          <p className="text-sm text-gray-400 mb-52">NOTE:Credit will use to redesign your room.</p> 

//           {/* Generate Button */}
//         </div>
//       </div>

//       {/* Debug */}
//       {/* <pre className="mt-10 bg-gray-100 p-4 rounded">
//         {JSON.stringify(formData, null, 2)}
//       </pre> */}
//     </div>
//   );
// }

// export default CreateNew;