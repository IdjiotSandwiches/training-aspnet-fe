import React from "react";
import { fetchInit } from "../api/apiClient";
import { UseStnk } from "../context/stnk-context";

function useSelectData(isOpen) {
  const { setIsError, setIsLoading } = UseStnk();
  const [carType, setCarType] = React.useState([]);
  const [engineSize, setEngineSize] = React.useState([]);

  React.useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      
      const data = await fetchInit();
      if (data) {
        setCarType(data.carType);
        setEngineSize(data.engineSize);
        setIsError(false);
      } else {
        setIsError(true);
      }

      setIsLoading(false);
    };

    if (isOpen) init();
  }, [isOpen]);

  return { carType, engineSize };
}

export { useSelectData };
