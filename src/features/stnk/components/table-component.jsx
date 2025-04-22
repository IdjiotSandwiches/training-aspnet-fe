import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UseStnk } from "../context/stnk-context";
import { fetchAllStnk } from "../api/apiClient";

function TableBodyItems({ stnkList }) {
  const { openDialog, setRegistrationNumber } = UseStnk();

  const triggerDialog = (registrationNumber) => {
    openDialog();
    setRegistrationNumber(registrationNumber);
  }

  return (
    <>
      {stnkList.map((stnk, idx) => {
        return (
          <TableRow key={idx}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell>
              <span
                onClick={() => triggerDialog(stnk.registrationNumber)}
                className="hover:underline hover:cursor-pointer"
              >
                {stnk.registrationNumber}
              </span>
            </TableCell>
            <TableCell>{stnk.carName}</TableCell>
            <TableCell className="text-right">{stnk.lastTaxPrice}</TableCell>
          </TableRow>
        );
      })}
    </>
  );
}

function TableComponent() {
  const { refreshKey } = UseStnk();
  const [stnkList, setStnkList] = React.useState([]);

  const fetch = async () => {
    const data = await fetchAllStnk();
    if (data) setStnkList(data);
  };

  React.useEffect(() => {
    fetch();
  }, [refreshKey]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Registration Number</TableHead>
          <TableHead>Car Name</TableHead>
          <TableHead className="text-right">Last Tax Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableBodyItems stnkList={stnkList} />
      </TableBody>
    </Table>
  );
}

export { TableComponent };
