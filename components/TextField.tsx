import { ComponentPropsWithoutRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  inputLabel: string;
  register?: UseFormRegisterReturn;
} & ComponentPropsWithoutRef<'input'>;

const TextField: React.FC<Props> = ({ inputLabel, register, ...rest }) => {
  return (
    <div className="my-2">
      <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor={rest.id}>
        {inputLabel}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...register}
        {...rest}
      />
    </div>
  );
};

export default TextField;
