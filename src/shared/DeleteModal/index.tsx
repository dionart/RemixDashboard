import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { Delete } from '@mui/icons-material';
import { useMutation } from '@apollo/client';
import { style } from './styles';
import { DELETE_REMIX } from '@/graphql/mutations';
import AbsoluteLoading from '../ui/AbsoluteLoading/AbsoluteLoading';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  id: number;
}

// Barbaro  dadfdfdfsd@gmail.com	electronic	0	$0	true
// Gango		dadfdfdfsd@gmail.com	electronic	0	$0	true
// Garrosh		dadfdfdfsd@gmail.com	punk	0	$0	true

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, id, onSuccess }) => {
  const [deleteRemix, { loading }] = useMutation(DELETE_REMIX, {
    onCompleted() {
      onSuccess();
      onClose();
    }
  });
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {loading && <AbsoluteLoading />}
        <Typography id="modal-modal-title" variant="h5">
          Are you sure you want to delete this remix?
        </Typography>
        <Typography variant="h6" id="modal-modal-description" sx={{ mt: 2 }}>
          This action cannot be undone.
        </Typography>

        <Stack justifyContent="flex-end" direction="row" sx={{ mt: 2 }} spacing={2}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => deleteRemix({ variables: { payload: { id } } })}
            variant="contained"
            startIcon={<Delete />}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default memo(DeleteModal);
