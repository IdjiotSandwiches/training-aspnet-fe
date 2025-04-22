import React from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import { UseStnk } from "../context/stnk-context";
import { calcTax, fetchInit, fetchStnk, updateStnk } from "../api/apiClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

function camalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function FormFieldLayout({ form, label, children }) {
  const camelCase = camalize(label);

  return (
    <FormField
      control={form.control}
      name={camelCase}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FormInputField({ label, isDisabled = false, form, onChange }) {
  return (
    <FormFieldLayout form={form} label={label}>
      {(field) => (
        <Input
          placeholder=""
          {...field}
          disabled={isDisabled}
          onChange={(e) => {
            field.onChange(e);
            if (onChange) onChange(e);
          }}
        />
      )}
    </FormFieldLayout>
  );
}

function FormNumberInputField({ label, isDisabled = false, form, onChange }) {
  return (
    <FormFieldLayout form={form} label={label}>
      {(field) => (
        <Input
          placeholder=""
          {...field}
          disabled={isDisabled}
          type="number"
          onChange={(e) => {
            field.onChange(e.target.valueAsNumber);
            if (onChange) onChange(e.target.valueAsNumber);
          }}
        />
      )}
    </FormFieldLayout>
  );
}

function FormSelectField({ label, isDisabled = false, form, list, onChange }) {
  const camelCase = camalize(label);
  const lowerCase = label.toLowerCase();

  return (
    <FormFieldLayout form={form} label={label}>
      {(field) => (
        <Select
          value={field.value}
          onValueChange={(e) => {
            field.onChange(Number(e));
            if (onChange) onChange(e);
          }}
          disabled={isDisabled}
        >
          <SelectTrigger id={camelCase} className="w-full">
            <SelectValue placeholder={`Select a ${lowerCase}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {list.map((item, idx) => {
                return (
                  <SelectItem value={item.id} key={idx}>
                    {item.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </FormFieldLayout>
  );
}

const formSchema = z.object({
  carName: z.string().min(2, {
    message: "Car name must be at least 2 characters.",
  }),
  carPrice: z.number().min(1, { message: "Car price must be greater than 0." }),
  carType: z.number().min(1, { message: "Please select a car type." }),
  engineSize: z.number().min(1, { message: "Please select an engine size." }),
});

function FormComponent() {
  const { isOpen, registrationNumber, closeDialog, triggerRefresh } = UseStnk();
  const [carType, setCarType] = React.useState([]);
  const [engineSize, setEngineSize] = React.useState([]);
  const [isInit, setIsInit] = React.useState(false);
  const [stnk, setStnk] = React.useState({
    carName: "",
    carPrice: 0,
    carType: 0,
    engineSize: 0,
    lastTaxPrice: 0,
    ownerNik: "",
    ownerName: "",
    registrationNumber: "",
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: stnk,
  });

  const init = async () => {
    const data = await fetchInit();
    if (data) {
      setCarType(data.carType);
      setEngineSize(data.engineSize);
      setIsInit(true);
    } else {
      setIsInit(false);
    }
  };

  const fetch = async () => {
    const data = await fetchStnk(registrationNumber);
    if (data && form) {
      setStnk(data);
      form.reset(data);
    }
  };

  React.useEffect(() => {
    if (isOpen) init();
  }, [isOpen]);

  React.useEffect(() => {
    if (isInit && registrationNumber != "") {
      fetch();
    }
  }, [isInit, registrationNumber]);

  const onSubmit = (values) => {
    updateStnk(values, registrationNumber);
    closeDialog();
    triggerRefresh();
  };

  const handleCalcTax = React.useCallback(async () => {
    const tax = await calcTax(form.getValues());
    if (tax) form.setValue("lastTaxPrice", tax);
    else form.setValue("lastTaxPrice", 0);
  }, [form]);

  if (!isInit) return null;

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
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}

export { FormComponent };
