"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../../../components/ui/button";

export default function EmptyState() {
  return (
    <div className="mt-10 border rounded-xl p-8 text-center text-gray-500">
      <h2 className="text-xl font-semibold text-gray-700">
        No Designs Found
      </h2>
      <p className="mt-2 text-sm">
        Create your first AI Room design and it will appear here.
      </p>

      <Link href="/dashboard/create-new">
        <Button className="mt-5">+ Redesign Room</Button>
      </Link>
    </div>
  );
}