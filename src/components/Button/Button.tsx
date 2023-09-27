import { ComponentProps, ReactNode } from 'react';

type Props = {
  children: ReactNode;
} & ComponentProps<'button'>;

export default function Button({ children, ...props }: Props) {
  return (
    <button className="p-4" {...props}>
      {children}
    </button>
  );
}
