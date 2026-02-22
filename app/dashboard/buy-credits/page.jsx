"use client";

import React, { useState } from "react";
import { Button } from "../../../components/ui/button";

function BuyCredits() {
  const creditsOption = [
    { credits: 5, amount: 100 },
    { credits: 10, amount: 170 },
    { credits: 25, amount: 220 },
    { credits: 50, amount: 350, popular: true },
    { credits: 100, amount: 500 },
    { credits: 200, amount: 900 },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!selectedOption) return alert("Please select a plan");

    const res = await loadRazorpay();
    if (!res) return alert("Razorpay failed to load");

    const orderRes = await fetch("/api/create-order", {
      method: "POST",
      body: JSON.stringify({ amount: selectedOption.amount }),
    });

    const order = await orderRes.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "AI Room Design",
      description: `${selectedOption.credits} Credits`,
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful ✅");
        console.log(response);
      },
      theme: {
        color: "#6366f1",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">

      <div className="text-center">
        <h2 className="font-bold text-3xl text-indigo-700">
          Buy More Credits
        </h2>
        <p className="text-gray-600 mt-2">
          Unlock endless possibilities — transform your room designs instantly.
        </p>
      </div>

      {/* Credit Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {creditsOption.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedOption(item)}
            className={`relative flex flex-col gap-3 justify-center items-center p-6 rounded-2xl cursor-pointer transition-all duration-300
              bg-white shadow-md hover:shadow-xl hover:scale-105
              ${
                selectedOption?.credits === item.credits
                  ? "border-2 border-indigo-600 bg-indigo-50"
                  : "border border-gray-200"
              }`}
          >
           

            <h2 className="font-bold text-4xl text-indigo-600">
              {item.credits}
            </h2>
            <h2 className="font-medium text-gray-700">Credits</h2>

            <Button
              className={`w-full mt-3 rounded-full font-semibold transition-all
                ${
                  selectedOption?.credits === item.credits
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-100 text-gray-800 hover:bg-indigo-100"
                }`}
            >
              ₹ {item.amount}
            </Button>
          </div>
        ))}
      </div>

      {/* Selected Preview + Pay Button */}
      {selectedOption && (
        <div className="mt-10 max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg text-center border border-indigo-200">
          <h3 className="text-2xl font-bold text-indigo-600">
            {selectedOption.credits} Credits
          </h3>
          <p className="mt-2 text-gray-600">
            Total: <span className="font-bold text-indigo-700">
              ₹ {selectedOption.amount}
            </span>
          </p>

          <Button
            onClick={handlePayment}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
          >
            💳 Pay Now
          </Button>
        </div>
      )}
    </div>
  );
}

export default BuyCredits;

// "use client";

// import React, { useState } from "react";
// import { Button } from "../../../components/ui/button";

// function BuyCredits() {
//   const creditsOption = [
//     { credits: 5, amount: 100 },
//     { credits: 10, amount: 170 },
//     { credits: 25, amount: 220 },
//     { credits: 50, amount: 350 },
//     { credits: 100, amount: 500 },
//     { credits: 200, amount: 900 },
//   ];

//   const [selectedOption, setSelectedOption] = useState(null);

//   return (
//     <div className="p-6">
//       <h2 className="font-bold text-2xl">Buy More Credits</h2>
//       <p className="text-gray-600 mt-1">
//         Unlock endless possibilities — buy more credits and transform your rooms.
//       </p>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
//         {creditsOption.map((item, index) => (
//           <div
//             key={index}
//             className={`flex flex-col gap-2 justify-center items-center p-6 border rounded-xl cursor-pointer hover:shadow-md transition-all
//               ${
//                 selectedOption?.credits === item.credits
//                   ? "border-primary border-2"
//                   : ""
//               }`}
//           >
//             <h2 className="font-bold text-3xl">{item.credits}</h2>
//             <h2 className="font-medium text-xl">Credits</h2>

//             <Button
//               className="w-full mt-2"
//               onClick={() => setSelectedOption(item)}
//               variant={selectedOption?.credits === item.credits ? "default" : "outline"}
//             >
//              ₹ {item.amount}
//             </Button>
//           </div>
//         ))}
//       </div>

//       {/* Selected Option Preview */}
//       {selectedOption && (
//         <div className="mt-6 p-4 border rounded-xl">
//           <p className="font-medium">
//             Selected: <span className="font-bold">{selectedOption.credits}</span>{" "}
//             credits for <span className="font-bold">${selectedOption.amount}</span>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BuyCredits;