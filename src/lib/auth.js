import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials) {
        // Test kullanıcısı kontrolü
        if (
          credentials.email === "test@example.com" &&
          credentials.password === "test123"
        ) {
          return {
            id: 1,
            fullName: "Serkan Yalçın",
            email: credentials.email,
            avatar: null,
            commentsCount: 12,
            followingCount: 5,
            createdAt: "2024-01-01",
            isVerified: true,
            membershipLevel: "Premium Üye",
            stats: {
              totalComments: 12,
              totalLikes: 45,
              following: 5,
            },
            recentActivities: [
              {
                description: "Yeni bir yorum ekledi",
                date: "2024-01-15",
              },
              {
                description: "Bir markayı takip etti",
                date: "2024-01-14",
              },
            ],
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    // async session({ session, token }) {
    //   session.user = token.user;
    //   return session;
    // }
  },
};
