import { Iuser } from "./iuser";

export interface IuserResponse {
    message? : string,
    msg? : string,
    token? : string,
    data? : Iuser | Iuser[] | null,
    err? : unknown
}
