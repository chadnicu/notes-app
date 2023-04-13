import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="flex justify-center">
      <div className={`absolute inset-0 m-auto flex h-8 justify-center`}>
        <LoadingSpinner />
      </div>
    </div>
  );
}
