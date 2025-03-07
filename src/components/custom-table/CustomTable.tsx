import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Loader } from '../loader';
import { filterCell, getCellValue } from './utils';
import CustomTableHead, {
  ColumnSort,
  CustomTableHeadProps
} from './components/CustomTableHead';
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
  const [filter, setFilter] = useState<{ [key: string]: string }>({});
  const [columnSort, setColumnSort] = useState<ColumnSort>({
    column: '',
    direction: 'asc'
  });

  const comparator = (a: CustomTableParts.Row, b: CustomTableParts.Row): number => {
    if (!columnSort.column) return 0;
    let aValue = getCellValue(a[columnSort.column]);
    let bValue = getCellValue(b[columnSort.column]);

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      if (aValue === bValue) return 0;
      return columnSort.direction === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue > bValue ? -1 : 1);
    }

    if (typeof aValue !== 'string') aValue = `${aValue}`;
    if (typeof bValue !== 'string') bValue = `${bValue}`;

    return columnSort.direction === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  };

  useEffect(() => {
    const preparedData = tbody.data
      .filter((item) => {
        return Object.entries(filter).every(([key, value]) => {
          if (!value) return true;
          return filterCell(item, key, value);
        });
      })
      .sort(comparator);
    setPreparedData(preparedData);
  }, [tbody.data]);

  useEffect(() => {
    const preparedData = tbody.data
      .filter((item) => {
        return Object.entries(filter).every(([key, value]) => {
          if (!value) return true;
          return filterCell(item, key, value);
        });
      })
      .sort(comparator);
    setPreparedData(preparedData);
  }, [filter]);

  useEffect(() => {
      const sortedPreparedData = [...preparedData].sort(comparator);
      setPreparedData(sortedPreparedData);
    },
    [columnSort]
  );

  return (
    <Table
      {...table}
    >
      <CustomTableHead
        {...thead}
        onFilterChanged={it => setFilter(it)}
        onSortDirectionChanged={it => setColumnSort({ ...columnSort, direction: it })}
        onSortChanged={it => setColumnSort(it)}
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
