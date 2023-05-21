export default function SorryPage() {
  return (
    <section className="absolute inset-0 m-auto w-fit h-fit">
      {Array(20)
        .fill(
          <div className="flex justify-center">
            <p
              className="h-fit w-fit animate-ping font-bold"
              style={{ animationDuration: "5000ms" }}
            >
              sorry Corina ❤️
            </p>
          </div>
        )
        .map((e) => e)}
    </section>
  );
}
