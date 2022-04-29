import { http } from '@/api';
import { useAppContext } from '@/hooks';
import { useActor } from '@xstate/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { BlackButton, ErrorField, Icon, TextField } from '..';

export const SignUpModal: FC = () => {
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;
  const { modalService } = useAppContext();
  const [_, modalSend] = useActor(modalService);

  const handleClose = () => {
    modalSend({
      type: 'CLOSE'
    });
  };

  const isValidField = (name: 'id' | 'password' | 'passwordConfirm') => {
    if (name === 'id') {
      return !errors.id;
    }

    if (name === 'password') {
      return !errors.password && getValues('password') === getValues('passwordConfirm');
    }

    return !errors.passwordConfirm && getValues('password') === getValues('passwordConfirm');
  };

  const handleLogin = () => {
    modalSend({
      type: 'OPEN',
      data: {
        type: 'signIn'
      }
    });
  };

  const handleSignUp = async () => {
    if (isValidField('id') && isValidField('password') && isValidField('passwordConfirm')) {
      try {
        const response = await http.POST('/user/signUp', {
          data: {
            id: getValues('id'),
            password: getValues('password'),
            passwordConfirm: getValues('passwordConfirm')
          }
        });
      } catch (e) {
        if (e instanceof Error) {
        } else {
          console.log('status is not included');
        }
      }
    }
  };

  return (
    <div
      data-select="auth_modal_container"
      className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white p-10 vite_auth_modal">
      <Icon
        iconType={'close'}
        onClick={handleClose}
        className="absolute top-3 right-3"
        width={'30px'}
        height={'30px'}
      />
      <div className="text-center">신규 회원 가입</div>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <TextField
          header="ID"
          register={register}
          minLength={3}
          maxLength={10}
          name="id"
          required
          className="mt-3"
        />
        <ErrorField hasError={!isValidField('id')} />

        <TextField
          header="PASSWORD"
          register={register}
          name="password"
          type="password"
          required
          className="mt-3"
        />
        <ErrorField hasError={!isValidField('password')} />

        <TextField
          header="PASSWORD CONFIRM"
          register={register}
          name="passwordConfirm"
          type="password"
          required
          className="mt-3"
        />
        <ErrorField hasError={!isValidField('passwordConfirm')} />

        <BlackButton className="mt-3" type="submit">
          회원가입
        </BlackButton>
        <BlackButton className="mt-3" onClick={handleLogin}>
          로그인 하기
        </BlackButton>
      </form>
    </div>
  );
};
