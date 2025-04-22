import React from "react";
import { Dialog } from "@/components/ui/dialog";
import { TableComponent } from "@/features/stnk/components/table-component";
import { DialogComponent } from "@/features/stnk/components/dialog-component";
import { StnkProvider, UseStnk } from "@/features/stnk/context/stnk-context";
import { Button } from "@/components/ui/button";

function View() {
  const { isOpen, setIsOpen, openDialog, setRegistrationNumber } = UseStnk();

  const insert = () => {
    openDialog();
    setRegistrationNumber("");
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button onClick={insert}>Insert</Button>
        <TableComponent />
        <DialogComponent />
      </Dialog>
    </>
  );
}

export default function MainPage() {
  return (
    <StnkProvider>
      <View />
    </StnkProvider>
  );
}
