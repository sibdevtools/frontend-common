import React, { useState } from 'react';
import { CustomTableParts } from '../types';
import { getCellClassName, getCellRepresentation } from '../utils';


export interface StyleProps {
  textCenterValues: boolean,
}

export interface CustomTableBodyProps {
  data: CustomTableParts.Row[];
  rowBehavior?: CustomTableParts.RowBehavior;
  styleProps?: StyleProps;
}

export interface CustomTableBodyInnerProps extends CustomTableBodyProps {
  columns: Record<string, CustomTableParts.Column>;
}

const CustomTableBody: React.FC<CustomTableBodyInnerProps> = ({
                                                                columns,
                                                                data,
                                                                rowBehavior,
                                                                styleProps = {
                                                                  textCenterValues: true,
                                                                }
                                                              }) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

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
      {
        data.map((row, index) => {
            if (rowBehavior && 'handler' in rowBehavior) {
              return (
                <tr
                  onClick={() => rowBehavior.handler(row)}
                  role={'button'}
                >
                  {Object.keys(columns).map((key) => {
                    const cellOnClick = getCellOnClick(row, row[key]);
                    return (
                      <td
                        className={`${styleProps.textCenterValues ? 'text-center' : ''} ${getCellClassName(row[key])}`.trim()}
                        onClick={cellOnClick}
                        role={cellOnClick ? 'button' : undefined}
                        key={key}>{getCellRepresentation(row[key])}</td>
                    );
                  })}
                </tr>
              );
            }
            if (rowBehavior && 'expandableContent' in rowBehavior) {
              return (
                <React.Fragment key={index}>
                  <tr
                    onClick={() => toggleRowExpand(index)}
                    role={'button'}
                  >
                    {Object.keys(columns).map((key) => {
                      const cellOnClick = getCellOnClick(row, row[key]);
                      return (
                        <td
                          className={`${styleProps.textCenterValues ? 'text-center' : ''} ${getCellClassName(row[key])}`.trim()}
                          onClick={cellOnClick}
                          role={cellOnClick ? 'button' : undefined}
                          key={key}>{getCellRepresentation(row[key])}</td>
                      );
                    })}
                  </tr>
                  {expandedRows.has(index) && (
                    <tr key={`details-${index}`} className="expandable-row">
                      <td colSpan={Object.entries(columns).length}>
                        {rowBehavior.expandableContent(row)}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            }
            return (
              <tr>
                {Object.keys(columns).map((key) => {
                  return (
                    <td
                      className={`${styleProps.textCenterValues ? 'text-center' : ''} ${getCellClassName(row[key])}`.trim()}
                      key={key}>{getCellRepresentation(row[key])}</td>
                  );
                })}
              </tr>
            );
          }
        )
      }
    </>
  )
}


export default CustomTableBody;
