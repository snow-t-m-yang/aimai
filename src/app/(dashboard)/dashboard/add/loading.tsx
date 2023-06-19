import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
  return (
    <div className="flex flex-col w-full gap-3">
      <Skeleton
        className="mb-4"
        height={60}
        width={400}
      />
      <Skeleton
        height={50}
        width={150}
      />
      <Skeleton
        height={50}
        width={300}
      />
    </div>
  );
};
export default loading;
