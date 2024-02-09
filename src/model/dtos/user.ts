import { LibraryItemDto } from "./library-item";

export interface User{
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string,
    libraryItemDtos: LibraryItemDto[],
}