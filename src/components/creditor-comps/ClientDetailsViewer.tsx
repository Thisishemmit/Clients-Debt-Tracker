// detailCellRenderer.tsx

import { useEffect } from 'react';


import  'ag-grid-community';
import "ag-grid-react"
import "ag-grid-enterprise"
import { ColDef, DetailGridInfo, GridReadyEvent, ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Button } from '../ui/button';
import './style.css'

let DHnumberFormat = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "MAD",
  maximumFractionDigits: 1,
});

let valueFormatterToDH = (p: ValueFormatterParams) => {
  if (p.node && p.node.group) {
    return "";
  }
  return DHnumberFormat.format(p.value).replace("MAD", "") + " DH";
};
const DetailCellRenderer = ({ data, node, api }: ICellRendererParams) => {
  const rowId = node.id!;

  useEffect(() => {
    return () => {
      console.log('removing detail grid info with id: ', rowId);
      api.removeDetailGridInfo(rowId);
    };
  }, []);

  const colDefs: ColDef[] = [
    {field: "id", hide: true},

    { field: 'amount' , valueFormatter: valueFormatterToDH},
    { field: 'type' },
    {field: "category"},
    { field: 'year' },
    { field: 'month' },
    { field: 'date' }, // Adjusted to match the change in interfaces
  ];

  const defaultColDef: ColDef = {
    flex: 1,
    sortable: true, 
    filter: true, 
    enableRowGroup: true,
    resizable: true 
  };

  const onGridReady = (params: GridReadyEvent) => {
    const gridInfo: DetailGridInfo = {
      id: rowId,
      api: params.api,
      columnApi: params.columnApi,
    };

    console.log('adding detail grid info with id: ', rowId);

    api.addDetailGridInfo(rowId, gridInfo);
  };
  return (
    <div className="full-width-panel detail overflow-y-scroll bg-blue-gray-50 py-3 px-8 w-full h-full">
      <div className='w-full flex items-end justify-end'>
        <Button className='translate-y-full z-50 h-[42px] absolute' style={{width: "10%"}} >
          +
        </Button>
      </div>
      <AgGridReact
        data-id="detailGrid"
        className="full-width-grid ag-details-grid ag-theme-alpine"
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowData={data.payments}
        alwaysShowHorizontalScroll={true}
        alwaysShowVerticalScroll={true}
        onGridReady={onGridReady}
       
        enableRangeSelection={true}
        enableCharts={true}
        animateRows={true}
        rowSelection="multiple"
        rowGroupPanelShow='always'
      />
    </div>
  );
};

export default DetailCellRenderer;
