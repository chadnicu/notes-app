import { currentUser } from '@clerk/nextjs/app-beta';
import Form from './Form';

export const metadata = {
  title: 'Your notes',
  description: 'Your notes',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center justify-end px-12">
        <Form />
      </div>
      {children}
    </section>
  );
}
