import React from 'react';


export namespace CustomTableParts {
  export interface Column {
    label: string;
    sortable?: boolean;
    filterable?: boolean;
    className?: string;
  }

  export type CellClickHandler = (row: Row, cell: Cell) => void;

  export interface ReactCell {
    /**
     * Data UI representation
     */
    representation: React.ReactNode;
    /**
     * Click handler
     * @param row clicked row
     * @param cell clicked cell
     */
    onClick?: CellClickHandler;
    /**
     * Data text representation for filtering and sorting
     */
    value?: CellValue;
    /**
     * Cell TD class name
     */
    className?: string | null;
  }

  export type CellValue = string | number | boolean | null;

  export type Cell = ReactCell | CellValue;

  export interface ExpandableRowBehavior {
    expandableContent: (row: Row) => React.ReactNode;
  }

  export interface HandleClickBehavior {
    handler: (row: Row) => void;
  }

  export type RowBehavior = ExpandableRowBehavior | HandleClickBehavior;

  export type Row = { [key: string]: Cell };
}

