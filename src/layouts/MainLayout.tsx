const MainLayout = ({ children }) => {
  return (
    <div className="h-screen bg-gray-400 p-8 flex flex-col antialiased">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-around items-center">
        <nav className="space-x-24">
          <a href="#" className="text-white hover:text-gray-300">Home</a>
          <a href="#" className="text-white hover:text-gray-300">About</a>
          <a href="#" className="text-white hover:text-gray-300">Services</a>
          <a href="#" className="text-white hover:text-gray-300">Contact</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-white p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center p-4 mt-8">
        <p>&copy; 2025 My Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
