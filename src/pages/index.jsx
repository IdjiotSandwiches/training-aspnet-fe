import React from "react";
import { Dialog } from "@/components/ui/dialog";
import DialogComponent from "@/components/dialog-component";
import TableComponent from "@/components/table-component";
import { fetchAllStnk } from "@/components/call-api";

export default function MainPage() {
  const [stnkList, setStnkList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const [stnk, setStnk] = React.useState({
    carName: "",
    carPrice: 0,
    carType: 0,
    engineSize: 0,
    lastTaxPrice: 0,
    ownerNIK: "",
    ownerName: "",
    registrationNumber: "",
  });

  React.useEffect(() => {
    fetchAllStnk(setStnkList);
    setIsLoading(false);
  }, []);

  return (
    <>
      {stnkList.length < 1 ? (
        <div className="text-center">STNK List Empty</div>
      ) : (
        <>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <TableComponent
              stnkList={stnkList}
              setIsOpen={setIsOpen}
              setStnk={setStnk}
            />
            <DialogComponent
              isOpen={isOpen}
              stnk={stnk}
            />
          </Dialog>
        </>
      )}
    </>
  );
}
