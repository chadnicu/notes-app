type NoteProps = {
  id: number;
  title: string;
  content: string;
  published: Date;
};

export default function Note({ id, title, content, published }: NoteProps) {
  const formattedDate = `${published.getDate()}/${published.getMonth()}/${published.getFullYear()}`;

  return (
    <div className="flex w-fit min-w-[300px] flex-col gap-2 rounded-md bg-blue-300 p-5 m-5 text-center">
      <p className="text-left">{id}</p>
      <h1 className="text-2xl font-medium">{title}</h1>
      <p className="text-lg">{content}</p>
      <p className="text-right text-xs">{formattedDate}</p>
    </div>
  );
}
