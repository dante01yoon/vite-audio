import { FC } from 'react';
import { TextBox, Translate } from '@components/index';

interface IndexPageProps {}

const IndexPage: FC<IndexPageProps> = () => {
  return (
    <section className="container mx-auto flex gap-46">
      <Translate width="w-full" />
      <Translate width="w-full" readOnly />
    </section>
  );
};

export default IndexPage;
