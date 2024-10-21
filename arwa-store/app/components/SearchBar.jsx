"use client";

import { MagnifyingGlassIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useState, useRef, useEffect, useCallback } from "react";
import { Input } from "../MT";
import { debounce } from "lodash";
export default function SearchBar({ search, getClients , getCommandes , source}) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const inputRef = useRef(null);

  const HandleChange = useCallback(
    debounce((value) => {
      if (value === "") {
        if(source === "commandes"){
          getCommandes()
        }else if (source === "clients"){
          getClients();
        }
        
      }
      setSearchValue(value);
    }, 300),
    []
  );

  useEffect(() => {
    return () => HandleChange.cancel();
  }, [HandleChange]);

  const HandleInputChange = (e) => {
    HandleChange(e.target.value);
    setSearchValue(e.target.value);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(searchValue);
    }
  };
  const handleBlur = () => {
    if (searchValue === "") {
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
        className={`!border !border-gray-300 focus:!border-green-500 focus:!shadow-md focus:!shadow-green-300/50 pl-10 pr-4 py-2 w-full rounded-full transition-all duration-300 ease-in-out ${
          isFocused ? "bg-white " : "bg-gray-100"
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
          color="gray"
            className={`w-5 h-5 absolute transition-all duration-300 ease-in-out ${
              isFocused
                ? "opacity-0 -translate-x-2"
                : "opacity-100 translate-x-0"
            }`}
          />
          <ArrowLeftIcon
          color="green"
            onClick={() => {
              search(searchValue);
            }}
            className={`w-5 h-5 absolute transition-all duration-300 ease-in-out ${
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
