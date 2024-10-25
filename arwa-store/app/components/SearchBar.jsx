"use client";

import { MagnifyingGlassIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useState, useRef, useEffect, useCallback } from "react";
import { Input, Spinner } from "../MT";
import { debounce } from "lodash";
export default function SearchBar({
  search,
  getClients,
  getCommandes,
  source,
  setInputValue,
  setPage,
  setIsLoading,
  getCommandesByStatus,
  status,
  searchClient
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const inputRef = useRef(null);

  const HandleChange = useCallback(
    debounce((value) => {
      if (value === "") {
        setInputValue(null)
        setIsLoading(true)
        if (source === "commandes") {
          console.log('#######  status :', status , '#######  searchValue :', searchValue)
          search(status , searchValue);
        } else if (source === "clients") {
          getClients();
        }
      }
      setSearchValue(value);
    }, 300),
    [ searchValue , source , status]
  );

  useEffect(() => {
    return () => HandleChange.cancel();
  }, [HandleChange]);

  const HandleInputChange = (e) => { 
    if (e.target.value === "") {
      setInputValue(null)
      setIsLoading(true)
      if (source === "commandes") {
        console.log('#######  status :', status , '#######  searchValue :', searchValue)
        search(status , null);
      } else if (source === "clients") {
        getClients();
      }
    }
    setSearchValue(e.target.value);
    console.log('handleInputChange',searchValue )
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleSearch = () => {
    console.log('handleSearch', status , searchValue)
      setPage(1);
      if(searchClient){
        searchClient(searchValue)
      }else if(search){
        search(status , searchValue);
      }  
      setInputValue(searchValue);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  };
  const handleBlur = () => {
    if (searchValue === "" || searchValue === null) {
      setIsFocused(false);
    }
  };

  const handleIconClick = () => {
    if (isFocused) {
      // Perform search action here
      console.log("Searching:", inputRef.current);
    } else {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <Input
        onChange={HandleInputChange}
        ref={inputRef}
        type="text"
        placeholder="Chercher un client"
        labelProps={{
          className: "hidden",
        }}
        containerProps={{
          className: "min-w-0",
        }}
        className={`!bg-white !border !border-[1.2px] !border-gray-300 focus:!border-[#78909c] focus:!shadow-md focus:!shadow-[#37474f] pl-10 pr-4 py-2 w-full rounded-full transition-all duration-300 ease-in-out ${
          isFocused ? " !border-[3px]" : "bg-gray-100"
        }`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        spellCheck={false}
      />
      <div
        className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={handleIconClick}
      >
        <div className="relative w-5 h-5">
          <MagnifyingGlassIcon
          style={{ stroke: 'currentcolor', strokeWidth: 1.2 }}
            color="gray"
            className={` w-5 h-5 absolute transition-all duration-300 ease-in-out ${
              isFocused
                ? "opacity-0 -translate-x-2"
                : "opacity-100 translate-x-0"
            }`}
          />
          <ArrowLeftIcon
            
            style={{ stroke: 'currentcolor', strokeWidth: 1.2 }}
            onClick={() => {
              handleSearch()
            }}
            className={`text-[#78909c] w-5 h-5 absolute transition-all duration-300 ease-in-out ${
              isFocused
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
