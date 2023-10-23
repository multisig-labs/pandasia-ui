import Image from 'next/image';

type Props = {
  error: string;
};

export default function ErrorBanner({ error }: Props) {
  if (error == 'AirdropOutOfFunds()') {
    return (
      <Image
        width={148}
        height={31}
        src="/out-of-funds-banner.svg"
        alt="out of funds banner"
      ></Image>
    );
  }
  if (error == 'AllClaimed()') {
    return (
      <Image width={148} height={31} src="/all-claimed-banner.svg" alt="all claimed banner"></Image>
    );
  }
  if (error == 'NotStarted()') {
    return (
      <Image width={148} height={31} src="/not-started-banner.svg" alt="not started banner"></Image>
    );
  }
}
