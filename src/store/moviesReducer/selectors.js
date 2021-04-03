import {NameSpace} from "../../utils/constants";

export const getMovies = (store) => store[NameSpace.MOVIES].movies;

export const getGenres = (store) => store[NameSpace.MOVIES].genres;

export const getPromo = (store) => store[NameSpace.MOVIES].promo;

export const getComments = (store) => store[NameSpace.MOVIES].comments;

export const getIsDataDownloaded = (store) => store[NameSpace.MOVIES].isDataDownloaded;
