import Form from './Form';

export const metadata = {
  title: 'Your notes',
  description: 'Your notes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center justify-center px-12 md:justify-end">
        <Form />
      </div>
      {children}
    </section>
  );
}
