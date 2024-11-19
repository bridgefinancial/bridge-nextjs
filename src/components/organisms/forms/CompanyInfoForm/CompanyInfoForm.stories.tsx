// src/components/design-system/molecules/CompanyInfoForm/CompanyInfoForm.stories.tsx
import { Industry } from '@/types/industries.types';
import { Meta, StoryObj } from '@storybook/react';
import CompanyInfoForm, {
  CompanyFormInfoProps,
} from './CompanyInfoForm.component';

export default {
  title: 'components/organisms/forms/CompanyInfoForm',
  component: CompanyInfoForm,
  parameters: {
    layout: 'centered',
  },
} as Meta<CompanyFormInfoProps>;

// Mock industries matching the Industry type
const industries: Industry[] = [
  {
    id: '1',
    name: 'Technology',
    created_at: '2023-01-01',
    updated_at: '2023-01-02',
    revenue_multiple: 5,
    ebitda_multiple: 10,
    median_sale_price: 2000000,
  },
  {
    id: '2',
    name: 'Healthcare',
    created_at: '2023-01-03',
    updated_at: '2023-01-04',
    revenue_multiple: 6,
    ebitda_multiple: 12,
    median_sale_price: 3000000,
  },
];

const Template: StoryObj<CompanyFormInfoProps> = {
  args: {
    formState: {
      formValues: {
        businessName: 'Example Business',
        industry: '1',
      },
      formErrors: {},
    },
    toastOpen: false,
    setToastOpen: () => alert('Toast state toggled'),
    industries,
    onIndustryChange: () => alert('Industry changed'),
    isSuccess: false,
    isError: false,
    isPending: false,
    currentCompanyIndustry: industries[0],
    handleTextInputChange: () => alert('Text input changed'),
    handleSubmit: () => alert('Form submitted'),
  },
};

export const Default = Template;
