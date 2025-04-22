import React from "react";
import { Form } from "@/components/ui/form";
import { DialogFooter } from "./ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormInputField,
  FormNumberInputField,
  FormSelectField,
} from "./form-input-component";
import { calcTax, fetchInit, updateStnk } from "./call-api";

const formSchema = z.object({
  carName: z.string().min(2, {
    message: "Car name must be at least 2 characters.",
  }),
  carPrice: z.number().min(1, { message: "Car price must be greater than 0." }),
  carType: z.number().min(1, { message: "Please select a car type." }),
  engineSize: z.number().min(1, { message: "Please select an engine size." }),
});

export default function FormComponent({ stnk, isOpen }) {
  const [carType, setCarType] = React.useState([]);
  const [engineSize, setEngineSize] = React.useState([]);

  React.useEffect(() => {
    if (isOpen) fetchInit(setCarType, setEngineSize);
  }, [isOpen]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      registrationNumber: stnk.registrationNumber,
      ownerName: stnk.ownerName,
      ownerNik: stnk.ownerNIK,
      carName: stnk.carName,
      carPrice: stnk.carPrice,
      carType: stnk.carType,
      engineSize: stnk.engineSize,
      lastTaxPrice: stnk.lastTaxPrice,
    },
  });

  const onSubmit = (values) => updateStnk(values, form);
  const handleCalcTax = () => calcTax(form);

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormInputField
            form={form}
            isDisabled={true}
            label={"Registration Number"}
          />
          <div className="grid sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5">
              <FormInputField
                form={form}
                isDisabled={stnk.registrationNumber != ""}
                label={"Owner Name"}
                onChange={() => handleCalcTax()}
              />
            </div>
            <div className="sm:col-span-7">
              <FormInputField
                form={form}
                isDisabled={true}
                label={"Owner NIK"}
              />
            </div>
          </div>
          <FormInputField form={form} label={"Car Name"} />
          <div className="grid sm:grid-cols-12 gap-4">
            <div className="sm:col-span-6">
              <FormSelectField
                form={form}
                label={"Car Type"}
                list={carType}
                onChange={() => handleCalcTax()}
              />
            </div>
            <div className="sm:col-span-6">
              <FormSelectField
                form={form}
                label={"Engine Size"}
                list={engineSize}
                onChange={() => handleCalcTax()}
              />
            </div>
          </div>
          <FormNumberInputField
            form={form}
            label={"Car Price"}
            onChange={() => handleCalcTax()}
          />
          <FormNumberInputField
            form={form}
            label={"Last Tax Price"}
            isDisabled={true}
          />
          <DialogFooter>
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
