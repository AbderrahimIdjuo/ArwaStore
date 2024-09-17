'use client'
import { 
    Card, 
    CardBody,
    Typography,
} from "../MT";
import {MapPinIcon , DevicePhoneMobileIcon , UserCircleIcon} from "@heroicons/react/24/solid"

export default function ClientInfo({ name , tele , ville , adress}) {

return (
    <>
    <Card className="mx-auto w-full z-10" >
        <CardBody >
            <div className="flex flex-col justify-center gap-4 ">            
            <Typography className="text-center" variant="h4" color="deep-orange">
                {name.toUpperCase()}
            </Typography>
            <div className="flex flex-row items-center gap-2">
            <DevicePhoneMobileIcon className="h-5 w-5"  />
            <Typography className="-mb-2" variant="h5">
                {tele}
            </Typography>
            </div>
            <div className="flex flex-row items-center gap-2">
            <MapPinIcon className="h-5 w-5"  />
            <Typography className="-mb-2" variant="h5">
                {ville}
            </Typography>
            </div>
            <div className="flex flex-row gap-2">
            <Typography className="-mb-2 ml-4" variant="h6">
                {adress}
            </Typography>
            </div>
            </div>

        </CardBody>
    </Card>
    </>
);
}