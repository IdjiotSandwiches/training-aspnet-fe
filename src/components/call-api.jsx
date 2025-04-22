import { stnkApi } from "@/functions/apiClient";
import { toast } from "sonner";

const calcTax = async (form) => {
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

const fetchInit = async (setCarType, setEngineSize) => {
  try {
    const init = await stnkApi.get(`api/STNK/init`);
    const item = init.data;

    if (item.status != 200 || init.status != 200) throw new Error(item ?? init);

    setCarType(item.data.carType);
    setEngineSize(item.data.engineSize);
  } catch (error) {
    toast.error(error.message);
  }
};

const updateStnk = async (values, form) => {
  const params = new URLSearchParams({
    registrationNumber: form.getValues().registrationNumber.toString(),
  });

  try {
    const update = await stnkApi.put(
      `/api/STNK/update?${params.toString()}`,
      values
    );

    const item = update.data;

    if (item.status != 200 || update.status != 200)
      throw new Error(item ?? update);

    toast.success(item.message);
  } catch (error) {
    toast.error(error.message);
  }
};

const fetchStnk = async (registrationNumber, setIsOpen, setStnk) => {
  try {
    const stnk = await stnkApi.get(`api/STNK/${registrationNumber}`);
    const item = stnk.data;

    if (item.status != 200 || stnk.status != 200) throw new Error(item ?? stnk);

    setStnk(item.data);
    setIsOpen(true);
  } catch (error) {
    toast.error(error.message);
  }
};

const fetchAllStnk = async (setStnkList) => {
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

export { calcTax, fetchInit, updateStnk, fetchStnk, fetchAllStnk };
