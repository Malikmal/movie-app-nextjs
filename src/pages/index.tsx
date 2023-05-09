import { FormEvent, useEffect, useState } from "react";
// import Image from 'next/image'
import Image from "@/components/Image";
import { Inter } from "next/font/google";
import { useQuery, useInfiniteQuery, useQueryClient } from "react-query";
import { getMovieLatest } from "@/services/TMDB/movie";
import { getSearchMovie } from "@/services/TMDB/search";
import axiosLib from "@/lib/axios";
import { useInView } from "react-intersection-observer";
import MovieCard from "@/components/cards/MovieCard";
import MovieCardSkeleton from "@/components/cards/MovieCardSkeleton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState("a");
  const [searchMovieParam, setSearchMovieParam] = useState({
    query: "a",
    page: 1,
  });

  // const {data, error, isLoading} = useInfiniteQuery('searchMovie', getSearchMovie(searchMovieParam))
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery(
    ["searchMovie", searchMovieParam],
    async ({ pageParam = 1 }) => {
      const response = await axiosLib.get("search/movie", {
        params: {
          query: searchMovieParam.query,
          page: pageParam,
        },
      });
      const data = response.data;
      return data;
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        const nextpage = lastPage.page + 1;
        return nextpage <= lastPage.total_pages ? nextpage : undefined;
      },
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const isEmptyResult = !data?.pages?.[0]?.results?.length;

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSearchMovieParam((old) => ({ ...old, page: 1, query: searchInput }));

    // refetch();
    // refetch({
    //   // refetchPage: (page, index) => index === 0,
    // });
    // queryClient.resetQueries([]);
    // queryClient.refetchQueries(["searchMovie"], {});
  }

  function handleChangeSearchInput(e: FormEvent<HTMLInputElement>) {
    setSearchInput(e.currentTarget.value);
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start py-12 space-y-4 ${inter.className}`}
    >
      <section
        id="form"
        className="w-full max-w-sm inline-flex justify-center items-center gap-2"
      >
        <form className="w-full" onSubmit={handleSearch}>
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              value={searchInput}
              onChange={handleChangeSearchInput}
              // onChange={(e) =>
              //   setSearchMovieParam((old) => ({
              //     ...old,
              //     query: e.target.value,
              //   }))
              // }
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </section>
      <h1>Result search keyword of "{searchMovieParam.query}"</h1>
      <section
        id="movie-list"
        className="w-full max-w-4xl p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch justify-items-center "
      >
        {isFetching && !isFetchingNextPage ? (
          Array(5)
            .fill(1)
            .map((_, index) => <MovieCardSkeleton key={index} />)
        ) : isEmptyResult ? (
          <div className="w-full col-span-full text-center justify-center">
            <span className="text-white text-lg">Empty Result</span>
          </div>
        ) : (
          data?.pages?.map((page) =>
            page?.results?.map((item) => (
              <MovieCard
                key={item.id}
                title={item.title}
                backdrop_path={item.backdrop_path}
                release_date={item.release_date}
                vote_average={item.vote_average}
                vote_count={item.vote_count}
              />
            ))
          )
        )}
      </section>
      {!isEmptyResult && (
        <section
          id="button-load-more"
          className="w-full max-w-sm inline-flex justify-center items-center "
        >
          <button
            type="button"
            className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load Newer"
              : "Nothing load more"}
          </button>
        </section>
      )}
    </main>
  );
}
