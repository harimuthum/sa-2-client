import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const Card = ({ data }: { data: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded overflow-hidden shadow-lg">
      {/* CardActionArea */}
      <div
        className="h-4/5 bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 shadow-xl cursor-pointer"
        onClick={openModal}
      >
        <div className="p-6">
          <h1 className="text-black text-2xl font-semibold">{data.name}</h1>
          <p className="text-black">{data.status}</p>
        </div>
      </div>

      {/* CardAction */}
      <div className="h-1/5 bg-gray-200 flex items-center justify-center">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
          onClick={() => console.log("Button Clicked")}
        >
          Action Button
        </button>
      </div>

      {/* Modal for CardActionArea */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Card Information Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{data.name}</h2>
        <p>Status: {data.status}</p>
        <p>Message: {data.message}</p>
        <p>
          Appointment: {data.appointment.day} at {data.appointment.startTime}
        </p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Card;
