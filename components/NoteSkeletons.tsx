import NoteSkeleton from "@/components/NoteSkeleton";

export default function NoteSkeletons() {
  return (
    <div className="mb-16 grid grid-cols-1 place-items-center gap-10 py-10 md:grid-cols-2 md:place-items-start md:p-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array(4)
        .fill(<NoteSkeleton />)
        .map((note, i) => (
          <div key={i}>{note}</div>
        ))}
    </div>
  );
}
