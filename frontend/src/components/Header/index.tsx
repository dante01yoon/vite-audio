import { FC } from 'react';
import { BackButton } from '@components/index';

interface HeaderProps { }

export const Header: FC<HeaderProps> = ({ children }) => {
	return (
		<header className='flex flex-col flex-nowrap gap-[36px] items-start p-[60px]'>
			<BackButton />
			<h1 className='font-bold text-[2rem]'>{children}</h1>
		</header>
	);
};

// 헤더 내용을 children으로 넣었으니까 <Header>제목</Header> 이렇게 쓰시면 돼요! 
