import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Form } from 'react-bootstrap';
import { CustomTableParts } from '../types';
import { getCellValue } from '../utils';

export interface StyleProps {
  centerHeaders: boolean,
}

export interface CustomTableHeadProps {
  className?: string;
  columns: Record<string, CustomTableParts.Column>;
  styleProps?: StyleProps;
}

export interface CustomTableHeadHandle {
  getFilter: () => { [key: string]: string }
  getRowComparator: () => ((a: CustomTableParts.Row, b: CustomTableParts.Row) => number)
}

type SortDirection = 'asc' | 'desc';

export const CustomTableHead = forwardRef<CustomTableHeadHandle, CustomTableHeadProps>(
  ({
     className,
     columns,
     styleProps = {
       centerHeaders: true,
     },
   }: CustomTableHeadProps, ref) => {
    const [filter, setFilter] = useState<{ [key: string]: string }>({});
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    useImperativeHandle(ref, () => ({
      getFilter: () => filter,
      getRowComparator: () => {
        return (a: CustomTableParts.Row, b: CustomTableParts.Row) => {
          if (!sortColumn) return 0;
          let aValue = getCellValue(a[sortColumn]);
          let bValue = getCellValue(b[sortColumn]);
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            if (aValue === bValue) {
              return 0;
            }
            if (sortDirection === 'asc') {
              return aValue > bValue ? 1 : -1;
            }
            return aValue > bValue ? -1 : 1;
          }
          if (typeof aValue !== 'string') {
            aValue = `${aValue}`;
          }
          if (typeof bValue !== 'string') {
            bValue = `${bValue}`;
          }

          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        };
      }
    }));

    const handleSort = (key: string, column: CustomTableParts.Column) => {
      if (!column.sortable) return;
      const direction = sortColumn === key && sortDirection === 'asc' ? 'desc' : 'asc';
      setSortColumn(key);
      setSortDirection(direction);
    };

    return (
      <thead className={`table-dark ${className ?? ''}`}>
      <tr className={`${styleProps.centerHeaders ? 'text-center' : ''}`}>
        {Object.entries(columns).map(([key, column]) => (
          <th
            key={key}
            onClick={() => handleSort(key, column)}
            style={{ cursor: column.sortable ? 'pointer' : 'default' }}
          >
            {column.label}
            {column.sortable && sortColumn === key && (
              sortDirection === 'asc' ? ' ▲' : ' ▼'
            )}
          </th>
        ))}
      </tr>
      <tr>
        {Object.entries(columns).map(([key, column]) => (
          <th key={`filter-${key}`}>
            {column.filterable && (
              <Form.Control
                type={'text'}
                placeholder={`Filter ${column.label}`}
                value={filter[key] || ''}
                onChange={(e) => setFilter({ ...filter, [key]: e.target.value })}
              />
            )}
          </th>
        ))}
      </tr>
      </thead>
    );
  }
);

export default CustomTableHead;
