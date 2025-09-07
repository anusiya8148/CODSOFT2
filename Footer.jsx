export default function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500 flex justify-between">
        <p>© {new Date().getFullYear()} JobBoard Pro</p>
        <p>Built with  using React & Node</p>
      </div>
    </footer>
  );
}
