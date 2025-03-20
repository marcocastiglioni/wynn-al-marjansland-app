import type { Metadata } from "next";
import { Libre_Caslon_Text, Montserrat, Actor } from 'next/font/google';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchNavigationData } from '@/app/services/navigationService';
import QueryProvider from '@/providers/QueryProvider';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const libreCaslon = Libre_Caslon_Text({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-libre-caslon',
});

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const actor = Actor({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-actor',
});

export const metadata: Metadata = {
  title: "Wynn Al Marjan Island | Integrated Resort | Opening 2027",
  description: "Overlooking its own beautiful white sand beach with views of the Arabian Gulf, Wynn Al Marjan Island is located less than an hour from the Dubai International Airport in the emirate of Ras Al Khaimah. Opening in early 2027.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['navigation'],
    queryFn: fetchNavigationData
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en" className={`${libreCaslon.variable} ${montserrat.variable} ${actor.variable}`}>
      <body className={`antialiased`}>
        <QueryProvider dehydratedState={dehydratedState}>
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
