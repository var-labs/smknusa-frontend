import "@/app/globals.css";

export const metadata = {
  title: "School E-Learning",
  description: "SMKN 1 Purwosari E-Learning",
};

export default function EleanrLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section>{children}</section>;
}
