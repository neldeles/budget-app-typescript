import * as React from "react";
import { useTable, Column } from "react-table";

export type TTableProps = {
  tableName: string;
  /** `columns` table option of `react-table` https://react-table.tanstack.com/docs/api/useTable */
  columns: Array<Column>;
  /** `data` table option of `react-table` https://react-table.tanstack.com/docs/api/useTable */
  data: Array<any>;
};

export function Table(props: TTableProps) {
  const data = React.useMemo(() => props.data, [props.data]);

  const columns = React.useMemo(() => props.columns, [props.columns]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <div className="flex flex-col mb-12">
        <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 sm:px-6 lg:px-8 min-w-full align-middle">
            <h3 className="mb-6 text-lg font-medium leading-6 text-gray-900">
              {props.tableName}
            </h3>
            <div className="overflow-hidden sm:rounded-lg border-b border-gray-200 shadow">
              <table
                {...getTableProps()}
                className="min-w-full bg-gray-50 divide-y divide-gray-200"
              >
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="py-3 px-6 text-xs font-bold tracking-wider text-left text-gray-500 uppercase"
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        {...row.getRowProps()}
                        // className={row.id % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="py-4 px-6 text-sm font-normal text-gray-900 whitespace-nowrap"
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
