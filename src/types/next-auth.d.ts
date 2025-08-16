import "next-auth";
import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface User {
        _id?: string,
        isVarified?: boolean,
        isAccpect?: boolean,
        username?: string
        email?: string | null;
    }
    interface Session {
        user: {
            _id?: string,
            isVarified?: boolean,
            isAccpect?: boolean,
            username?: string
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string,
        isVarified?: boolean,
        isAccpect?: boolean,
        username?: string
    }
}