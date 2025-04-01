import { SessionProvider, useSession } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import '../styles/globals.css';

// Define a proper type for page props
type PageProps = {
  [key: string]: unknown;
};

type CustomAppProps = AppProps & {
  Component: AppProps['Component'] & {
    auth?: {
      required: boolean;
      role?: string;
    };
  };
  pageProps: PageProps;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      <AuthWrapper Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

function AuthWrapper({ 
  Component, 
  pageProps 
}: { 
  Component: CustomAppProps['Component']; 
  pageProps: PageProps 
}) {
  if (Component.auth?.required) {
    return (
      <Auth requiredRole={Component.auth.role}>
        <Component {...pageProps} />
      </Auth>
    );
  }

  return <Component {...pageProps} />;
}

function Auth({ children, requiredRole }: { children: ReactNode; requiredRole?: string }) {
  const router = useRouter();
  const { data: session, status } = useSession({ required: true });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
      return;
    }

    if (requiredRole && session.user?.role !== requiredRole) {
      router.push('/unauthorized');
    }
  }, [session, status, requiredRole, router]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (requiredRole && session?.user?.role !== requiredRole) {
    return <div className="flex justify-center items-center h-screen">Unauthorized</div>;
  }

  return <>{children}</>;
}

export default MyApp;