import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchStnk } from "./call-api";

export default function TableComponent({ stnkList, setIsOpen, setStnk }) {
  const handleFetch = (registrationNumber) => fetchStnk(registrationNumber, setIsOpen, setStnk);

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
        {stnkList.map((stnk, idx) => {
          return (
            <TableRow key={idx}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell>
                <span
                  onClick={() => handleFetch(stnk.registrationNumber)}
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
      </TableBody>
    </Table>
  );
}
