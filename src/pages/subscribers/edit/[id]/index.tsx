import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getSubscriberById, updateSubscriberById } from 'apiSdk/subscribers';
import { subscriberValidationSchema } from 'validationSchema/subscribers';
import { SubscriberInterface } from 'interfaces/subscriber';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function SubscriberEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<SubscriberInterface>(
    () => (id ? `/subscribers/${id}` : null),
    () => getSubscriberById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SubscriberInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSubscriberById(id, values);
      mutate(updated);
      resetForm();
      router.push('/subscribers');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<SubscriberInterface>({
    initialValues: data,
    validationSchema: subscriberValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Subscribers',
              link: '/subscribers',
            },
            {
              label: 'Update Subscriber',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Subscriber
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.subscription_type}
            label={'Subscription Type'}
            props={{
              name: 'subscription_type',
              placeholder: 'Subscription Type',
              value: formik.values?.subscription_type,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.subscription_status}
            label={'Subscription Status'}
            props={{
              name: 'subscription_status',
              placeholder: 'Subscription Status',
              value: formik.values?.subscription_status,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="subscription_start_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Subscription Start Date
            </FormLabel>
            <DatePicker
              selected={
                formik.values?.subscription_start_date ? new Date(formik.values?.subscription_start_date) : null
              }
              onChange={(value: Date) => formik.setFieldValue('subscription_start_date', value)}
            />
          </FormControl>
          <FormControl id="subscription_end_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Subscription End Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.subscription_end_date ? new Date(formik.values?.subscription_end_date) : null}
              onChange={(value: Date) => formik.setFieldValue('subscription_end_date', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/subscribers')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'subscriber',
    operation: AccessOperationEnum.UPDATE,
  }),
)(SubscriberEditPage);
