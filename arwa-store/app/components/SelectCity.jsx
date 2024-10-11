"use client";
import React from "react";
import AsyncSelect from "react-select/async";
import { cities } from "list-of-moroccan-cities";

const fetchCountries = async (inputValue) => {
  return cities.filter((city) =>
    city.name.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const SelectCity = ({ setVille, ville , defaultville}) => {
  const defaultCity = cities.find((city) => city.name === defaultville);
  const loadOptions = (inputValue, callback) => {
    fetchCountries(inputValue).then(callback);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#688199" : "#ccc", // Border color when focused and unfocused
      boxShadow: state.isFocused ? "0 0 0 1px #688199" : null, // Optional: Add a shadow when focused
      "&:hover": {
        borderColor: "#688199", // Border color on hover
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
      color: state.isSelected ? "white" : "#333", // Option text color
    }),
  };

  return (
    <div>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        placeholder="Chercher une ville"
        isClearable
        defaultValue={defaultCity}
        styles={customStyles}
        value={ville}
        onChange={(selectedOption) => {
          setVille(selectedOption);
        }}
      />
    </div>
  );
};

export default SelectCity;
