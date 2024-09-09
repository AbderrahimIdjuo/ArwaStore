'use client'
import React, { useEffect , useState } from 'react';
import AsyncSelect from 'react-select/async';
import {Select, Option } from "../MT"


 const clients =[
  {id:1  , name:"Abderrahim Oujdi" , tele:"0651565748" , ville:"Agadir"},
  {id:2  , name:"Arwa Oujdi" , tele:"0745258963" , ville:"Taroudant"},
  {id:3  , name:"Fayza Bouderqua" , tele:"0762850323" , ville:"Casablanca"},
  {id:4  , name:"Fatima Sabiri" , tele:"0672032545" , ville:"Rabat"},
  {id:5  , name:"Khalid houmad" , tele:"0651565748" , ville:"Inzegan"},
  {id:6  , name:"Abderrahim Oujdi" , tele:"0651565748" , ville:"Agadir"},
  {id:7  , name:"Arwa Oujdi" , tele:"0745258963" , ville:"Taroudant"},
  {id:8  , name:"Fayza Bouderqua" , tele:"0762850323" , ville:"Casablanca"},
  {id:9  , name:"Fatima Sabiri" , tele:"0672032545" , ville:"Rabat"},
  {id:10  , name:"Khalid houmad" , tele:"0651565748" , ville:"Inzegan"},
  {id:11  , name:"Abderrahim Oujdi" , tele:"0651565748" , ville:"Agadir"},
  {id:12  , name:"Arwa Oujdi" , tele:"0745258963" , ville:"Taroudant"},
  {id:13  , name:"Fayza Bouderqua" , tele:"0762850323" , ville:"Casablanca"},
  {id:14  , name:"Fatima Sabiri" , tele:"0672032545" , ville:"Rabat"},
  {id:15  , name:"Khalid houmad" , tele:"0651565748" , ville:"Inzegan"}
]
  



const SelectClient = () => {

  return (
    <div>
      <Select color='light-blue' label="Chisir le client">
      {clients.map(client => <Option key={client.id}>{client.name}</Option>)}
      </Select>
    </div>
  );
};

export default SelectClient;
