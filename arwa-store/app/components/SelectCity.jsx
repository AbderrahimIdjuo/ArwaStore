'use client'
import React from 'react';
import AsyncSelect from 'react-select/async';
import {cities} from "list-of-moroccan-cities"




const fetchCountries = async (inputValue) => { 
  return cities.filter(city =>
    city.name.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const SelectCity = (props) => {
  const loadOptions = (inputValue, callback) => {
    fetchCountries(inputValue).then(callback);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#29b6f6' : '#ccc', // Border color when focused and unfocused
      boxShadow: state.isFocused ? '0 0 0 1px #29b6f6' : null, // Optional: Add a shadow when focused
      '&:hover': {
        borderColor: '#29b6f6', // Border color on hover
      },
    }),

      dropdownIndicator: (provided , state) => ({
        ...provided,
        color: state.isFocused ? '#3498db' : '#ccc', 
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#3498db' : state.isFocused ? '#aad7f5' : null,
        color: state.isSelected ? 'white' : '#333', // Option text color
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
        styles={customStyles}
        onChange={(selectedOption) => {  
          props.setClient((cur) => ({...cur , ville : selectedOption?.name}))
        }}
      />
    </div>
  );
};

export default SelectCity;
