import axiosLib from "@/lib/axios";

export function getDiscoverMovie(){
    return axiosLib.get('discover/movie')
}