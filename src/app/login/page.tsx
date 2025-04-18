'use client';


import Footer from '../../components/Footer';
import LoginForm from '../../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      
      <main className="flex-grow py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Sign In to Vegas Ailure</h1>
          <LoginForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
