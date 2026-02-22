import React from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../../../../components/ui/alert-dialog";

function CustomLoading({ loading }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        {/* ✅ Required for accessibility */}
        <AlertDialogTitle className="sr-only">
          Generating redesigned room image
        </AlertDialogTitle>
        <AlertDialogDescription className="sr-only">
          Please wait while AI redesigns your room. Do not close this window.
        </AlertDialogDescription>

        <div className="bg-white flex flex-col items-center my-10 justify-center">
          <Image src="/loading.gif" width={200} height={200} alt="Loading" />
          <h2 className="mt-3 text-center">
            Redesigning your room... do not close this window.
          </h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;