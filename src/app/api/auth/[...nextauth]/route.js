import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials.email === "test@example.com" &&
          credentials.password === "test123"
        ) {
          return {
            id: 1,
            fullName: "Serkan Yalçın",
            email: "test@example.com",
            accountType: "individual",
            avatar: null,
            phone: "+90 555 123 4567",
            city: "İstanbul",
            createdAt: "2024-01-01",
            isVerified: true,
            membershipLevel: "Premium Üye",
            stats: {
              totalComments: 128,
              totalLikes: 456,
              following: 24,
            },
            recentActivities: [
              {
                id: 1,
                description: "Yeni bir yorum ekledi",
                date: "2024-03-15",
                target: "Apple iPhone 15 Pro",
              },
              {
                id: 2,
                description: "Samsung'u takip etmeye başladı",
                date: "2024-03-14",
                target: "Samsung",
              },
              {
                id: 3,
                description: "Bir yorumu beğendi",
                date: "2024-03-13",
                target: "MacBook Air M3",
              },
            ],
            notifications: {
              email: true,
              push: false,
              marketing: true,
            },
            preferences: {
              language: "tr",
              theme: "system",
            },
          };
        }

        if (
          credentials.email === "business@example.com" &&
          credentials.password === "test123"
        ) {
          return {
            id: 2,
            fullName: "İş Yeri Hesabı",
            email: "business@example.com",
            accountType: "business",
            businessName: "Test İşletmesi",
            businessType: "Elektronik",
            businessPhone: "+90 555 987 6543",
            businessAddress: "İstanbul, Türkiye",
            createdAt: "2024-01-01",
            isVerified: true,
            membershipLevel: "Premium Üye",
            stats: {
              totalComments: 128,
              totalLikes: 456,
              following: 24,
            },
            recentActivities: [
              {
                id: 1,
                description: "Yeni bir yorum ekledi",
                date: "2024-03-15",
                target: "Apple iPhone 15 Pro",
              },
              {
                id: 2,
                description: "Samsung'u takip etmeye başladı",
                date: "2024-03-14",
                target: "Samsung",
              },
              {
                id: 3,
                description: "Bir yorumu beğendi",
                date: "2024-03-13",
                target: "MacBook Air M3",
              },
            ],
            notifications: {
              email: true,
              push: false,
              marketing: true,
            },
            preferences: {
              language: "tr",
              theme: "system",
            },
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  // session: {
  //   strategy: "jwt",
  // },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          ...user,
          accountType: user.accountType,
        };
      }
      return token;
    },
    // async session({ session, token }) {
    //   session.user = {
    //     ...token.user,
    //     accountType: token.user.accountType,
    //   };
    //   return session;
    // },
  },
});

export { handler as GET, handler as POST };
