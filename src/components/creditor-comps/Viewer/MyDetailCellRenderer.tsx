import { ColDef, DetailGridInfo, GridReadyEvent, ICellRendererParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { useEffect } from 'react';

const DetailCellRenderer = ({ data, node, api }: ICellRendererParams) => {
  const rowId = node.id!;

  

  const colDefs = [
    { field: 'amount'},
    { field: 'type' },
    { field: 'year' },
    { field: 'month'},
    { field: 'date' },
  ];

  const defaultColDef: ColDef = {
    flex: 1,
    sortable: true, 
    filter: true, 
    enableRowGroup: true
  };


  return (
    <div className="full-width-panel">
      <div className="full-width-details">
        <div className="full-width-detail">
          <b>Name: </b>
          {data.client}
        </div>
        <div className="full-width-detail">
          <b>Account: </b>
          {data.contact}
        </div>
      </div>
      <AgGridReact
        
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowData={data.payments}
      />
    </div>
  );
};

export default DetailCellRenderer;