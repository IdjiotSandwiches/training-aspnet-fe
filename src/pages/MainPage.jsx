import React from "react";
import { Dialog } from "@/components/ui/dialog";
import { TableComponent } from "@/features/stnk/components/table-component";
import { DialogComponent } from "@/features/stnk/components/dialog-component";
import { StnkProvider, UseStnk } from "@/features/stnk/context/stnk-context";

function View() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { isOpen, setIsOpen } = UseStnk();
  // const [stnk, setStnk] = React.useState({
  //   carName: "",
  //   carPrice: 0,
  //   carType: 0,
  //   engineSize: 0,
  //   lastTaxPrice: 0,
  //   ownerNIK: "",
  //   ownerName: "",
  //   registrationNumber: "",
  // });

  // React.useEffect(() => {
  //   fetchAllStnk(setStnkList);
  //   setIsLoading(false);
  // }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
