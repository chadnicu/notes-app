import { SignUp } from '@clerk/nextjs/app-beta';

export default function Page() {
  return (
    <div className="absolute inset-0 m-auto h-fit w-fit">
      <SignUp signInUrl="/sign-in" />
    </div>
  );
}
