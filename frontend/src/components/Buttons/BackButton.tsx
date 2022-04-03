import { FC, HTMLAttributes } from 'react';
import { Icon } from '@components/index';

interface BackButtonProps extends HTMLAttributes<HTMLButtonElement> { }

export const BackButton: FC<BackButtonProps> = ({ ...props }) => {
	return (
		<button className='p-[12px]' {...props}>
			<Icon iconType='arrow' width='12px' height='12px' />
		</button>
	);
};

/* html button에 있는 속성 사용 가능!
ex) <BackButton onClick={...} /> */
