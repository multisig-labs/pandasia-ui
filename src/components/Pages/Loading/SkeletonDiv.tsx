type Props = {
  twWidth: string;
  twHeight: string;
};
export default function SkeletonDiv({ twWidth, twHeight }: Props) {
  return <div className={`${twWidth} ${twHeight} bg-secondary-700 skeleton`}></div>;
}
