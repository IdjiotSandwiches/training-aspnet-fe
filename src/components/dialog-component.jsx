import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import FormComponent from "./form-component";

export default function DialogComponent({ stnk, isOpen }) {
  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        {stnk.registrationNumber == "" ? (
          <>
            <DialogTitle>Insert STNK</DialogTitle>
            <DialogDescription>
              Insert required field to create STNK. Click save when you're done.
            </DialogDescription>
          </>
        ) : (
          <>
            <DialogTitle>Update STNK</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </>
        )}
      </DialogHeader>
      <FormComponent stnk={stnk} isOpen={isOpen} />
    </DialogContent>
  );
}
