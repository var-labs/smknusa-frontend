import "@/app/globals.css";

export const metadata = {
  title: "School Work Program",
  description: "SMKN 1 Purwosari School Work Program",
};

export default function SchoolCourseWorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
