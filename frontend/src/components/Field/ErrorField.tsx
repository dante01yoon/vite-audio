import { FC } from 'react';

export interface ErrorFieldProps {
  hasError?: boolean;
  message?: string;
}

export const ErrorField: FC<ErrorFieldProps> = ({ hasError, message }) => {
  if (hasError) {
    return <div className="text-red-600	">{message || '올바른 값을 입력해주세요'}</div>;
  }
  return null;
};
