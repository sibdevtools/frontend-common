import React, { useEffect, useState } from 'react';
import { CustomTableParts } from '../types';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { loadTableState, saveTableState, TableState } from '../utils/filterStorage';

export interface ColumnSort {
  column: string;
  direction: SortDirection
}

export interface CustomTableHeadProps {
  className?: string;
  columns: Record<string, CustomTableParts.Column>;
  defaultSort?: ColumnSort;
  tableId?: string;
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
     defaultSort,
     tableId,
     onFilterChanged,
     onSortChanged,
     onSortDirectionChanged,
   }) => {
    const [tableState] = useState<TableState>(() => {
      if (tableId) {
        return loadTableState(tableId);
      }
      return { filters: {} };
    });

    const [filter, setFilter] = useState<{ [key: string]: string }>(tableState.filters);
    const [sortColumn, setSortColumn] = useState<string>(() => {
      // Priority: saved state > defaultSort > empty
      return tableState.sort?.column || defaultSort?.column || '';
    });
    const [sortDirection, setSortDirection] = useState<SortDirection>(() => {
      // Priority: saved state > defaultSort > 'asc'
      return tableState.sort?.direction || defaultSort?.direction || 'asc';
    });

    // Initialize sort on component mount if we have saved or default sort
    useEffect(() => {
      if (sortColumn) {
        onSortChanged({ column: sortColumn, direction: sortDirection });
      }
    }, []); // Only run on mount

    useEffect(() => {
      if (!defaultSort) {
        return
      }
      // Only apply defaultSort if we don't have saved state
      if (!tableState.sort) {
        setSortColumn(defaultSort.column)
        setSortDirection(defaultSort.direction)
        onSortChanged(defaultSort)
      }
    }, [defaultSort]);

    useEffect(() => {
      onFilterChanged(filter);

      if (tableId) {
        const newState: TableState = {
          filters: filter,
          sort: sortColumn ? { column: sortColumn, direction: sortDirection } : undefined
        };
        saveTableState(tableId, newState);
      }
    }, [filter, sortColumn, sortDirection, tableId]);

    const handleSort = (key: string, column: CustomTableParts.Column) => {
      if (!column.sortable) return;
      const direction = sortColumn === key && sortDirection === 'asc' ? 'desc' : 'asc';
      if (sortColumn !== key) {
        setSortColumn(key);
        onSortChanged({ column: key, direction: direction })
      } else {
        onSortDirectionChanged(direction)
      }
      setSortDirection(direction);
    };

    const handleClearFilter = (key: string) => {
      const newFilter = { ...filter };
      delete newFilter[key];
      setFilter(newFilter);
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
              <InputGroup size="sm">
                <Form.Control
                  type={'text'}
                  placeholder={`Filter ${column.label}`}
                  value={filter[key] || ''}
                  onChange={(e) => setFilter({ ...filter, [key]: e.target.value })}
                />
                {filter[key] && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleClearFilter(key)}
                    style={{ borderLeft: 'none' }}
                  >
                    ✕
                  </Button>
                )}
              </InputGroup>
            )}
          </th>
        ))}
      </tr>
      </thead>
    );
  }
);

export default CustomTableHead;
