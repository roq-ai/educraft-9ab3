import * as yup from 'yup';

export const appValidationSchema = yup.object().shape({
  name: yup.string().required(),
  version: yup.string().nullable(),
  status: yup.string().nullable(),
  owner_id: yup.string().nullable().required(),
});
