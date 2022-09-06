import {
  Box,
  Button,
  FormControlLabel,
  MenuItem,
  Modal,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import React, { memo, useEffect } from 'react';
import { Save } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useLazyQuery, useMutation } from '@apollo/client';
import { style } from './styles';
import { GenreTypeEnum, IRemixModel } from '@/graphql/types/_server';
import { validationSchema } from './validations';
import { GET_REMIX_BY_ID } from '@/graphql/queries';
import AbsoluteLoading from '../ui/AbsoluteLoading/AbsoluteLoading';
import { CREATE_REMIX, EDIT_REMIX } from '@/graphql/mutations';

interface RemixModalProps {
  id?: number;
  open: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

const RemixModal: React.FC<RemixModalProps> = ({ open, onClose, id, onSuccess }) => {
  const [fetchQuery, { data, loading }] = useLazyQuery<{ remixById: IRemixModel }>(GET_REMIX_BY_ID);
  const [createRemix, { loading: createLoading }] = useMutation<{
    createRemix: IRemixModel;
  }>(CREATE_REMIX, {
    onCompleted() {
      handleComplete();
    }
  });
  const [editRemix, { loading: editLoading }] = useMutation<{
    updateRemix: IRemixModel;
  }>(EDIT_REMIX, {
    onCompleted() {
      handleComplete();
    }
  });

  useEffect(() => {
    id &&
      fetchQuery({
        variables: { payload: { id } }
      });
  }, [id]);

  const handleSubmit = () => {
    id
      ? editRemix({ variables: { payload: { ...formik.values, id } } })
      : createRemix({ variables: { payload: formik.values } });
  };

  const handleChange = (fieldName: string, value: string | number | boolean) => {
    formik.setFieldValue(fieldName, value);
  };

  const handleComplete = () => {
    onSuccess();
    onClose();
    formik.resetForm();
  };

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: id ? data?.remixById?.name : '',
      authorEmail: id ? data?.remixById?.authorEmail : '',
      description: id ? data?.remixById?.description : '',
      genre: id ? data?.remixById?.genre : '',
      price: id ? data?.remixById?.price : 0,
      trackLength: id ? data?.remixById.trackLength : 0,
      isStore: id ? data?.remixById?.isStore : false
    },
    validationSchema,
    onSubmit: handleSubmit
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {(loading || editLoading || createLoading) && <AbsoluteLoading />}
        <Typography id="modal-modal-title" variant="h4">
          {id ? 'Edit Remix' : 'Create Remix'}
        </Typography>
        <Typography variant="h6">
          {id ? 'here you can edit a remix' : 'here you can create a new remix'}
        </Typography>
        <Box marginTop={4}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} direction="row">
              <TextField
                placeholder="Name"
                error={formik.touched.name && Boolean(formik.errors.name)}
                onChange={(e) => handleChange('name', e.target.value)}
                label="Name"
                value={formik.values.name}
                size="small"
                variant="outlined"
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                error={formik.touched.authorEmail && Boolean(formik.errors.authorEmail)}
                onChange={(e) => handleChange('authorEmail', e.target.value)}
                helperText={formik.touched.authorEmail && formik.errors.authorEmail}
                fullWidth
                placeholder="Email"
                label="Email"
                value={formik.values.authorEmail}
                size="small"
                variant="outlined"
              />
            </Stack>

            <Stack spacing={2} marginTop={2} direction="row">
              <TextField
                fullWidth
                onChange={(e) => handleChange('genre', e.target.value)}
                error={formik.touched.genre && Boolean(formik.errors.genre)}
                helperText={formik.touched.genre && formik.errors.genre}
                select
                label="Genre"
                value={formik.values.genre}
                size="small"
              >
                {Object.keys(GenreTypeEnum).map((key) => (
                  <MenuItem value={GenreTypeEnum[key as keyof typeof GenreTypeEnum]} key={key}>
                    {key}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                onChange={(e) => handleChange('price', Number(e.target.value))}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                size="small"
                value={formik.values.price}
                id="outlined-number"
                label="Price"
                type="number"
              />
              <TextField
                onChange={(e) => handleChange('trackLength', Number(e.target.value))}
                error={formik.touched.trackLength && Boolean(formik.errors.trackLength)}
                helperText={formik.touched.trackLength && formik.errors.trackLength}
                size="small"
                value={formik.values.trackLength}
                id="outlined-number"
                label="Track length"
                type="number"
              />
            </Stack>

            <TextField
              sx={{ mt: 2 }}
              onChange={(e) => handleChange('description', e.target.value)}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              fullWidth
              placeholder="Description"
              label="Description"
              value={formik.values.description}
              size="small"
              multiline
              variant="outlined"
            />

            <FormControlLabel
              sx={{ mt: 2 }}
              control={
                <Switch
                  checked={formik.values.isStore}
                  onChange={(e) => handleChange('isStore', e.target.checked)}
                  value={formik.values.isStore}
                />
              }
              labelPlacement="end"
              label="Available for purchase"
            />

            <Stack marginTop={4} spacing={2} justifyContent="flex-end" direction="row">
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained" startIcon={<Save />}>
                {id ? 'Save Changes' : 'Create'}
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

RemixModal.defaultProps = { id: -1 };

export default memo(RemixModal);
