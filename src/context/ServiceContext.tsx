"use client";

import { createContext, useContext } from "react";

const ServiceContext = createContext({});

export const ServiceProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ServiceContext.Provider value={{}}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useServices = () => useContext(ServiceContext);
