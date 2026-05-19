import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-paper text-foreground">
      <Navbar />
      <main className="mx-auto min-h-[635px] max-w-[640px] bg-[#fff9e8] px-5 pb-10 pt-10">
        <h1 className="mb-8 text-center font-sans text-4xl font-black tracking-normal text-black">{title}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
