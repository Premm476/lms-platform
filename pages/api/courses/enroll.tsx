import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';

export default function EnrollPage() {
  const router = useRouter();
  const { id: courseId } = router.query;
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!courseId || status !== 'idle') return;

    const enroll = async () => {
      setStatus('loading');
      try {
        const response = await fetch(`/api/courses/${courseId}/enroll`, {
          method: 'POST'
        });

        if (!response.ok) {
          throw new Error('Enrollment failed');
        }

        setStatus('success');
        setMessage('Successfully enrolled! Redirecting...');
        setTimeout(() => router.push(`/course/${courseId}`), 2000);
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'An error occurred');
      }
    };

    enroll();
  }, [courseId, router, status]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {status === 'loading' && <p>Processing enrollment...</p>}
        {status === 'success' && (
          <div className="text-green-600">
            <p>{message}</p>
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-600">
            <p>{message}</p>
            <button
              onClick={() => {
                setStatus('idle');
                setMessage('');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/login?callbackUrl=${encodeURIComponent(context.resolvedUrl || '/')}`,
        permanent: false,
      },
    };
  }
  return { props: {} };
}