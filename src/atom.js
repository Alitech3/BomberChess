import { atom } from "jotai";
const Data = atom(undefined);
const Active = atom({user: undefined, board: undefined, lobbyId: undefined});
export { Data, Active };