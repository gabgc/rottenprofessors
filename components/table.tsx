/* eslint-disable react/jsx-key */
import React from "react";
import { useTable, Column } from "react-table";

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
}

function Table<T extends { id: number }>({ columns, data }: TableProps<T>) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<T>({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table className="w-full table table-auto" {...getTableProps()} border={1}>
      <thead className="table-header-group">
        {headerGroups.map((headerGroup) => (
          <tr className="table-row" {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className="table-cell" {...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
