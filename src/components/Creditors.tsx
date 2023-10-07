
import {
  Card,
  CardHeader,
  Typography,

} from "@material-tailwind/react";


import { AddCreditorForm } from "./creditor-comps/AddCreditorForm";
import CreditorsViewer from "./creditor-comps/Viewer/CreditorsViewer";
import YourGridComponent from "./creditor-comps/ClientsViewer";
import GridExample from "./creditor-comps/ClientsViewer";
function Creditors() {
  

  return (
    <Card className="h-full w-full rounded-none shadow-none" >
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Creditors 
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            
            <AddCreditorForm />
          </div>
        </div>
      </CardHeader>
      <GridExample />
    </Card>
  );
}

export {Creditors};
