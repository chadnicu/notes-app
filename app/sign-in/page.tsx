import { SignIn } from '@clerk/nextjs/app-beta';

export default function Page() {
  return (
    <div className="absolute inset-0 m-auto h-fit w-fit">
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
}
