"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import EmptyState from "./EmptyState";
import RoomDesignCard from "./RoomDesignCard";

import { useUser } from "@clerk/nextjs"; // ✅ correct

function Listing() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);

  const email = user?.primaryEmailAddress?.emailAddress || "";
  const STORAGE_KEY = email ? `room_history_${email}` : "room_history_guest";

  useEffect(() => {
    if (!user) return; // wait for user
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setUserRoomList(Array.isArray(data) ? data : []);
  }, [user, STORAGE_KEY]);

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl md:text-3xl">
          Hello, {user?.fullName || "User"}
        </h2>

        <Link href="/dashboard/create-new">
          <Button>+ Redesign Room</Button>
        </Link>
      </div>

      {userRoomList.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-10">
          <h2 className="font-medium text-primary text-xl mb-6">
            AI Room Designs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRoomList.map((room) => (
              <RoomDesignCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Listing;

// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { Button } from "../../../components/ui/button";

// import EmptyState from "./EmptyState";
// import RoomDesignCard from "./RoomDesignCard";

// function Listing() {
//   const [userRoomList, setUserRoomList] = useState([]);

//   useEffect(() => {
//     // Load localStorage history
//     const data = JSON.parse(localStorage.getItem("room_history") || "[]");
//     setUserRoomList(Array.isArray(data) ? data : []);
//   }, []);

//   return (
//     <div className="p-4 md:p-8">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="font-bold text-2xl md:text-3xl">Dashboard</h2>

//         <Link href="/dashboard/create-new">
//           <Button>+ Redesign Room</Button>
//         </Link>
//       </div>

//       {/* Content */}
//       {userRoomList.length === 0 ? (
//         <EmptyState />
//       ) : (
//         <div className="mt-10">
//           <h2 className="font-medium text-primary text-xl mb-6">
//             AI Room Designs
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {userRoomList.map((room) => (
//               <RoomDesignCard key={room.id} room={room} />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Listing;
// 'use client'

// import React, { useState } from 'react'
// import { useUser } from '@clerk/nextjs';
// import { Button } from '../../../components/ui/button';
// import EmptyState from './EmptyState';
// import Link from "next/link";   


// function Listing() {
//     const { user}= useUser();
//     const [userRoomList,setUserRoomList]=useState([]); //dummy data
//   return (
//     <div>
//         <div className='flex justify-between items-center '>
//         <h2 className='font-bold text-3xl'>Hello , {user?.fullName}</h2>
//         <Link href="/dashboard/create-new">
//         <Button >+ Redesign Room</Button>
//         </Link>
//         </div>
//         {userRoomList?.length===0?
//         <EmptyState/>
        
//         :
//         <div>
//             </div>}
        
//         </div>
//   )
// }

// export default Listing