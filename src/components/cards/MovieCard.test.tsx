import { render, screen } from "@testing-library/react";
import MovieCard from "@/components/cards/MovieCard";

describe("index", () => {
  it("test MovieCard compontent ", () => {
    render(
      <MovieCard
        title={"item.title"}
        backdrop_path={"item.backdrop_path"}
        release_date={"item.release_date"}
        vote_average={4.5}
        vote_count={92}
      />
    );

    const element = screen.getByTestId("movie-card");

    expect(element).toBeInTheDocument();
  });
});
