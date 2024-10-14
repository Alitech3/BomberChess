import { atom } from "jotai";
const Data = atom(undefined);
const Active = atom({user: undefined, board: undefined, lobbyId: undefined});
const Threats = atom([]);
export { Data, Active, Threats };