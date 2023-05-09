import axiosLib from "@/lib/axios";

export function getMovieLatest(){
    return axiosLib.get('movie/latest')
}