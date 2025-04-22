import React from "react";
import { fetchStnk } from "../api/apiClient";
import { UseStnk } from "../context/stnk-context";

function useFormData() {
  const { registrationNumber, setIsError, setIsLoading } = UseStnk();
  const [stnk, setStnk] = React.useState({
    carName: "",
    carPrice: "",
    carType: 0,
    engineSize: 0,
    lastTaxPrice: 0,
    ownerNik: "",
    ownerName: "",
    registrationNumber: "",
  });

  React.useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);

      const data = await fetchStnk(registrationNumber);
      if (data) {
        setStnk(data);
        setIsError(false);
      } 
      else setIsError(true);
    };

    if (registrationNumber != "") fetch();
    setIsLoading(false);
  }, [registrationNumber]);

  return stnk;
}

export { useFormData };
