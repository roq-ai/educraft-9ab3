import * as yup from 'yup';

export const subscriberValidationSchema = yup.object().shape({
  subscription_type: yup.string().nullable(),
  subscription_status: yup.string().nullable(),
  subscription_start_date: yup.date().nullable(),
  subscription_end_date: yup.date().nullable(),
  user_id: yup.string().nullable().required(),
});
