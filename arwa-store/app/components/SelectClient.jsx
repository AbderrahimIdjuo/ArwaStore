'use client'
import React, { useEffect , useState } from 'react';
import AsyncSelect from 'react-select/async';

const fruits = ["apple", "banana", "mango", "banana", "grape"];
const clients =[
  {id:1  , name:"Abderrahim Oujdi" , tele:"0651565748" , ville:"Agadir"},
  {id:2  , name:"Arwa Oujdi" , tele:"0745258963" , ville:"Taroudant"},
  {id:3  , name:"Fayza Bouderqua" , tele:"0762850323" , ville:"Casablanca"},
  {id:4  , name:"Fatima Sabiri" , tele:"0672032545" , ville:"Rabat"},
  {id:5  , name:"Khalid houmad" , tele:"0651565748" , ville:"Inzegan"}
]


const SelectClient = () => {
  const [users , setUsers] = useState([])

  useEffect(()=>{
  fetch("http://universities.hipolabs.com/search?country=United+States")
  .then(res => res.json())
  .then(res => setUsers(res))
  },[])
  
  const fetchCountries = async (inputValue) => {
 
    return clients.filter(client =>
      client.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
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
        placeholder="Chercher un client"
        isClearable
        styles={customStyles}
      />
    </div>
  );
};

export default SelectClient;
