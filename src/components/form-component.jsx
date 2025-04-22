import React from "react";
import { Form } from "@/components/ui/form";
import { DialogFooter } from "./ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { stnkApi } from "@/functions/apiClient";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormInputField,
  FormNumberInputField,
  FormSelectField,
} from "./form-input-component";

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

  const calcTax = async () => {
    const values = form.getValues();

    const params = new URLSearchParams({
      carType: values.carType.toString(),
      engineSize: values.engineSize.toString(),
      carPrice: values.carPrice.toString(),
      ownerName: values.ownerName.toString(),
      registrationNumber: values.registrationNumber.toString(),
    });

    try {
      const tax = await stnkApi.get(
        `/api/STNK/calculate-tax?${params.toString()}`
      );
      const item = tax.data;

      if (item.status != 200 || tax.status != 200) throw new Error(item ?? tax);

      form.setValue("lastTaxPrice", item.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmit = (values) => {
    console.log(values)
  };

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
                onChange={() => calcTax()}
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
                onChange={() => calcTax()}
              />
            </div>
            <div className="sm:col-span-6">
              <FormSelectField
                form={form}
                label={"Engine Size"}
                list={engineSize}
                onChange={() => calcTax()}
              />
            </div>
          </div>
          <FormNumberInputField
            form={form}
            label={"Car Price"}
            onChange={() => calcTax()}
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
