import MoviesCarousel from "@/components/MoviesCarousel";
import { getPopularMovies, getSearchedMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation";

type Props = {
  searchParams: {
    term: string;
  };
  params: {};
};

async function SearchPage({ searchParams: { term } }: Props) {
  if (!term) notFound();

  const movies = await getSearchedMovies(term);
  const popularMovies = await getPopularMovies();

  return (
    <div className="max-w-7xl mx-auto">
      {/* <CarouselBannerWrapper /> */}

      {/* -mt-16 xl:-mt-48 */}
      <div className="flex flex-col space-y-5 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">Results for {term}</h1>
        <MoviesCarousel title="Movies" movies={movies} isVertical />

        <MoviesCarousel title="You may also like" movies={popularMovies} />
      </div>
    </div>
  );
}

export default SearchPage;
