export const dynamic = "force-static";
export default function Page() {
  return (
    <div className="grid justify-center">
      {Array(50000)
        .fill(<p className="text-lg font-bold">O iubesk pe Corina</p>)
        .map((element, index) => (
          <div key={index}>{element}</div>
        ))}
    </div>
  );
}
