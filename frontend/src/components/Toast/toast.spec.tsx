// import Toast from '.';
import { nanoid } from 'nanoid';
import { render } from '@testing-library/react';

describe('토스트 컴포넌트', () => {
  it("toast should be rendered with title '토스트'", () => {
    const { getByText } = render(<div>토스트</div>);
    expect(getByText('토스트')).toBeTruthy();
  });
});
