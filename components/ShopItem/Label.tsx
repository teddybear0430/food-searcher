import { FC, ReactChild } from 'react';

type Props = {
  children: ReactChild;
  bg?: string;
};

const Label: FC<Props> = ({ children, bg = 'bg-red-400' }) => {
  return <span className={`${bg} px-1 text-white inline-block`}>{children}</span>;
};

export default Label;
