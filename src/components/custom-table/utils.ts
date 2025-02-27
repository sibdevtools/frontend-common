import React from 'react';
import { CustomTableParts } from './types';


export const getCellValue = (cell: CustomTableParts.Cell): string | number => {
  if (!cell) {
    return '';
  }
  if (typeof cell == 'string' || typeof cell === 'number') {
    return cell;
  }
  if (typeof cell === 'boolean') {
    return `${cell}`;
  }
  if (typeof cell.value === 'string' || typeof cell.value === 'number') {
    return cell.value;
  }
  return cell.value ? `${cell.value}` : '';
};

export const getCellRepresentation = (cell: CustomTableParts.Cell): React.ReactNode => {
  if (!cell) {
    return '';
  }
  if (typeof cell === 'string' || typeof cell === 'number' || typeof cell === 'boolean') {
    return cell;
  }
  return cell.representation;
};

export const getCellClassName = (cell: CustomTableParts.Cell): React.ReactNode => {
  if (!cell || typeof cell === 'string' || typeof cell === 'number' || typeof cell === 'boolean') {
    return '';
  }
  return cell.className ?? '';
};


export const filterCell = (item: CustomTableParts.Row, key: string, value: string): boolean => {
  if (!value) return true;
  const cell = item[key];
  let cellValue = getCellValue(cell);
  if (typeof cellValue === 'number') {
    return filterNumberCell(cellValue, value);
  }
  return cellValue.toLowerCase().includes(value.toLowerCase());
};

const filterNumberCell = (cellValue: number, filter: string): boolean => {
  if (filter.startsWith('>=')) {
    const numberValue = +filter.substring(2);
    return cellValue >= numberValue;
  }
  if (filter.startsWith('>')) {
    const numberValue = +filter.substring(1);
    return cellValue > numberValue;
  }
  if (filter.startsWith('<=')) {
    const numberValue = +filter.substring(2);
    return cellValue <= numberValue;
  }
  if (filter.startsWith('<')) {
    const numberValue = +filter.substring(1);
    return cellValue < numberValue;
  }
  if (filter.startsWith('==')) {
    const numberValue = +filter.substring(2);
    return cellValue === numberValue;
  }
  return `${cellValue}`.toLowerCase().includes(filter.toLowerCase());
};


