import * as yup from 'yup';

export const appDeveloperValidationSchema = yup.object().shape({
  access_level: yup.string().nullable(),
  status: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
  owner_id: yup.string().nullable().required(),
});
