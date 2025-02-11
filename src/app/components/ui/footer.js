export default function Footer() {
  return (
    <footer className="bg-[#393F37] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="mb-4">
          Contact us: support@theclubhouse.co.uk | Tel: 0207 100 4018
        </p>

        <p className="mt-4 text-sm">
          © {new Date().getFullYear()} - All Rights Reserved | Clubhouse
        </p>
      </div>
    </footer>
  );
}
