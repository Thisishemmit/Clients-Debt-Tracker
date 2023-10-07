import { useCallback, useMemo, useRef} from "react";
import { AgGridReact } from "ag-grid-react"
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-material.min.css"
import './style.css'
import 'ag-grid-enterprise'

import { GetDetailRowDataParams, ValueFormatterParams} from 'ag-grid-community'

let DHnumberFormat = Intl.NumberFormat('en-US',{
  style: 'currency',
  currency: "MAD",
  maximumFractionDigits:1
})


let valueFormatterToDH = (p: ValueFormatterParams) => {
  if (p.node && p.node.group) {
    return "";
  }
  return DHnumberFormat.format(p.value).replace('MAD', "") + " DH";
};
 const rowData = [
    {
      client: "Mohamed",
      contact: "+212611165517",
      debt: "100",
      pending: "50",
      year: "2019",
      date: "03/03/2019",
      transactions: "2",
      payments: [{
        amount: "50",
        type: "IN",
        year: "2020",
        month: "06",
        date: "20/06/2020"
      },]
    },
    {
      client: "Mohamed",
      contact: "+212611165517",
      debt: "100",
      pending: "50",
      year: "2019",
      date: "03/03/2019",
      transactions: "2",
      payments: [{
        amount: "50",
        type: "IN",
        year: "2020",
        month: "06",
        date: "20/06/2020"
      }]
    },

  ];
function CreditorsViewer() {
  const gridRef = useRef<AgGridReact | null>(null);
  const defaultColDef = useMemo( () => ({
    sortable: true, 
    filter: true, 
    enableRowGroup: true
  }), [])
  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: 'amount' },
          { field: 'type' },
          { field: 'year' },
          { field: 'month'},
          { field: 'date' },
        ],
        defaultColDef: {
          flex: 1,
          sortable: true, 
          filter: true, 
          enableRowGroup: true
        },
        rowSelection: "multiple",
        rowGroupPanelShow:"always",
        alwaysShowHorizontalScroll: true,
        alwaysShowVerticalScroll: true,
        
      },
      getDetailRowData: (params: GetDetailRowDataParams) => {
        params.successCallback(params.data.payments)
      },
    };
  }, []);
  const columnsDefs =[
    { field: "client", cellRenderer: 'agGroupCellRenderer'},
    { field: "contact" },
    { field: "debt", valueFormatter: valueFormatterToDH },
    { field: "pending", valueFormatter: valueFormatterToDH},
    {field: "year"},
    {field: "date"},
    { field: "transactions" },
  ];
  
 
  const cellClickedListener = useCallback((e: { value: any }) => {
    console.log('cellClicked', e.value);
  }, []);
  return (
    <div className="h-full overflow-y-scroll container ag-theme-material">
      <AgGridReact
        defaultColDef={defaultColDef}
        masterDetail={true}
        detailRowHeight={300}
        
        detailCellRendererParams={detailCellRendererParams}
        ref={gridRef}
        rowGroupPanelShow="always"
        enableRangeSelection={true}
        enableCharts={true}
        animateRows={true}
        detailRowAutoHeight={true}
        rowSelection="multiple"
        domLayout="autoHeight"
        alwaysShowHorizontalScroll={true}
        alwaysShowVerticalScroll={true}
        rowData={rowData}
        columnDefs={columnsDefs}
        onCellClicked={cellClickedListener}
      />
    </div>
  );
}

export default CreditorsViewer;
