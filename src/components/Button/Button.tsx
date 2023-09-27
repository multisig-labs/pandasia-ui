import { ComponentProps, ReactNode } from 'react';

type Props = {
  children: ReactNode;
} & ComponentProps<'button'>;

export default function Button({ children, ...props }: Props) {
  return (
    <button className="bg-secondary-700 p-4" {...props}>
      {children}
    </button>
  );
}
