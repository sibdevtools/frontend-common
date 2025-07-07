import React from 'react';
import { CustomTableParts } from '../types';
import CustomTableBodyRow from './CustomTableBodyRow';

export interface CustomTableBodyProps {
  columns: Record<string, CustomTableParts.Column>;
  data: CustomTableParts.Row[];
  rowBehavior?: CustomTableParts.RowBehavior;
}

const CustomTableBodyWithoutPagination: React.FC<CustomTableBodyProps> = ({
                                                                            columns,
                                                                            data,
                                                                            rowBehavior,
                                                                          }) => {
  return (
    <>
      {data.map((row, index) => {
        return (
          <CustomTableBodyRow
            columns={columns}
            row={row}
            rowBehavior={rowBehavior}
            rowIndex={index}
          />
        );
      })}
    </>
  );
};

export default CustomTableBodyWithoutPagination;
