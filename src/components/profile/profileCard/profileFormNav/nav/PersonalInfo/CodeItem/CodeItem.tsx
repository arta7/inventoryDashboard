import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@app/components/common/inputs/Input/Input';
import { BaseButtonsForm } from '@app/components/common/forms/BaseButtonsForm/BaseButtonsForm';

export const CodeItem: React.FC = () => {
  const { t } = useTranslation();

  return (
  
    <BaseButtonsForm.Item name="Code" label="کد ملی" >
      <Input />
    </BaseButtonsForm.Item>
 
  );
};
