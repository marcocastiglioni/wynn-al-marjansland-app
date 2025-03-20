'use client';

import { useState, ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider, hydrate } from '@tanstack/react-query';

interface QueryProviderProps {
  dehydratedState: unknown;
  children: ReactNode;
}

export default function QueryProvider({
    dehydratedState,
    children,
}: QueryProviderProps ) {
    const [queryClient] = useState(() => new QueryClient());

    useEffect(() => {
        if ( dehydratedState ) {
            hydrate(queryClient, dehydratedState);
        }
    }, [queryClient, dehydratedState]);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
