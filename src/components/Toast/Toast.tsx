import { useEffect } from 'react';

type Props = {
  message: string;
  showToast: boolean;
  setShowToast: (b: boolean) => void;
  duration: number;
};
const Toast = ({ message, showToast, setShowToast, duration }: Props) => {
  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, duration || 3000);
    }
  }, [showToast, duration, setShowToast]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg text-white bg-green-500 duration-300 transition-opacity ${
        !showToast ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
