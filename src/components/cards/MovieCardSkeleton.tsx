import Image from "@/components/Image";

export default function MovieCardSkeleton() {
  return (
    <div
      data-testid="movie-card-skeleton"
      className="animate-pulse bg-white w-full h-full max-w-sm rounded-lg shadow-md overflow-hidden flex flex-col space-y-2"
    >
      <div
        id="image"
        className="bg-gray-200 w-full aspect-[16/9] object-cover object-center"
      ></div>
      <div className="w-full p-4 pb-0 flex flex-col text-black">
        <div className="bg-gray-200 w-11/12 h-4"></div>
      </div>
      <div className="mt-auto w-full p-4 pt-0 flex flex-col text-black space-y-4">
        <div className="bg-gray-200 w-11/12 h-4"></div>
        <div className="w-w-full inline-flex propss-center gap-1">
          <div className="bg-gray-200 w-1/12 h-4"></div>
          <div className="bg-gray-200 w-1/12 h-4"></div>
          <div className="bg-gray-200 w-2/12 h-4"></div>
        </div>
      </div>
    </div>
  );
}
