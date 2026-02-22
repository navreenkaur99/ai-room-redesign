import { NextResponse } from "next/server";
import { Client, handle_file } from "@gradio/client";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { imageUrl, roomType, designType, additionalReq } = await req.json();

    const client = await Client.connect("diffusers/unofficial-SDXL-Turbo-i2i-t2i");

    const initImage = imageUrl ? handle_file(imageUrl) : null;

    const style = designType || "modern";
    const room = roomType || "room";
    const extra = additionalReq || "";

    const seed = Math.floor(Math.random() * 1000000000);

    const prompt = `
INTERIOR REDESIGN of the SAME ROOM.
Keep layout and camera angle.
Apply STRICT ${style} interior design style to a ${room}.
Replace furniture, lighting, decor and materials completely.
High-end photorealistic interior magazine quality.
${extra}
`;

    const result = await client.predict("/predict", [
      initImage,
      prompt,
      0.9, // strength
      7,   // steps
      seed,
    ]);

    const out = result?.data?.[0];
    const fileUrl = typeof out === "string" ? out : (out?.url || out?.path);

    if (!fileUrl) {
      return NextResponse.json(
        { error: "No image returned", debug: result },
        { status: 500 }
      );
    }

    // Download image server-side and return base64 dataUrl
    const imgRes = await fetch(fileUrl);
    if (!imgRes.ok) {
      return NextResponse.json(
        { error: `Failed to fetch generated image: ${imgRes.status}` },
        { status: 500 }
      );
    }

    const contentType = imgRes.headers.get("content-type") || "image/webp";
    const arrayBuffer = await imgRes.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const dataUrl = `data:${contentType};base64,${base64}`;

    return NextResponse.json({ result: { dataUrl } });
  } catch (e) {
    return NextResponse.json(
      { error: String(e?.message || e) },
      { status: 500 }
    );
  }
}


// import { NextResponse } from "next/server";
// import { Client, handle_file } from "@gradio/client";

// export const runtime = "nodejs";

// export async function POST(req) {
//   try {
//     const { imageUrl, roomType, designType, additionalReq } = await req.json();

// const client = await Client.connect(
//   "diffusers/unofficial-SDXL-Turbo-i2i-t2i"
// );

// // ✅ Define initImage FIRST
// const initImage = imageUrl ? handle_file(imageUrl) : null;

// const style = designType || "modern";
// const room = roomType || "room";
// const extra = additionalReq || "";

// const seed = Math.floor(Math.random() * 1000000000);

// const prompt = `
// INTERIOR REDESIGN of the SAME ROOM.
// Keep layout and camera angle.
// Apply STRICT ${style} interior design style to a ${room}.
// Replace furniture, lighting, decor and materials completely.
// High-end photorealistic interior magazine quality.
// ${extra}
// `;

// const result = await client.predict("/predict", [
//   initImage,
//   prompt,
//   0.9,   // strength
//   7,     // steps
//   seed
// ]);

//     const out = result?.data?.[0];
//     const fileUrl = typeof out === "string" ? out : (out?.url || out?.path);

//     if (!fileUrl) {
//       return NextResponse.json({ error: "No image returned", debug: result }, { status: 500 });
//     }

//     // ✅ Download the image server-side (avoids browser 403)
//     const imgRes = await fetch(fileUrl);
//     if (!imgRes.ok) {
//       return NextResponse.json(
//         { error: `Failed to fetch generated image: ${imgRes.status}` },
//         { status: 500 }
//       );
//     }

//     const contentType = imgRes.headers.get("content-type") || "image/webp";
//     const arrayBuffer = await imgRes.arrayBuffer();
//     const base64 = Buffer.from(arrayBuffer).toString("base64");
//     const dataUrl = `data:${contentType};base64,${base64}`;

//     // return base64 that <img> can display
//     return NextResponse.json({ result: { dataUrl } });
//   } catch (e) {
//     return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import { Client } from "@gradio/client";

// export async function POST(req) {
//   try {
//     const { roomType, designType, additionalReq } = await req.json();

//     // Connect to your Hugging Face Space
//     const client = await Client.connect("navreen-ai/my-room-ai");

//     const result = await client.predict("/generate", {
//       roomType: roomType || "Bedroom",
//       designType: designType || "Modern",
//       additionalReq: additionalReq || ""
//     });

//     return NextResponse.json({
//       result: result.data[0]   // image URL
//     });

//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }



