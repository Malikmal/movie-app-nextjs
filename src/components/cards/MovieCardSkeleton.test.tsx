import { render, screen } from "@testing-library/react";
import MovieCardSkeleton from "@/components/cards/MovieCardSkeleton";

describe("index", () => {
  it("test MovieCardSkeleton compontent ", () => {
    render(<MovieCardSkeleton />);

    const element = screen.getByTestId("movie-card-skeleton");

    expect(element).toBeInTheDocument();
  });
});
