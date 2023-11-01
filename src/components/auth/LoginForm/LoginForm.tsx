import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { doLogin } from '@app/store/slices/authSlice';
import { notificationController } from '@app/controllers/notificationController';
import { ReactComponent as FacebookIcon } from '@app/assets/icons/facebook.svg';
import { ReactComponent as GoogleIcon } from '@app/assets/icons/google.svg';
import * as S from './LoginForm.styles';
import * as Auth from '@app/components/layouts/AuthLayout/AuthLayout.styles';

interface LoginFormData {
  email: string;
  password: string;
}

export const initValues: LoginFormData = {
  email: 'hello@altence.com',
  password: 'some-test-pass',
};

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (values: LoginFormData) => {
    setLoading(true);
    dispatch(doLogin(values))
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => {
        notificationController.error({ message: err.message });
        setLoading(false);
      });
  };

  return (
    <Auth.FormWrapper >
      <BaseForm layout="vertical" onFinish={handleSubmit} requiredMark="optional" initialValues={initValues}  >
        <Auth.FormTitle >صفحه ورود</Auth.FormTitle>
        {/* <S.LoginDescription>{t('login.loginInfo')}</S.LoginDescription> */}
        <Auth.FormItem
        
          name="email"
          label="نام کاربری"
          rules={[
            { required: true, message: t('common.requiredField') },
            
          ]}

        >
          <Auth.FormInput placeholder="نام کاربری" />
        </Auth.FormItem>
        <Auth.FormItem
          label="رمز عبور"
          name="password"
          rules={[{ required: true, message: t('common.requiredField') }]}
        >
          <Auth.FormInputPassword placeholder="رمز عبور" />
        </Auth.FormItem>
        <Auth.ActionsWrapper>
          <BaseForm.Item name="rememberMe" valuePropName="checked" noStyle>
            <Auth.FormCheckbox>
              <S.RememberMeText>ذخیره اطلاعات</S.RememberMeText>
            </Auth.FormCheckbox>
          </BaseForm.Item>
          {/* <Link to="/auth/forgot-password">
            <S.ForgotPasswordText>{t('common.forgotPass')}</S.ForgotPasswordText>
          </Link> */}
        </Auth.ActionsWrapper>
        <BaseForm.Item noStyle>
          <Auth.SubmitButton type="primary" htmlType="submit" loading={isLoading}>
          ورود
          </Auth.SubmitButton>
        </BaseForm.Item>

   
        {/* <Auth.FooterWrapper>
          <Auth.Text>
            {t('login.noAccount')}{' '}
            <Link to="/auth/sign-up">
              <Auth.LinkText>{t('common.here')}</Auth.LinkText>
            </Link>
          </Auth.Text>
        </Auth.FooterWrapper> */}
      </BaseForm>
    </Auth.FormWrapper>
  );
};
