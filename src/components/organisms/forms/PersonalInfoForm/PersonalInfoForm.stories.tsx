import { Meta, StoryObj } from '@storybook/react';
import PersonalInfoForm from './PersonalInfoForm.component';

export default {
  title: 'components/organisms/forms/PersonalInfoForm',
  component: PersonalInfoForm,
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: StoryObj<typeof PersonalInfoForm> = {
  args: {
    formState: {
      formValues: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
      },
      formErrors: {},
    },
    isPending: false,
    isSuccess: false,
    isError: false,
    toastOpen: false,
    handleChange: (e) => console.log('handle change', e.target.value),
    setToastOpen: (value) => console.log('toast open', value),
    handleSubmit: (e) => {
      e.preventDefault();
      console.log('handle submit');
    },
  },
};

export const Default = Template;
