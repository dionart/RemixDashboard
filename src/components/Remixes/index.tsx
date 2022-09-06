/* eslint-disable react/jsx-no-undef */
import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Edit, Delete, AddCircle } from '@mui/icons-material';
import { Container } from '@mui/system';
import { GET_REMIXES } from '@/graphql/queries';
import { IQueryRemixesArgs, IRemixesModel, SortDirectionEnum } from '../../graphql/types/_server';

import { styles } from './styles';
import RemixModal from '@/shared/RemixModal';
import DeleteModal from '@/shared/DeleteModal';
import AbsoluteLoading from '@/shared/ui/AbsoluteLoading/AbsoluteLoading';
import ScrollToTop from '@/shared/ScrollToTop/ScrollToTop';
import RemixList from '@/shared/RemixList';

// const data = {
//   remixes: {
//     items: [
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T15:13:24.469Z',
//         description: '',
//         genre: 'electronic',
//         id: 364,
//         isStore: true,
//         name: 'Ken To',
//         price: 100,
//         trackLength: 0,
//         updatedDate: '2022-08-18T16:14:57.647Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T15:12:54.114Z',
//         description: '',
//         genre: 'electronic',
//         id: 363,
//         isStore: true,
//         name: 'KeyKou',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T15:12:54.114Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'totalMotal@gmail.com',
//         createdDate: '2022-08-18T15:11:53.987Z',
//         description: '',
//         genre: 'electronic',
//         id: 362,
//         isStore: true,
//         name: 'Total Motal',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T15:11:53.987Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T15:09:07.954Z',
//         description: '',
//         genre: 'electronic',
//         id: 361,
//         isStore: true,
//         name: 'Nico Niho',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T15:09:07.954Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T15:03:50.102Z',
//         description: '',
//         genre: 'electronic',
//         id: 360,
//         isStore: true,
//         name: 'Antosha',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T15:03:50.102Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'gorgulian123@gmail.com',
//         createdDate: '2022-08-18T14:18:51.973Z',
//         description: '',
//         genre: 'electronic',
//         id: 358,
//         isStore: true,
//         name: 'Gorgulian',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T14:18:51.973Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'barns@gmail.com',
//         createdDate: '2022-08-18T14:09:03.110Z',
//         description: 'f',
//         genre: 'rock',
//         id: 357,
//         isStore: true,
//         name: 'Barn',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T14:15:03.487Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T14:07:47.811Z',
//         description: '',
//         genre: 'electronic',
//         id: 356,
//         isStore: true,
//         name: 'Vincent',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T14:07:47.811Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T14:04:07.765Z',
//         description: '',
//         genre: 'electronic',
//         id: 355,
//         isStore: true,
//         name: 'Anjey',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T14:04:07.765Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'lofi@gmail.com',
//         createdDate: '2022-08-18T13:49:21.713Z',
//         description: '',
//         genre: 'electronic',
//         id: 354,
//         isStore: true,
//         name: 'LoFi',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T13:49:21.713Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T13:47:16.699Z',
//         description: 'fggfgfh',
//         genre: 'electronic',
//         id: 353,
//         isStore: true,
//         name: 'HipHop',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T13:47:16.699Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T13:41:25.504Z',
//         description: '',
//         genre: 'electronic',
//         id: 352,
//         isStore: true,
//         name: 'JinJon',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T13:41:25.504Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'bimbom@gmail.com',
//         createdDate: '2022-08-18T13:28:26.932Z',
//         description: '',
//         genre: 'electronic',
//         id: 351,
//         isStore: true,
//         name: 'BimBom',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T13:28:26.932Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T13:24:56.633Z',
//         description: 'fggfgfh',
//         genre: 'electronic',
//         id: 349,
//         isStore: true,
//         name: 'GinGon',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T13:24:56.633Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T13:21:14.404Z',
//         description: '',
//         genre: 'electronic',
//         id: 348,
//         isStore: true,
//         name: 'DonDom',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T13:21:14.404Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'das3434d@gmail.com',
//         createdDate: '2022-08-18T13:15:46.673Z',
//         description: '',
//         genre: 'electronic',
//         id: 347,
//         isStore: true,
//         name: 'Lansel',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T13:15:46.673Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T13:11:40.664Z',
//         description: '',
//         genre: 'electronic',
//         id: 346,
//         isStore: true,
//         name: 'dfdfdfdfdfdfdfd',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T13:11:40.664Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T12:55:19.790Z',
//         description: 'Test desc',
//         genre: 'electronic',
//         id: 344,
//         isStore: true,
//         name: 'Numa',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T12:58:28.912Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T12:52:46.997Z',
//         description: '',
//         genre: 'electronic',
//         id: 343,
//         isStore: true,
//         name: 'Abobius',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T12:52:46.997Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T12:51:51.101Z',
//         description: '',
//         genre: 'electronic',
//         id: 342,
//         isStore: true,
//         name: 'Andromeda',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T12:51:51.101Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T12:50:04.007Z',
//         description: '',
//         genre: 'electronic',
//         id: 341,
//         isStore: true,
//         name: 'Willy',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T12:50:04.007Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T12:48:20.675Z',
//         description: '',
//         genre: 'electronic',
//         id: 340,
//         isStore: true,
//         name: 'Wooly',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T12:48:20.675Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'dadfdfdfsd@gmail.com',
//         createdDate: '2022-08-18T12:47:55.579Z',
//         description: '',
//         genre: 'electronic',
//         id: 339,
//         isStore: true,
//         name: 'Manson',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T12:47:55.579Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'das3434d@gmail.com',
//         createdDate: '2022-08-18T12:47:26.160Z',
//         description: '',
//         genre: 'electronic',
//         id: 338,
//         isStore: true,
//         name: 'Marly',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T12:47:26.160Z',
//         __typename: 'RemixModel'
//       },
//       {
//         authorEmail: 'bobr@gmail.com',
//         createdDate: '2022-08-18T12:42:43.987Z',
//         description: '',
//         genre: 'electronic',
//         id: 336,
//         isStore: true,
//         name: 'Bobr',
//         price: 0,
//         trackLength: 0,
//         updatedDate: '2022-08-18T12:42:43.987Z',
//         __typename: 'RemixModel'
//       }
//     ],
//     meta: {
//       isMy: null,
//       maxDate: null,
//       minDate: null,
//       skip: 0,
//       take: 25,
//       total: 55,
//       __typename: 'PaginateModel'
//     },
//     __typename: 'RemixesModel'
//   }
// };

