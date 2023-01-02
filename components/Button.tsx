import { ReactChild, ComponentProps, FC } from 'react';

type Theme = 'primary' | 'secondly' | 'thirdaly';
type Props = {
  children: ReactChild;
  theme?: Theme;
} & ComponentProps<'button'>;

const Button: FC<Props> = ({ children, theme = 'primary', ...rest }) => {
  let buttonClassNames: string = '';

  if (theme === 'primary') {
    buttonClassNames =
      'bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-500 hover:border-transparent';
  } else if (theme === 'secondly') {
    buttonClassNames =
      'bg-gradient-to-br from-purple-600 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300';
  } else if (theme === 'thirdaly') {
  }

  return (
    <button
      type="button"
      className={`rounded-lg px-8 py-2 text-center ${buttonClassNames} ${
        rest.disabled && 'pointer-events-none bg-gray-300 text-gray-500 border-gray-300'
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
