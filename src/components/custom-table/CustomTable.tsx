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
  thread: CustomTableHeadProps;
  tbody: CustomTableBodyProps;
  loading?: boolean;
}

export const CustomTable: React.FC<CustomTableProps> = ({
                                                          table,
                                                          thread,
                                                          tbody,
                                                          loading = false
                                                        }) => {
  const [preparedData, setPreparedData] = useState<CustomTableParts.Row[]>(tbody.data)
  const customTableHeadRef = useRef<CustomTableHeadHandle>(null);

  useEffect(() => {
    const preparedData = tbody.data
      .filter((item) => {
        const filter = customTableHeadRef?.current?.getFilter() ?? {}
        return Object.entries(filter).every(([key, value]) => {
          if (!value) return true;
          return filterCell(item, key, value);
        });
      })
      .sort(customTableHeadRef?.current?.getRowComparator());
    setPreparedData(preparedData)
  }, [tbody.data, customTableHeadRef.current]);

  return (
    <Table
      {...table}
    >
      <CustomTableHead
        ref={customTableHeadRef}
        {...thread}
      />
      <tbody>
      {loading ? (
        <tr>
          <td colSpan={Object.entries(thread.columns).length}>
            <Loader />
          </td>
        </tr>
      ) : <CustomTableBody {...tbody}
                           columns={thread.columns}
                           data={preparedData} />
      }
      </tbody>
    </Table>
  );
};
