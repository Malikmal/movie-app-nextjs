import axiosLib from "@/lib/axios"

export type ISearchMovie = {
    query: string,
    page: number,
    language?: string,
    include_adult?: boolean,
    region?: string,
    year?: number,
    parimary_release_year?: number,
}

export function getSearchMovie(params: ISearchMovie){
    return axiosLib.get('search/movie', {
        params: params
    })
}