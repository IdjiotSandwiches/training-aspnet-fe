import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { stnkApi } from "@/functions/apiClient";
import { toast } from "sonner";

export default function TableComponent({ stnkList, setIsOpen, setStnk }) {
  const fetch = async (registrationNumber) => {
    try {
      const stnk = await stnkApi.get(`api/STNK/${registrationNumber}`);
      const item = stnk.data;

      if (item.status != 200 || stnk.status != 200)
        throw new Error(item ?? stnk);

      setStnk(item.data);
      setIsOpen(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

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
                  onClick={() => fetch(stnk.registrationNumber)}
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
