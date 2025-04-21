import React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { stnkApi } from "@/functions/apiClient";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

export default function DialogComponent({ stnk, isOpen }) {
  const [carType, setCarType] = React.useState([]);
  const [engineSize, setEngineSize] = React.useState([]);

  const fetch = async () => {
    try {
      const init = await stnkApi.get(`api/STNK/init`);
      const item = init.data;

      if (item.status != 200 || init.status != 200)
        throw new Error(item ?? init);

      setCarType(item.data.carType);
      setEngineSize(item.data.engineSize);
    } catch (error) {
      toast.error(error.message);
    }
  };

  React.useEffect(() => {
    if (isOpen) fetch();
  }, [isOpen]);

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
      <div className="grid gap-4 py-4">
        <div>
          <Label htmlFor="registrationNumber" className="text-right">
            Registration Number
          </Label>
          <Input
            id="registrationNumber"
            value={stnk.registrationNumber}
            className="mt-2"
            disabled
          />
        </div>
        <div className="grid sm:grid-cols-12 gap-4">
          <div className="sm:col-span-5">
            <Label htmlFor="ownerName" className="text-right">
              Owner Name
            </Label>
            <Input
              id="ownerName"
              value={stnk.ownerName}
              className="mt-2"
              disabled={stnk.registrationNumber != ""}
            />
          </div>
          <div className="sm:col-span-7">
            <Label htmlFor="ownerNIK" className="text-right">
              Owner NIK
            </Label>
            <Input
              id="ownerNIK"
              value={stnk.ownerNIK}
              className="mt-2"
              disabled={stnk.registrationNumber != ""}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="carName" className="text-right">
            Car Name
          </Label>
          <Input id="carName" value={stnk.carName} className="mt-2" />
        </div>
        <div className="grid sm:grid-cols-12 gap-4">
          <div className="sm:col-span-6">
            <Label htmlFor="carType" className="text-right">
              Car Type
            </Label>
            <Select value={stnk.carType}>
              <SelectTrigger id="carType" className="w-full mt-2">
                <SelectValue placeholder="Select a car type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  {carType.map((type, idx) => {
                    return (
                      <SelectItem value={type.id} key={idx}>
                        {type.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-6">
            <Label htmlFor="engineSize" className="text-right">
              Engine Size
            </Label>
            <Select value={stnk.engineSize}>
              <SelectTrigger id="engineSize" className="w-full mt-2">
                <SelectValue placeholder="Select an engine size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Size</SelectLabel>
                  {engineSize.map((type, idx) => {
                    return (
                      <SelectItem value={type.id} key={idx}>
                        {type.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label htmlFor="carPrice" className="text-right">
            Car Price
          </Label>
          <Input id="carPrice" value={stnk.carPrice} type="number" className="mt-2" />
        </div>
        <div>
          <Label htmlFor="lastTaxPrice" className="text-right">
            Last Tax Price
          </Label>
          <Input id="lastTaxPrice" value={stnk.lastTaxPrice} type="number" className="mt-2" disabled />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="w-full">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  );
}
