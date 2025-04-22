import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import { FormComponent } from "./form-component";
import { UseStnk } from "../context/stnk-context";

function DialogComponent() {
  const { registrationNumber } = UseStnk();

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        {registrationNumber == "" ? (
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
      <FormComponent />
    </DialogContent>
  );
}

export { DialogComponent };
