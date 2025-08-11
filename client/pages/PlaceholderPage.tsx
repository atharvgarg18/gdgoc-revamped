import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              <div className="w-12 h-12 rounded-full bg-gdsc-blue animate-pulse"></div>
              <div className="w-12 h-12 rounded-full bg-gdsc-red animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-12 h-12 rounded-full bg-gdsc-yellow animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              <div className="w-12 h-12 rounded-full bg-gdsc-green animate-pulse" style={{ animationDelay: "0.6s" }}></div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{description}</p>
          
          <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🚧 Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              This page is currently under development. We're working hard to bring you amazing content!
            </p>
            <button className="bg-gdsc-blue text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors">
              Notify Me When Ready
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
