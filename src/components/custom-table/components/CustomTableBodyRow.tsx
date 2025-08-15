import React, { useState } from 'react';
import { CustomTableParts } from '../types';
import { getCellClassName, getCellRepresentation } from '../utils';

export interface CustomTableBodyRowProps {
  columns: Record<string, CustomTableParts.Column>;
  row: CustomTableParts.Row;
  rowBehavior?: CustomTableParts.RowBehavior;
  rowIndex: number;
}

const CustomTableBodyRow: React.FC<CustomTableBodyRowProps> = ({
                                                                 columns,
                                                                 row,
                                                                 rowBehavior,
                                                                 rowIndex
                                                               }) => {
  const [expanded, setExpanded] = useState<boolean>(false)

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

  const toggleRowExpand = () => {
    setExpanded((was) => !was)
  };

  if (rowBehavior && 'handler' in rowBehavior) {
    return (
      <tr
        onClick={() => rowBehavior.handler(row)}
        role="button"
        key={`row_${rowIndex}`}
      >
        {Object.keys(columns).map((key) => {
          const cellOnClick = getCellOnClick(row, row[key]);
          return (
            <td
              className={`${getCellClassName(row[key])}`.trim()}
              onClick={cellOnClick}
              role={cellOnClick ? 'button' : undefined}
              key={`cell_${key}_${rowIndex}`}
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
      <React.Fragment key={`expandableRow_${rowIndex}`}>
        <tr
          onClick={() => toggleRowExpand()}
          role="button"
          key={`row_${rowIndex}`}
        >
          {Object.keys(columns).map((key) => {
            const cellOnClick = getCellOnClick(row, row[key]);
            return (
              <td
                className={`${getCellClassName(row[key])}`.trim()}
                onClick={cellOnClick}
                role={cellOnClick ? 'button' : undefined}
                key={`cell_${key}_${rowIndex}`}
              >
                {getCellRepresentation(row[key])}
              </td>
            );
          })}
        </tr>
        {expanded && (
          <tr key={`details_${rowIndex}`} className="expandable-row">
            <td colSpan={Object.keys(columns).length}>
              {rowBehavior.expandableContent(row)}
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  }

  return (
    <tr key={`row_${rowIndex}`}>
      {Object.keys(columns).map((key) => {
        const cellOnClick = getCellOnClick(row, row[key]);
        return (
          <td
            className={`${getCellClassName(row[key])}`.trim()}
            onClick={cellOnClick}
            role={cellOnClick ? 'button' : undefined}
            key={`cell_${key}_${rowIndex}`}
          >
            {getCellRepresentation(row[key])}
          </td>
        );
      })}
    </tr>
  );
};

export default CustomTableBodyRow;
