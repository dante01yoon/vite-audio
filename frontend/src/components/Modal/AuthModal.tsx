import { http } from '@/api';
import { useAppContext } from '@/hooks';
import { useActor } from '@xstate/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { BlackButton, Icon, TextField } from '..';

export const AuthModal: FC = ({}) => {
  const { register } = useForm();
  const { modalService } = useAppContext();
  const [_, modalSend] = useActor(modalService);

  const handleClose = () => {
    modalSend({
      type: 'CLOSE'
    });
  };

  const handleLogin = async () => {
    const response = await http.POST('/user/signIn', {
      data: {
        id: 'admin',
        password: '123412341234'
      }
    });
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
      <BlackButton className="mt-3" onClick={handleLogin}>
        로그인
      </BlackButton>
      <BlackButton className="mt-3" onClick={handleSignUp}>
        회원가입
      </BlackButton>
    </div>
  );
};
