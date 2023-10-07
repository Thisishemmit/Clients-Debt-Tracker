// index.tsx

import { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-material.min.css";
import { IClient } from "./interfaces";
import DetailCellRenderer from "./ClientDetailsViewer";
import { ColDef, ValueFormatterParams } from "ag-grid-enterprise";
import './style.css'
import { FirstDataRenderedEvent } from "ag-grid-community";
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

const GridExample = () => {
  const gridRef = useRef<AgGridReact<IClient>>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<IClient[]>([
    // Placeholder data
    {
      id :1,
      name: "John Doe",
      contact: "123-456-7890",
      debt: 5000,
      pending: 2000,
      year: 2022,
      date: "2022-10-01",
      payments: [
        {id :1, amount: 1000, type: "IN",category: "-", year: 2022, month: 10, date: "2022-10-02" },
        {id :1, amount: 500, type: "OUT",category: "Personal",year: 2022, month: 10, date: "2022-10-05" },
      ],
    },
    {
      id :1,
      name: "John Doe",
      contact: "123-456-7890",
      debt: 5000,
      pending: 2000,
      year: 2022,
      date: "2022-10-01",
      payments: [
        {id :1, amount: 1000, type: "IN",category: "-", year: 2022, month: 10, date: "2022-10-02" },
        {id :1, amount: 500, type: "OUT",category: "Personal",year: 2022, month: 10, date: "2022-10-05" },
      ],
    },
  ]);

  const columnDefs: ColDef[] = useMemo(
    () => [
      {field: "id", hide: true},
      { field: "name", cellRenderer: "agGroupCellRenderer" },
      { field: "contact", },
      { field: "debt", valueFormatter: valueFormatterToDH },
      { field: "pending", valueFormatter: valueFormatterToDH },
      { field: "year" },
      { field: "date" },
    ],
    []
  );
  const defaultColDef: ColDef = {
    flex: 1,
    sortable: true, 
    filter: true, 
    enableRowGroup: true,
    resizable: true 
  };

  const detailCellRenderer = useMemo(() => DetailCellRenderer, []);
  const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
    gridRef.current!.api.forEachNode(function (node) {
      node.setExpanded(node.id === '1');
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div
          style={gridStyle}
          className="ag-theme-material p-3 overflow-y-scroll h-full w-full"
        >
          <AgGridReact<IClient>
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            alwaysShowHorizontalScroll={true}
            alwaysShowVerticalScroll={true}
            masterDetail={true}
            embedFullWidthRows={true}
            detailRowHeight={300}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            rowGroupPanelShow="always"
            
            domLayout="autoHeight"
            detailCellRenderer={detailCellRenderer}
            onFirstDataRendered={onFirstDataRendered}
            enableRangeSelection={true}
            enableCharts={true}
            animateRows={true}
          />
        </div>
      </div>
    </div>
  );
};

export default GridExample;
