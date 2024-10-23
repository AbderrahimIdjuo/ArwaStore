// "use client";
// import React, { useState, useCallback, useEffect } from "react";
// import AsyncSelect from "react-select/async";

// const SelectClient = ({clientsList , setClientID }) => {

// console.log("clients from selectoss####" , clientsList)

//   const fetchClients = async (inputValue) => {
//     if(inputValue){
//       return clientsList.filter((client) =>
//       client.name.toLowerCase().includes(inputValue.toLowerCase())
//     ).map(client => ({
//       label: client.name, // Display name in the dropdown
//       value: client.id    // Unique identifier for the client
//     }));
//     }
    
//   };

//   // const defaultClient = clientsList.find((Client) => Client.name === defaultClient);
//   const loadOptions = (inputValue, callback) => {
//     fetchClients(inputValue).then(callback);
//   };

//   const customStyles = {
//     control: (provided, state) => ({
//       ...provided,
//       borderColor: state.isFocused ? "#688199" : "#ccc", // Border color when focused and unfocused
//       boxShadow: state.isFocused ? "0 0 0 1px #688199" : null, // Optional: Add a shadow when focused
//       "&:hover": {
//         borderColor: "#688199", // Border color on hover
//       },
//     }),

//     dropdownIndicator: (provided, state) => ({
//       ...provided,
//       color: state.isFocused ? "#6A8CAD" : "#ccc",
//     }),
//     option: (provided, state) => ({
//       ...provided,
//       backgroundColor: state.isSelected
//         ? "#6A8CAD"
//         : state.isFocused
//         ? "#C3DDF7"
//         : null,
//       color: state.isSelected ? "white" : "#333", // Option text color
//     }),
//   };

//   return (
//     <div>
//       <AsyncSelect
//         cacheOptions
//         loadOptions={loadOptions}
//         defaultOptions
//         placeholder="Chercher un client"
//         isClearable
//         styles={customStyles}
//         onChange={(selectedOption) => {
//           console.log('selectedOption ', selectedOption )
//           setClientID(selectedOption.value);
//         }}
//       />
//     </div>
//   );
// };

// export default SelectClient;

'use client'

import React, { useCallback } from "react";
import AsyncSelect from "react-select/async";

const SelectClient = ({ clientsList, setClientID }) => {
  const fetchClients = useCallback((inputValue) => {
    return clientsList
      .filter((client) =>
        inputValue
          ? client.name.toLowerCase().includes(inputValue.toLowerCase())
          : true
      )
      .map((client) => ({
        label: client.name,
        value: client.id
      }));
  }, [clientsList]);

  const loadOptions = useCallback((inputValue, callback) => {
    setTimeout(() => {
      callback(fetchClients(inputValue));
    }, 300);
  }, [fetchClients]);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#688199" : "#ccc",
      boxShadow: state.isFocused ? "0 0 0 1px #688199" : null,
      "&:hover": {
        borderColor: "#688199",
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#6A8CAD" : "#ccc",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#6A8CAD"
        : state.isFocused
        ? "#C3DDF7"
        : null,
      color: state.isSelected ? "white" : "#333",
    }),
  };

  return (
    <div>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        placeholder="Chercher un client"
        isClearable
        styles={customStyles}
        onChange={(selectedOption) => {
          console.log('selectedOption ', selectedOption);
          setClientID(selectedOption ? selectedOption.value : null);
        }}
      />
    </div>
  );
};

export default SelectClient;