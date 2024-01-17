/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Axios from "axios";

import { IFormResponse } from "../interfaces/IFormResponse";

const TabComponent = ({}) => {
  const [formResponses, setFormResponses] = useState<IFormResponse[]>([]);

  const [activeTab, setActiveTab] = useState("Pending");

  const filteredData = formResponses.filter(
    (response) => response.statusOfClient === activeTab
  );

  const handleStatusToggle = (id: any) => {
    const updatedData = formResponses.map((item) => {
      if (item._id === id) {
        item.statusOfClient =
          item.statusOfClient === "Pending" ? "Approved" : "Pending";
      }
      return item;
    });
    setFormResponses(updatedData);

    Axios.post("http://localhost:5000/api/form/update-form-response-status", {
      _id: id,
      statusOfClient: updatedData[0].statusOfClient,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(updatedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/form/get-form-responses",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userID: localStorage.getItem("_id") }),
          }
        );

        const newData = await res.json();
        // console.log("From BackEnd: newData", newData);
        const updatedData = newData.data.map((response: IFormResponse) => {
          return {
            _id: response._id,
            artist_id: response.artist_id,
            clientName: response.clientName,
            clientEmail: response.clientEmail,
            message: response.message,
            duration: response.duration,
            appointment: {
              day: response.appointment.day,
              startTime: response.appointment.startTime,
              endTime: response.appointment.endTime,
            },
            statusOfClient: response.statusOfClient,
          };
        });
        // console.log("Processed Data", updatedData);

        setFormResponses([...formResponses, ...updatedData]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center mb-8">
        <button
          className={`px-4 py-2 mr-4 rounded-md ${
            activeTab === "Pending"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-blue-800 hover:bg-blue-300"
          }`}
          onClick={() => setActiveTab("Pending")}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "Approved"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-green-800 hover:bg-green-300"
          }`}
          onClick={() => setActiveTab("Approved")}
        >
          Approved
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((item, idx) => (
          <div
            key={item._id}
            className="bg-gray-400 p-4 rounded-md shadow-lg border"
          >
            <h3 className="text-xl font-semibold mb-2">{item.clientName}</h3>
            <p
              className={`text-${
                item.statusOfClient === "Pending" ? "red" : "green"
              }-500 font-bold mb-2`}
            >
              Status:{" "}
              <span
                className={`p-1 rounded-xl text-white ${
                  item.statusOfClient === "Pending"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                {item.statusOfClient}
              </span>
            </p>
            <p className="text-gray-700 mb-2">{item.message}</p>
            <p className="text-gray-700 mb-2">Duration: {item.duration}</p>
            <p className="text-gray-700 mb-2">
              Appointment: {item.appointment.day} {item.appointment.startTime} -{" "}
              {item.appointment.endTime}
            </p>
            <button
              className={`mt-2 ${
                item.statusOfClient === "Pending"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } px-4 py-2 rounded`}
              onClick={() => handleStatusToggle(item._id)}
            >
              {item.statusOfClient === "Pending" ? "Approve" : "Revert"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabComponent;
