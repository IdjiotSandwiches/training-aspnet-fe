import {
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
import { Input } from "./ui/input";

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
            field.onChange(Number(e))
            if (onChange) onChange(e)
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

export { FormInputField, FormNumberInputField, FormSelectField };
