import React, { useContext } from "react";

const stnkContext = React.createContext();

function UseStnk() {
  return useContext(stnkContext);
}

function StnkProvider({ children }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [registrationNumber, setRegistrationNumber] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <stnkContext.Provider
      value={{
        isOpen,
        openDialog,
        closeDialog,
        setIsOpen,
        refreshKey,
        triggerRefresh,
        registrationNumber,
        setRegistrationNumber,
        isError,
        setIsError,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </stnkContext.Provider>
  );
}

export { UseStnk, StnkProvider };
