import { FC } from "react";

interface TextBoxProps {
  readOnly?: boolean;
  value?: string;
}

const TextBox: FC<TextBoxProps> = ({
  readOnly = false,
  value,
}) => {
  return (
    <input 
      type="text"
      value={value}
      disabled={readOnly}
    />
  )
}

export default TextBox;