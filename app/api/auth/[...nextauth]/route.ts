import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase()

        // Check if user exists
        const user = await User.findOne({ email: credentials?.email })

        if (!user) {
          // Check if this is the first login with admin credentials
          if (credentials?.email === process.env.ADMIN_EMAIL && credentials?.password === process.env.ADMIN_PASSWORD) {
            // Create the admin user
            const newAdmin = await User.create({
              email: process.env.ADMIN_EMAIL,
              password: process.env.ADMIN_PASSWORD,
              role: "admin",
            })

            return {
              id: newAdmin._id.toString(),
              email: newAdmin.email,
              role: newAdmin.role,
            }
          }
          throw new Error("Invalid credentials")
        }

        // Check password
        const isMatch = await bcrypt.compare(credentials?.password || "", user.password)

        if (!isMatch) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
