import React from 'react';
import { CustomTableParts } from '../types';
import CustomTableBodyWithPagination, { CustomTableBodyPaginationProps } from './CustomTableBodyWithPagination';
import CustomTableBodyWithoutPagination from './CustomTableBodyWithoutPagination';

export interface CustomTableBodyProps {
  data: CustomTableParts.Row[];
  rowBehavior?: CustomTableParts.RowBehavior;
  pagination?: CustomTableBodyPaginationProps
}

export interface CustomTableBodyInnerProps extends CustomTableBodyProps {
  columns: Record<string, CustomTableParts.Column>;
}

const CustomTableBody: React.FC<CustomTableBodyInnerProps> = ({
                                                                columns,
                                                                data,
                                                                rowBehavior,
                                                                pagination
                                                              }) => {
  if (pagination) {
    return (<CustomTableBodyWithPagination
        columns={columns}
        data={data}
        rowBehavior={rowBehavior}
        pagination={pagination}
      />
    );
  }
  return (<CustomTableBodyWithoutPagination
      columns={columns}
      data={data}
      rowBehavior={rowBehavior}
    />
  );
};

export default CustomTableBody;
