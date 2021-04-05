import {NameSpace} from "../../utils/constants";

export const getAuthorizationStatus = (store) => store[NameSpace.AUTHORIZATION].authorizationStatus;

export const getUser = (store) => store[NameSpace.AUTHORIZATION].user;