const Remixes: React.FC = () => {
  const [fetchRemixes, { data, loading, refetch, fetchMore }] = useLazyQuery<
    { remixes: IRemixesModel },
    IQueryRemixesArgs
  >(GET_REMIXES);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentRemix, setCurrentRemix] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  // const [sorting, setSorting] = useState([
  //   { columnName: 'name', direction: SortDirectionEnum.Desc }
  // ]);
  // const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState<SortDirectionEnum>(SortDirectionEnum.Asc);

  useEffect(() => {
    fetchRemixes({
      variables: {
        payload: {
          sorts: [{ columnName: 'name', direction: sortOrder }],
          paginate: { skip: 0, take: 20 }
        }
      },
      notifyOnNetworkStatusChange: true
    });
  }, [sortOrder]);

  const handleEdit = (id: number) => {
    setIsEditModalOpen(true);
    setCurrentRemix(id);
  };

  const handleDelete = (id: number) => {
    setIsDeleteModalOpen(true);
    setCurrentRemix(id);
  };

  const handleClose = useCallback((modal: 'edit' | 'delete') => {
    modal === 'edit' ? setIsEditModalOpen(false) : setIsDeleteModalOpen(false);
    setCurrentRemix(0);
  }, []);

  const handleSuccess = useCallback(() => {
    setShowFeedback(true);
    refetch({ payload: {} });
  }, []);

  return (
    <Container style={styles.container}>
      <Stack direction="row" spacing={1} marginTop={2} alignItems="center">
        <Typography variant="h3" marginRight={2} fontWeight="700">
          Remixes
        </Typography>
        <AddCircle
          onClick={() => setSortOrder(SortDirectionEnum.Desc)}
          style={{ cursor: 'pointer' }}
          color="info"
        />
      </Stack>

      <RemixList
        onSort={(order) => setSortOrder(order)}
        onFetchMore={() =>
          fetchMore({
            variables: {
              payload: {
                paginate: {
                  skip: data?.remixes.items.length,
                  take: 10
                }
              }
            }
          })
        }
        isLoading={loading}
        data={data?.remixes.items || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <RemixModal
        onSuccess={handleSuccess}
        id={currentRemix}
        open={isEditModalOpen}
        onClose={() => handleClose('edit')}
      />
      <DeleteModal
        id={currentRemix}
        open={isDeleteModalOpen}
        onSuccess={handleSuccess}
        onClose={() => handleClose('delete')}
      />
      <Snackbar open={showFeedback} autoHideDuration={6000} onClose={() => setShowFeedback(false)}>
        <Alert onClose={() => setShowFeedback(false)} severity="success" sx={{ width: '100%' }}>
          Success
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Remixes;
