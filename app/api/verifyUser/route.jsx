import db from "../../../config/db.js";
import { UsersTable } from "../../../config/schema.js";



// import db from "@/config/db";
// import  {UsersTable}  from "@/config/schema";

import { eq } from "drizzle-orm";   
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { user } = await req.json();

    const userInfo = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.email, user?.primaryEmailAddress?.emailAddress));

    console.log("user", userInfo);
    if(userInfo?.length===0){
        const Saveresult = await db.insert(UsersTable).values({
            name: user?.fullName ,
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
        }).returning({ UsersTable});
       

    
    return NextResponse.json({ "result:": Saveresult.UsersTable });
    }


    return NextResponse.json({ result: userInfo[0] });
  } 
  catch (err) {
    return NextResponse.json({ error:err });

    
  }
  
}
