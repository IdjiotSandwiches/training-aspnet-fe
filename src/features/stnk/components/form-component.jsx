import React from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import { UseStnk } from "../context/stnk-context";
import { calcTax, insertStnk, updateStnk } from "../api/apiClient";
import { useFormData } from "../hooks/use-form-data";
import {
  FormInputField,
  FormNumberInputField,
  FormSelectField,
} from "./input-component";
import { useSelectData } from "../hooks/use-select-data";

const formSchema = z.object({
  ownerName: z.string().min(2, {
    message: "Owner name must be at least 2 characters.",
  }),
  carName: z.string().min(2, {
    message: "Car name must be at least 2 characters.",
  }),
  carPrice: z.number().min(1, { message: "Car price must be greater than 0." }),
  carType: z.number().min(1, { message: "Please select a car type." }),
  engineSize: z.number().min(1, { message: "Please select an engine size." }),
});

function FormInput({ stnk, carType, engineSize }) {
  const { registrationNumber, closeDialog, triggerRefresh } = UseStnk();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: stnk,
  });

  React.useEffect(() => {
    form.reset(stnk)
  }, [stnk]);

  const onSubmit = async (values) => {
    if (registrationNumber == "")
      await insertStnk(values);
    else
      await updateStnk(values, registrationNumber);
    closeDialog();
    triggerRefresh();
  };

  const handleCalcTax = React.useCallback(async () => {
    const formVal = form.getValues();
    if (!formVal.ownerName || !formVal.carType || !formVal.engineSize || formVal.carPrice == 0)
      return;

    const tax = await calcTax(formVal);
    if (tax) form.setValue("lastTaxPrice", tax);
    else form.setValue("lastTaxPrice", 0);
  }, [form]);

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
                onChange={handleCalcTax}
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
                onChange={handleCalcTax}
              />
            </div>
            <div className="sm:col-span-6">
              <FormSelectField
                form={form}
                label={"Engine Size"}
                list={engineSize}
                onChange={handleCalcTax}
              />
            </div>
          </div>
          <FormNumberInputField
            form={form}
            label={"Car Price"}
            onChange={handleCalcTax}
          />
          <FormNumberInputField
            form={form}
            label={"Last Tax Price"}
            isDisabled={true}
          />
          <DialogFooter>
            <Button type="submit" className="w-full cursor-pointer disabled:cursor-not-allowed" disabled={form.formState.isSubmitting}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

function FormComponent() {
  const { isOpen, isLoading, isError } = UseStnk();
  const { carType, engineSize } = useSelectData(isOpen);

  const stnk = useFormData();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error has occured.</div>;

  return <FormInput stnk={stnk} carType={carType} engineSize={engineSize} />;
}

export { FormComponent };
