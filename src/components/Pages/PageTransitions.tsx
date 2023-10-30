import { ReactNode } from 'react';

export function FadeTransition({ children }: { children: ReactNode }) {
  return <div className="fade-in">{children}</div>;
}

export function AccordianTransition({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <div className="slide-left"></div>
      <div className="slide-right"></div>
    </div>
  );
}
