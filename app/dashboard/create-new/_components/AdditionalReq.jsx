"use client";

import React from "react";
import { Textarea } from "../../../../components/ui/textarea";

function AdditionalReq({ additionalRequirementInput }) {
  return (
    <div className="mt-5">
      <label className="text-gray-400">Enter Additional Requirements</label>

      <Textarea
        className="mt-2"
        placeholder="e.g. warm lighting, wooden flooring, minimal decor..."
        onChange={(e) => additionalRequirementInput?.(e.target.value)}
      />
    </div>
  );
}

export default AdditionalReq;

// import React from 'react'
// import { Textarea } from '../../../../components/ui/textarea'

// function AdditionalReq(additionalRequirementInput) {
//   return (
//     <div>
//       <label className="text-gray-400">Enter Additional Requirements</label>
//       <Textarea className='mt-2' onChange={(e)=>additionalRequirementInput(e.target.value)}/></div>
//   )
// }

// export default AdditionalReq