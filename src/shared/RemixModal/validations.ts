import * as yup from 'yup';
import { GenreTypeEnum } from '@/graphql/types/_server';

export const validationSchema = yup.object().shape({
  name: yup.string().min(3).max(50),
  authorEmail: yup.string().email().required(),
  genre: yup.mixed<GenreTypeEnum>().oneOf(Object.values(GenreTypeEnum)),
  description: yup.string().min(0).max(500),
  price: yup.number().min(0).max(1000),
  trackLength: yup.number().min(0).max(300)
});
