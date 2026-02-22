"use client";   

import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { Button } from "../../../components/ui/button";
import { UserDetailContext } from "../../_context/UserDetailContext";

function Header() {
  const { userDetail } = useContext(UserDetailContext);

  return (
    <div className="p-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md flex justify-between items-center rounded-b-2xl">
      
      {/* Left section */}
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" width={40} height={40} alt="Logo" />
        <h2 className="font-bold text-xl tracking-wide">
          AI ROOM DESIGN
        </h2>
      </div>

      {/* Buy Credits Button */}
      <Link href="/dashboard/buy-credits">
        <Button className="bg-white text-indigo-600 font-semibold rounded-full px-6 hover:bg-indigo-100 transition-all duration-300 shadow-md">
          💳 Buy More Credits
        </Button>
      </Link>

      {/* Right section */}
      <div className="flex gap-7 items-center">
        
        {/* Credit Badge */}
        <div className="flex gap-2 items-center bg-yellow-400 text-black px-4 py-1 rounded-full shadow-md">
          <Image src="/star.png" width={20} height={20} alt="Star" />
          <h2 className="font-semibold">
            {userDetail?.credits ?? 0}
          </h2>
        </div>

        <UserButton />
      </div>
    </div>
  );
}

export default Header;

// "use client";   

// import React, { useContext } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { UserButton } from "@clerk/nextjs";

// import { Button } from "../../../components/ui/button";
// import { UserDetailContext } from "../../_context/UserDetailContext";

// function Header() {
//   const { userDetail, setUserDetail } = useContext(UserDetailContext);
//   console.log(userDetail);

//   return (
//     <div className="p-5 shadow-sm flex justify-between items-center">
      
//       {/* Left section */}
//       <div className="flex items-center gap-2">
//         <Image src="/logo.svg" width={40} height={40} alt="Logo" />
//         <h2 className="font-bold text-lg">AI ROOM DESIGN</h2>
//       </div>

//       {/* Buy Credits Button with Link */}
//       <Link href="/dashboard/buy-credits">
//         <Button variant="ghost" className="rounded-full text-primary">
//           Buy more Credit
//         </Button>
//       </Link>

//       {/* Right section */}
//       <div className="flex gap-7 items-center">
//         <div className="flex gap-2 p-1 items-center bg-slate-200 px-3 rounded-full">
//           <Image src="/star.png" width={20} height={20} alt="Star" />
//           <h2>{userDetail?.credits ?? 0}</h2>
//         </div>
//         <UserButton />
//       </div>
//     </div>
//   );
// }

// export default Header;

// "use client";   

// import React, { useContext } from "react";
// import Image from "next/image";
// import { UserButton } from "@clerk/nextjs";

// import { Button } from "../../../components/ui/button";
// import { UserDetailContext } from "../../_context/UserDetailContext";

// function Header() {
//   const{userDetail,setUserDetail} = useContext(UserDetailContext);
//   console.log(userDetail);

//   return (
//     <div className="p-5 shadow-sm flex justify-between items-center">
//       {/* Left section */}
//       <div className="flex items-center gap-2">
//         <Image src="/logo.svg" width={40} height={40} alt="Logo" />
//         <h2 className="font-bold text-lg">AI ROOM DESIGN</h2>
//       </div>
//       <Button variant="ghost" className="rounded-full text-primary">Buy more Credit</Button>

//       {/* Right section */}
//       <div className="flex gap-7 items-center ">
//         <div className="flex gap-2 p-1 items-center bg-slate-200 px-3 rounded-full">
//         <Image src="/star.png" width={20} height={20} alt="Star" />
//         {/* <h2>{userDetail?.credits}</h2> */}
//         <h2>{userDetail?.credits ?? 0}</h2>

//         </div>
//         <UserButton />
//       </div>
//     </div>
//   );
// }

// export default Header;
