import Toast from '.';
import { nanoid } from 'nanoid';
import { render } from '@testing-library/react';

test("toast should be rendered with title '토스트'", () => {
  const { getByText } = render(
    <Toast title="토스트" description={<span>안녕, 난 토스트야</span>} toastId={nanoid(5)} />
  );
  expect(getByText('토스트')).toBeTruthy();
});
