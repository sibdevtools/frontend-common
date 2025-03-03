import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Loader } from '../loader';
import { filterCell } from './utils';
import CustomTableHead, { CustomTableHeadHandle, CustomTableHeadProps } from './components/CustomTableHead';
import { TableProps } from 'react-bootstrap/Table';
import CustomTableBody, { CustomTableBodyProps } from './components/CustomTableBody';
import { CustomTableParts } from './types';

export interface CustomTableProps {
  table?: TableProps & React.RefAttributes<HTMLTableElement>;
  thead: CustomTableHeadProps;
  tbody: CustomTableBodyProps;
  loading?: boolean;
}

export const CustomTable: React.FC<CustomTableProps> = ({
                                                          table,
                                                          thead,
                                                          tbody,
                                                          loading = false
                                                        }) => {
  const [preparedData, setPreparedData] = useState<CustomTableParts.Row[]>(tbody.data)
  const customTableHeadRef = useRef<CustomTableHeadHandle>(null);

  useEffect(() => {
    const filter = customTableHeadRef?.current?.getFilter() ?? {}
    const sort = customTableHeadRef?.current?.getRowComparator()
    const preparedData = tbody.data
      .filter((item) => {
        return Object.entries(filter).every(([key, value]) => {
          if (!value) return true;
          return filterCell(item, key, value);
        });
      })
      .sort(sort);
    setPreparedData(preparedData);
  }, [tbody.data]);

  return (
    <Table
      {...table}
    >
      <CustomTableHead
        ref={customTableHeadRef}
        {...thead}
      />
      <tbody>
      {loading ? (
        <tr>
          <td colSpan={Object.entries(thead.columns).length}>
            <Loader />
          </td>
        </tr>
      ) : <CustomTableBody {...tbody}
                           columns={thead.columns}
                           data={preparedData} />
      }
      </tbody>
    </Table>
  );
};
