import React from "react";
import { Button, Typography } from "../MT";
import { PlusIcon } from "@heroicons/react/24/solid";
function AddButton({ handleOpen, title }) {
  return (
    <div className="flex flex-row items-center gap-2 justify-end w-1/3 max-h-[2.6rem]">
      <Button
        onClick={handleOpen}
        className=" button2 flex flex-row justfy-center items-center gap-2 rounded-full px-5"
        color="blue"
        size="sm"
      >
        <PlusIcon color="white" className="h-6 w-6" />
        <Typography
          className="hidden md:block"
          variant="paragraph"
          color="white"
        >
          {title}
        </Typography>
      </Button>
    </div>
  );
}

export default AddButton;
