import { FC, ObjectHTMLAttributes } from 'react';
import { iconMap } from './iconMap';

interface IconProps extends Omit<ObjectHTMLAttributes<HTMLObjectElement>, 'onClick'> {
  iconType: keyof typeof iconMap;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export const Icon: FC<IconProps> = ({
  iconType,
  width = '50px',
  height = '50px',
  onClick,
  className,
  ...props
}) => {
  return (
    <a href="#" onClick={onClick} className={className}>
      <object
        type="image/svg+xml"
        {...props}
        className="pointer-events-none"
        data={`/assets/icons/${iconMap[iconType]}`}
        width={width}
        height={height}
      />
    </a>
  );
};
