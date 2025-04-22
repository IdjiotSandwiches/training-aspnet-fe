import axios from "axios";
import { toast } from "sonner";

const stnkApi = axios.create({
  baseURL: import.meta.env.VITE_STNK_SERVICE,
  headers: {
    "Content-Type": "application/json",
  },
});

const calcTax = async (values) => {
  const params = new URLSearchParams({
    carType: values?.carType.toString() || 0,
    engineSize: values?.engineSize.toString() || 0,
    carPrice: values?.carPrice.toString() || 0,
    ownerName: values?.ownerName.toString() || "",
    registrationNumber: values?.registrationNumber.toString() || "",
  });

  try {
    const tax = await stnkApi.get(
      `/api/STNK/calculate-tax?${params.toString()}`
    );
    const item = tax.data;

    if (item.status != 200 || tax.status != 200) throw new Error(item ?? tax);

    return item.data;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

const fetchInit = async () => {
  try {
    const init = await stnkApi.get(`api/STNK/init`);
    const item = init.data;

    if (item.status != 200 || init.status != 200) throw new Error(item ?? init);

    return item.data;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

const updateStnk = async (values, registrationNumber) => {
  const params = new URLSearchParams({
    registrationNumber: registrationNumber,
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

const insertStnk = async (values) => {
  try {
    const insert = await stnkApi.post(`/api/STNK/insert`, values);

    const item = insert.data;

    if (item.status != 200 || insert.status != 200)
      throw new Error(item ?? insert);

    toast.success(item.message);
  } catch (error) {
    toast.error(error.message);
  }
};

const fetchStnk = async (registrationNumber) => {
  try {
    const stnk = await stnkApi.get(`api/STNK/${registrationNumber}`);
    const item = stnk.data;

    if (item.status != 200 || stnk.status != 200) throw new Error(item ?? stnk);
    return item.data;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

const fetchAllStnk = async () => {
  try {
    const stnkList = await stnkApi.get(`/api/STNK/all-stnk`);
    const items = stnkList.data;

    if (items.status != 200 || stnkList.status != 200)
      throw new Error(items ?? stnkList);

    return items.data;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

export { calcTax, fetchInit, updateStnk, insertStnk, fetchStnk, fetchAllStnk };
