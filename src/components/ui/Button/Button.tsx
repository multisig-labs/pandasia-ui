import { ComponentProps, ReactNode } from 'react';

type Props = {
  children: ReactNode;
} & ComponentProps<'button'>;

export default function Button({ children, ...props }: Props) {
  return (
    <button className="p-4 bg-secondary-700" {...props}>
      {children}
    </button>
  );
}
