import "@/app/globals.css";

export const metadata = {
  title: "School History",
  description: "SMKN 1 Purwosari History",
};

export default function SchoolHistoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
