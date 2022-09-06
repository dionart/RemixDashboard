import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { IRemixModel, SortDirectionEnum } from '@/graphql/types/_server';
import AbsoluteLoading from '../ui/AbsoluteLoading/AbsoluteLoading';

interface RemixListProps {
  data: IRemixModel[];
  isLoading: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onFetchMore: () => void;
  onSort: (order: SortDirectionEnum) => void;
}

const tableHeaders = [
  'Name',
  'Description',
  'Author email',
  'Genre',
  'Price',
  'Available on store',
  'Edit',
  'Delete'
];

const RemixList: React.FC<RemixListProps> = ({
  data,
  onEdit,
  onDelete,
  onFetchMore,
  onSort,
  isLoading
}) => {
  const [isAscending, setIsAscending] = useState(true);

  const handleSort = () => {
    console.log('entrei', isAscending);
    setIsAscending(!isAscending);
    onSort(isAscending ? SortDirectionEnum.Asc : SortDirectionEnum.Desc);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {/* {tableHeaders.map((item, index) => (
              <TableCell key={item}>
                <TableSortLabel
                  direction={isAscending ? 'asc' : 'desc'}
                  onClick={() => console.log('aa')}
                >
                  {item}
                </TableSortLabel>
              </TableCell>
            ))} */}
            <TableCell>
              <TableSortLabel direction={isAscending ? 'asc' : 'desc'} onClick={() => handleSort()}>
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Author email</TableCell>
            <TableCell align="right">Genre</TableCell>
            <TableCell align="right">Track length</TableCell>
            <TableCell align="right">Price ($)</TableCell>
            <TableCell align="right">Available on store</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && <AbsoluteLoading />}
          {data &&
            data.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.authorEmail}</TableCell>
                <TableCell align="right">{row.genre}</TableCell>
                <TableCell align="right">{row.trackLength}</TableCell>
                <TableCell align="right">${row.price}</TableCell>
                <TableCell align="right">{row.isStore.toString()}</TableCell>
                <TableCell align="center">
                  <Edit color="action" onClick={() => onEdit(row.id)} />
                </TableCell>
                <TableCell align="center">
                  <Delete onClick={() => onDelete(row.id)} color="action" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Typography onClick={onFetchMore} align="center" paddingBottom="10px">
        {isLoading ? 'Loading...' : 'Load more'}
      </Typography>
    </TableContainer>
  );
};

export default RemixList;
