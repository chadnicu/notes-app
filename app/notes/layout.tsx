import Form from "./Form";
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { addNote } from "@/lib/actions";

// export async function addNote(
//   title: string,
//   content: string | null,
//   userId: string
// ) {
//   "use server";

//   await prisma.note.create({
//     data: {
//       title,
//       content,
//       userId,
//     },
//   });

//   // return new NextResponse(JSON.stringify({ title, content }));
// }

export const metadata = {
  title: "Your notes",
  description: "Your notes",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  return (
    <section>
      {/* <div className="flex items-center justify-end px-12"> */}
      {/* </div> */}
      {children}
    </section>
  );
}
