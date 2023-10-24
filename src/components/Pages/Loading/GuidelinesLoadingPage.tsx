import SkeletonDiv from './SkeletonDiv';

export default function GuidelinesLoadingPage() {
  return (
    <div className="my-12 grid w-full grid-cols-5">
      <div className="col-span-2 border-r border-secondary-700">
        <div className="flex gap-4 max-w-[370px] flex-col pr-4">
          <SkeletonDiv twWidth="w-24" twHeight="h-24" />
          <SkeletonDiv twWidth="w-52" twHeight="h-8" />
          <SkeletonDiv twWidth="w-full" twHeight="h-6" />
          <SkeletonDiv twWidth="w-48" twHeight="h-16" />
          <hr className="h-[1px] w-full border-none bg-secondary-700"></hr>
          <SkeletonDiv twWidth="w-full" twHeight="h-44" />
        </div>
      </div>

      <div className="col-span-3 flex flex-col items-end pl-4">
        <div className="flex gap-8 w-full max-w-[560px] flex-col">
          <SkeletonDiv twWidth="w-96" twHeight="h-60" />
          <SkeletonDiv twWidth="w-52" twHeight="h-8" />
          <SkeletonDiv twWidth="w-full" twHeight="h-6" />
          <SkeletonDiv twWidth="w-52" twHeight="h-8" />
          <SkeletonDiv twWidth="w-full" twHeight="h-6" />
        </div>
      </div>
    </div>
  );
}
