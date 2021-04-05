import {NameSpace} from "../../utils/constants";

export const getIsErrorCommentForm = (store) => store[NameSpace.REVIEW].isErrorCommentForm;

export const getIsBlockedCommentForm = (store) => store[NameSpace.REVIEW].isBlockedCommentForm;

