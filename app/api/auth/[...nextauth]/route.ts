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
        try {
          const db = await connectToDatabase()
          if (!db) {
            console.error("Database connection failed during authentication")
            return null
          }

          // Check if user exists
          const user = await User.findOne({ email: credentials?.email }).catch((err) => {
            console.error("Error finding user:", err)
            return null
          })

          if (!user) {
            // Check if this is the first login with admin credentials
            if (
              credentials?.email === process.env.ADMIN_EMAIL &&
              credentials?.password === process.env.ADMIN_PASSWORD
            ) {
              try {
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
              } catch (error) {
                console.error("Error creating admin user:", error)
                return null
              }
            }
            return null
          }

          // Check password
          try {
            const isMatch = await bcrypt.compare(credentials?.password || "", user.password)

            if (!isMatch) {
              return null
            }

            return {
              id: user._id.toString(),
              email: user.email,
              role: user.role,
            }
          } catch (error) {
            console.error("Error comparing passwords:", error)
            return null
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
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
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-do-not-use-in-production",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
