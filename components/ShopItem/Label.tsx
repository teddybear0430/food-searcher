import { FC, ReactChild } from 'react';

type Props = {
  children: ReactChild;
  bg?: string;
};

const Label: FC<Props> = ({ children, bg = 'bg-red-400' }) => {
  return <span className={`${bg} p-1 text-sm text-white`}>{children}</span>;
};

export default Label;
