export default function Footer() {
  return (
    <footer className="bg-[#393F37] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="mb-4">
          Contact us:{" "}
          <a href="mailto:support@theclubhouse.co.uk" className="underline">
            support@theclubhouse.co.uk
          </a>{" "}
          | Tel:{" "}
          <a href="tel:02071004018" className="underline">
            0207 100 4018
          </a>
        </p>

        <p className="mt-4 text-sm">
          © {new Date().getFullYear()} - All Rights Reserved |{" "}
          <a href="https://theclubhouse.co.uk" className="underline">
            Clubhouse
          </a>
        </p>
      </div>
    </footer>
  );
}
