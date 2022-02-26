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
  const ext =
    true &&
    (function (type) {
      switch (iconMap[type].split('.')[1]) {
        case 'svg':
          return 'svg+xml';
        case 'png':
          return 'png';
        default:
          return 'jpg';
      }
    })(iconType);

  return (
    <a href="#" onClick={onClick} className={`${className} inline-block`}>
      {
        <object
          type={`image/${ext}`}
          {...props}
          className="pointer-events-none"
          data={`/assets/icons/${iconMap[iconType]}`}
          width={width}
          height={height}
        />
      }
    </a>
  );
};
