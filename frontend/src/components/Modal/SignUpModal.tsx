import { http } from '@/api';
import { useAppContext } from '@/hooks';
import { useActor } from '@xstate/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { BlackButton, Icon, TextField } from '..';

export const SignUpModal = () => {
  const { register } = useForm();
  const { modalService } = useAppContext();
  const [_, modalSend] = useActor(modalService);

  const handleClose = () => {
    modalSend({
      type: 'CLOSE'
    });
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
    const response = await http.POST('/user/signUp', {
      data: {
        id: 'admin',
        password: '123412341234',
        passwordConfirm: '123412341234'
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
      <div className="text-center">신규 회원 가입</div>
      <TextField
        header="ID"
        register={register}
        minLength={3}
        maxLength={10}
        name="id"
        required
        className="mt-3"
      />
      <TextField
        header="PASSWORD"
        register={register}
        name="password"
        type="password"
        required
        className="mt-3"
      />
      <TextField
        header="PASSWORD CONFIRM"
        register={register}
        name="passwordAgain"
        type="password"
        required
        className="mt-3"
      />
      <BlackButton className="mt-3" onClick={handleSignUp}>
        회원가입
      </BlackButton>
      <BlackButton className="mt-3" onClick={handleLogin}>
        가입 계정이 존재함
      </BlackButton>
    </div>
  );
};
