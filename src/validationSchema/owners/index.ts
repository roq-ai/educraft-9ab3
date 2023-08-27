import * as yup from 'yup';

export const ownerValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  last_login: yup.date().nullable(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
