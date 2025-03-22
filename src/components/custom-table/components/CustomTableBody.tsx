import React, { useEffect, useState } from 'react';
import { CustomTableParts } from '../types';
import { getCellClassName, getCellRepresentation } from '../utils';
import { Button } from 'react-bootstrap';

export interface CustomTableBodyProps {
  data: CustomTableParts.Row[];
  rowBehavior?: CustomTableParts.RowBehavior;
  pageSize?: number;
  initialPage?: number;
}

export interface CustomTableBodyInnerProps extends CustomTableBodyProps {
  columns: Record<string, CustomTableParts.Column>;
}

const CustomTableBody: React.FC<CustomTableBodyInnerProps> = ({
                                                                columns,
                                                                data,
                                                                rowBehavior,
                                                                pageSize,
                                                                initialPage = 1,
                                                              }) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (pageSize) {
      const total = Math.ceil(data.length / pageSize);
      if (currentPage > total) {
        setCurrentPage(total > 0 ? total : 1);
      }
    }
  }, [data, pageSize, currentPage]);

  const startIndex = (currentPage - 1) * (pageSize || 0);
  const endIndex = startIndex + (pageSize || 0);
  const paginatedData = pageSize ? data.slice(startIndex, endIndex) : data;
  const totalPages = pageSize ? Math.ceil(data.length / pageSize) : 0;

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => prev + 1);

  const getCellOnClick = (row: CustomTableParts.Row, cell: CustomTableParts.Cell): undefined | (() => void) => {
    if (!cell) {
      return undefined;
    }
    if (typeof cell === 'string' || typeof cell === 'number' || typeof cell === 'boolean') {
      return undefined;
    }
    const onClick = cell.onClick;
    if (!onClick) {
      return undefined;
    }
    return () => onClick(row, cell);
  };

  const toggleRowExpand = (index: number) => {
    setExpandedRows((prevExpandedRows) => {
      const newExpandedRows = new Set(prevExpandedRows);
      if (newExpandedRows.has(index)) {
        newExpandedRows.delete(index);
      } else {
        newExpandedRows.add(index);
      }
      return newExpandedRows;
    });
  };

  return (
    <>
      {paginatedData.map((row, paginatedIndex) => {
        const originalIndex = pageSize ? startIndex + paginatedIndex : paginatedIndex;

        if (rowBehavior && 'handler' in rowBehavior) {
          return (
            <tr
              onClick={() => rowBehavior.handler(row)}
              role="button"
              key={`row_${originalIndex}`}
            >
              {Object.keys(columns).map((key) => {
                const cellOnClick = getCellOnClick(row, row[key]);
                return (
                  <td
                    className={`${getCellClassName(row[key])}`.trim()}
                    onClick={cellOnClick}
                    role={cellOnClick ? 'button' : undefined}
                    key={`cell_${key}_${originalIndex}`}
                  >
                    {getCellRepresentation(row[key])}
                  </td>
                );
              })}
            </tr>
          );
        }
        if (rowBehavior && 'expandableContent' in rowBehavior) {
          return (
            <React.Fragment key={`expandableRow_${originalIndex}`}>
              <tr
                onClick={() => toggleRowExpand(originalIndex)}
                role="button"
                key={`row_${originalIndex}`}
              >
                {Object.keys(columns).map((key) => {
                  const cellOnClick = getCellOnClick(row, row[key]);
                  return (
                    <td
                      className={`${getCellClassName(row[key])}`.trim()}
                      onClick={cellOnClick}
                      role={cellOnClick ? 'button' : undefined}
                      key={`cell_${key}_${originalIndex}`}
                    >
                      {getCellRepresentation(row[key])}
                    </td>
                  );
                })}
              </tr>
              {expandedRows.has(originalIndex) && (
                <tr key={`details_${originalIndex}`} className="expandable-row">
                  <td colSpan={Object.keys(columns).length}>
                    {rowBehavior.expandableContent(row)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        }

        return (
          <tr key={`row_${originalIndex}`}>
            {Object.keys(columns).map((key) => (
              <td
                className={`${getCellClassName(row[key])}`.trim()}
                key={`cell_${key}_${originalIndex}`}
              >
                {getCellRepresentation(row[key])}
              </td>
            ))}
          </tr>
        );
      })}

      {pageSize !== undefined && (
        <tr key="pagination-row">
          <td colSpan={Object.keys(columns).length}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
              <Button
                variant={'outline-secondary'}
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                {'<'}
              </Button>
              <span>{currentPage} / {totalPages}</span>
              <Button
                variant={'outline-secondary'}
                onClick={handleNext}
                disabled={currentPage >= totalPages}
              >
                {'>'}
              </Button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default CustomTableBody;
