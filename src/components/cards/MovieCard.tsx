import Image from "@/components/Image";

export interface IMovieCardProps {
  title: string;
  release_date: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
}

export default function MovieCard(props: IMovieCardProps) {
  return (
    <div className="bg-white w-full h-full max-w-sm rounded-lg shadow-md overflow-hidden flex flex-col">
      <Image
        src={`https://image.tmdb.org/t/p/w300/${props.backdrop_path}`}
        alt={props.title}
        width={0}
        height={0}
        sizes="100"
        className="w-full aspect-[16/9] object-cover object-center"
      />
      <div className="w-full p-4 pb-0 flex flex-col text-black">
        <h2 className="text-lg font-bold line-clamp-2">{props.title}</h2>
      </div>
      <div className="mt-auto w-full p-4 pt-0 flex flex-col text-black">
        <p className="">
          {props.release_date &&
            new Date(props.release_date).toLocaleDateString(undefined, {
              dateStyle: "long",
            })}
        </p>
        <div className="w-fit inline-flex propss-center gap-1">
          <svg
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            className="text-yellow-500 ipc-icon ipc-icon--star-inline"
            id="iconContext-star-inline"
            viewBox="0 0 24 24"
            fill="currentColor"
            role="presentation"
          >
            <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
          </svg>
          <span className="text-sm font-semibold">
            {Number(props.vote_average).toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            (
            {Intl.NumberFormat("en", {
              notation: "compact",
            }).format(props.vote_count)}
            )
          </span>
        </div>
      </div>
    </div>
  );
}
