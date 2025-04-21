import React from "react";
import { toast } from "sonner";
import { stnkApi } from "@/functions/apiClient";
import { Dialog } from "@/components/ui/dialog";
import DialogComponent from "@/components/dialog-component";
import TableComponent from "@/components/table-component";

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

  const fetch = async () => {
    try {
      const stnkList = await stnkApi.get(`/api/STNK/all-stnk`);
      const items = stnkList.data;

      if (items.status != 200 || stnkList.status != 200)
        throw new Error(items ?? stnkList);

      setStnkList(items.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    fetch();
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
