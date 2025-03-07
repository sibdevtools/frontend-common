import React, { useEffect, useState } from 'react';
import { CustomTableParts } from '../types';
import { Form } from 'react-bootstrap';

export interface ColumnSort {
  column: string;
  direction: SortDirection
}

export interface CustomTableHeadProps {
  className?: string;
  columns: Record<string, CustomTableParts.Column>;
}

export interface CustomTableHeadInnerProps {
  onFilterChanged: (filter: { [key: string]: string }) => void;
  onSortChanged: (sort: ColumnSort) => void;
  onSortDirectionChanged: (direction: SortDirection) => void;
}

export type SortDirection = 'asc' | 'desc';

export const CustomTableHead: React.FC<CustomTableHeadProps & CustomTableHeadInnerProps> = (
  ({
     className,
     columns,
     onFilterChanged,
     onSortChanged,
     onSortDirectionChanged,
   }) => {
    const [filter, setFilter] = useState<{ [key: string]: string }>({});
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

    useEffect(() => {
      onFilterChanged(filter)
    }, [filter]);

    const handleSort = (key: string, column: CustomTableParts.Column) => {
      if (!column.sortable) return;
      const direction = sortColumn === key && sortDirection === 'asc' ? 'desc' : 'asc';
      if(sortColumn !== key) {
        setSortColumn(key);
        onSortChanged({column: key, direction: direction})
      } else {
        onSortDirectionChanged(direction)
      }
      setSortDirection(direction);
    };

    return (
      <thead className={`table-dark ${className ?? ''}`}>
      <tr>
        {Object.entries(columns).map(([key, column]) => (
          <th
            key={key}
            onClick={() => handleSort(key, column)}
            className={column.className}
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
