import { http } from '@/api';
import { useAppContext } from '@/hooks';
import { useActor } from '@xstate/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { BlackButton, ErrorField, Icon, TextField } from '..';

export const AuthModal: FC = ({}) => {
  const { register, handleSubmit, formState, getValues } = useForm({});
  const { errors } = formState;
  const { modalService, authService } = useAppContext();
  const [_, modalSend] = useActor(modalService);
  const [auth, authSend] = useActor(authService);

  const handleClose = () => {
    modalSend({
      type: 'CLOSE'
    });
  };

  const isValidField = (name: 'id' | 'password') => {
    if (name === 'id') {
      return !errors.id;
    }
    return !errors.password;
  };

  const handleLogin = async () => {
    if (isValidField('id') && isValidField('password')) {
      authSend({
        type: 'SIGNIN',
        data: {
          id: getValues('id'),
          password: getValues('password')
        }
      });
      // const response = await http.POST('/user/signIn', {
      //   data: {
      //     id: getValues('id'),
      //     password: getValues('password')
      //   }
      // });
    }
  };

  const handleSignUp = () => {
    modalSend({
      type: 'OPEN',
      data: {
        type: 'signUp'
      }
    });
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
      <div className="text-center">로그인이 필요한 서비스 입니다</div>
      <form onSubmit={handleSubmit(handleLogin)}>
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
        <BlackButton className="mt-3" onClick={handleLogin}>
          로그인
        </BlackButton>
        <BlackButton className="mt-3" onClick={handleSignUp}>
          회원가입
        </BlackButton>
      </form>
    </div>
  );
};
