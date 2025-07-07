import React, { useEffect, useState } from 'react';
import { CustomTableParts } from '../types';
import { Button } from 'react-bootstrap';
import { ButtonVariant } from 'react-bootstrap/types';
import CustomTableBodyRow from './CustomTableBodyRow';

export interface CustomTableBodyPaginationProps {
  buttons?: {
    previous?: React.ReactNode
    next?: React.ReactNode
    variant?: ButtonVariant;
    size?: 'sm' | 'lg'
  }
  pageSize: number;
  initialPage?: number;
}

export interface CustomTableBodyWithPaginationProps {
  columns: Record<string, CustomTableParts.Column>;
  data: CustomTableParts.Row[];
  rowBehavior?: CustomTableParts.RowBehavior;
  pagination: CustomTableBodyPaginationProps
}

const CustomTableBodyWithPagination: React.FC<CustomTableBodyWithPaginationProps> = ({
                                                                                       columns,
                                                                                       data,
                                                                                       rowBehavior,
                                                                                       pagination
                                                                                     }) => {
  const pageSize = pagination.pageSize;
  const [currentPage, setCurrentPage] = useState(pagination.initialPage ?? 1);

  useEffect(() => {
    const total = Math.ceil(data.length / pageSize);
    if (currentPage > total) {
      setCurrentPage(total > 0 ? total : 1);
    }
  }, [data, pageSize, currentPage]);

  const startIndex = (currentPage - 1) * (pageSize || 0);
  const endIndex = startIndex + (pageSize || 0);
  const paginatedData = pageSize ? data.slice(startIndex, endIndex) : data;
  const totalPages = Math.max(1, pageSize ? Math.ceil(data.length / pageSize) : 1);

  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => prev + 1);

  return (
    <>
      {paginatedData.map((row, paginatedIndex) => {
        const originalIndex = pageSize ? startIndex + paginatedIndex : paginatedIndex;

        return (
          <CustomTableBodyRow
            columns={columns}
            row={row}
            rowBehavior={rowBehavior}
            rowIndex={originalIndex}
          />
        );
      })}
      <tr key="pagination-row">
        <td colSpan={Object.keys(columns).length}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center' }}>
            <Button
              variant={pagination.buttons?.variant ?? 'outline-secondary'}
              size={pagination.buttons?.size}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              {pagination.buttons?.previous ?? '<'}
            </Button>
            <span>{currentPage} / {totalPages}</span>
            <Button
              variant={pagination.buttons?.variant ?? 'outline-secondary'}
              size={pagination.buttons?.size}
              onClick={handleNext}
              disabled={currentPage >= totalPages}
            >
              {pagination.buttons?.next ?? '>'}
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default CustomTableBodyWithPagination;
