// import { SignIn, UserButton } from '@clerk/nextjs'
'use client'

import { SignIn, UserButton } from '@clerk/nextjs'

export default function Page() {
  return (
  <div className='flex justify-center items-center h-screen'>
   
     <SignIn />
    <UserButton />
    </div>
)}


// import { SignIn, UserButton } from '@clerk/nextjs'

// export default function Page() {
//   return (
//   <div className='flex justify-center items-center h-screen'>
//     <UserButton />
//     <SignIn redirectUrl="/dashboard" />
//     {/* <SignIn /> */}
//     </div>
// )}
