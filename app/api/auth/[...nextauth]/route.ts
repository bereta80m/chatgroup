import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_SECRET_ID as string, 
      }),
    ],
    pages:{
      signIn:"/Login",
      newUser:'/chat/SNv4Hmq3o7sYRvFSCgIB'
    },
    secret: process.env.NEXTAUTH_SECRET as string,
  };
  
  const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST };