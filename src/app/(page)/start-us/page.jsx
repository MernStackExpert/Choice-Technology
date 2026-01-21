import StartUsClient from "./StartUsClient";

export const metadata = {
  title: "Get Started | Choice Technology",
  description: "Join Choice Technology today. Choose your plan and start your digital transformation journey.",
};

export default function StartUsPage() {
  return (
    <main className="min-h-screen pt-20 pb-10">
      <StartUsClient />
    </main>
  );
}