import React, { useContext } from "react";

const stnkContext = React.createContext();

function UseStnk() {
  return useContext(stnkContext);
}

function StnkProvider({ children }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState(0);
  const [registrationNumber, setRegistrationNumber] = React.useState("");

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    setIsOpen(false);
    setRegistrationNumber("");
  };
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
        setRegistrationNumber
      }}
    >
      {children}
    </stnkContext.Provider>
  );
}

export { UseStnk, StnkProvider };
