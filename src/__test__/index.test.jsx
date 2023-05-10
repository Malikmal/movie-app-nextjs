import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";
import MovieCardSkeleton from "@/components/cards/MovieCardSkeleton";

describe("index", () => {
  it("test MovieCardSkeleton compontent ", () => {
    render(<MovieCardSkeleton />);
    const element = screen.getByTestId("movie-card-skeleton");

    // console.log({ test: expect(element) });

    // expect(element).toBeInTheDocument();
    expect(element).toBeTruthy();
  });
});
