/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import LandingCard from "./LandingCard";

import { IFormResponse } from "../interfaces/IFormResponse";

export default function LandingDrawer(params: {
  PformResponses: IFormResponse[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  cLoading: boolean;
  setCLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const [formResponses, setFormResponses] = useState<IFormResponse[]>([]);
  const [pendingResponses, setPendingResponses] = useState<IFormResponse[]>([]);
  const [approvedResponses, setApprovedResponses] = useState<IFormResponse[]>(
    []
  );

  const filterData = (s: string) =>
    params.PformResponses.filter((response) => response.statusOfClient === s);

  useEffect(() => {
    setFormResponses(params.PformResponses);
    setApprovedResponses(filterData("Approved"));
    setPendingResponses(filterData("Pending"));

    console.log("Form Responses from Parent", params.PformResponses);

    console.log("Before loading", params.loading, params.cLoading);
    // params.setLoading(false);
    params.setCLoading(false);
    console.log("After loading", params.loading, params.cLoading);
  }, [params.setCLoading]);

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleCardButton = () => {
    console.log("Hello ");
  };

  return params.cLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <button
        onClick={() => {
          console.log("Form Responses", formResponses);
          console.log("Approved Responses", approvedResponses);
          console.log("Pending Responses", pendingResponses);
        }}
      >
        Test
      </button>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab label="Pending" value="1" />
              <Tab label="Approved" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="p-4 flex items-center justify-center md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {pendingResponses.map((response, idx) => (
                <LandingCard
                  key={idx}
                  params={{
                    clientName: response.clientName,
                    clientEmail: response.clientEmail,
                    message: response.message,
                    statusOfClient: response.statusOfClient,
                    BtnFn: handleCardButton,
                  }}
                />
              ))}
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="p-4 flex items-center justify-center md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {approvedResponses.map((response, idx) => (
                <LandingCard
                  key={idx}
                  params={{
                    clientName: response.clientName,
                    clientEmail: response.clientEmail,
                    message: response.message,
                    statusOfClient: response.statusOfClient,
                    BtnFn: handleCardButton,
                  }}
                />
              ))}
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}
