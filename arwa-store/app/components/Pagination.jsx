import React from 'react'
import { IconButton , Button } from '../MT'
import {
    ArrowLeftIcon,
    ArrowRightIcon,
  } from "@heroicons/react/24/solid";

export default function Pagination({page , totalPages , setPage}) {
    const handlePageChange = (newPage) => {
        setPage(newPage);
      };
    
      const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3;
        let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
        if (endPage - startPage + 1 < maxVisiblePages) {
          startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
    
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(
            <IconButton
              key={i}
              onClick={() => handlePageChange(i)}
              variant={page === i ? "filled" : "outlined"}
              size="sm"
              className="min-w-[1rem] rounded-full"
            >
              {i}
            </IconButton>
          );
        }
    
        return pageNumbers;
      };
  return (
    <div className="flex justify-center items-center gap-2">
    <Button
      onClick={() => handlePageChange(page - 1)}
      disabled={page === 1}
      variant="text"
      size="sm"
      className="flex items-center gap-2 rounded-full"
    >
      <ArrowLeftIcon className="h-4 w-4" />
      Prev
    </Button>
    {renderPageNumbers()}
    <Button
      onClick={() => handlePageChange(page + 1)}
      disabled={page === totalPages}
      variant="text"
      size="sm"
      className="flex items-center gap-2 rounded-full"
    >
      Next
      <ArrowRightIcon className="h-4 w-4" />
    </Button>
  </div>
  )
}
