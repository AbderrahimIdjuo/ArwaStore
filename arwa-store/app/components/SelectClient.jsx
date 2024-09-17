"use client";

import { Select, Option } from "../MT";
import { useEffect, useState } from "react";

const SelectClient = ({ setClientID , value}) => {
  const [Clients, setClients] = useState([]);
  
  const getClients = async () => {
    try {
      const result = await fetch(`/api/espace-client`, {
        method: "GET",
      });
      const clientList = await result.json();
      setClients(clientList.Clients);
      console.log(clientList.Clients);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getClients();
  }, []);
  const HandleChange = (clientID) => {
    setClientID(clientID);
  };
  return (
    <div>
      <Select
        color="light-blue"
        label="Choisir le client"
        onChange={HandleChange}
        value={value}
      >
        {Clients.map((client) => (
          <Option key={client.id} value={client.id}>
            {client.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectClient;
