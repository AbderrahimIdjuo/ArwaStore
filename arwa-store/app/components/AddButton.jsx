import React from "react";
import { Button, Typography , IconButton } from "../MT";
import { PlusIcon } from "@heroicons/react/24/solid";
function AddButton({ handleOpen, title }) {
  return (
<>


      <Button
        onClick={handleOpen}
        className=" button2  fit-content  gap-2 rounded-full px-5 max-h-[2.6rem] hidden lg:block"
        color="blue"
        size="sm"
      >
        
        <Typography
        className="flex flex-row justfy-center items-center gap-2"
          variant="paragraph"
          color="white"
        >
          <PlusIcon color="white" className="h-6 w-6" />
          {title}
        </Typography>
      </Button>
   
    <div className="lg:hidden flex flex-row items-center gap-2 justify-end w-1/3 max-h-[2.6rem]">
        <IconButton
          onClick={handleOpen}
          className=" button2 flex flex-row justfy-center items-center gap-2 rounded-full px-5"
          color="blue"
          size="md"
        >
          <PlusIcon color="white" className="h-6 w-6" />
        </IconButton>
      </div>

</>
  );
}

export default AddButton;
