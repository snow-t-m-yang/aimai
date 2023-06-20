import Skeleton from "react-loading-skeleton";

const loading = () => {
  return (
    <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]">
      <div className="flex justify-between py-3 border-b-2 border-gray-200 sm:items-center">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-8 h-8 sm:w-12 sm:h-12">
              <Skeleton
                className="mb-4"
                height={40}
                width={400}
              />
            </div>
          </div>

          <div className="flex flex-col leading-tight">
            <div className="flex items-center text-xl">
              <span className="mr-3 font-semibold text-gray-300">
                <Skeleton
                  className="mb-4"
                  height={40}
                  width={400}
                />
              </span>
            </div>

            <span className="text-sm text-gray-400">
              <Skeleton
                className="mb-4"
                height={40}
                width={400}
              />
            </span>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col-reverse flex-1 h-full gap-4 p-3 overflow-y-auto scrolling-touch scrollbar-thumb-pink scrollbar-thumb-rounded scrollbar-teack-pink-lighter scrollbar-w-2"
        id="messages"
      >
        <div />
        <Skeleton
          className="mb-4"
          height={40}
          width={400}
        />
      </div>

      <div className="px-4 pt-4 mb-2 border-t border-gray-200 sm:mb-0">
        <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-pink-600">
          <Skeleton
            className="mb-4"
            height={40}
            width={400}
          />

          <Skeleton
            className="mb-4"
            height={40}
            width={400}
          />
          <div className="absolute bottom-0 right-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex-shrin-0 dark">
              <Skeleton
                className="mb-4"
                height={40}
                width={400}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default loading;
