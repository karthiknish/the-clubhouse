export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#393F37] to-[#4a5246] py-20 px-4">
      <div className="max-w-2xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Thank You for Your Interest!
        </h1>
        <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm">
          <p className="text-xl mb-6 text-center">
            We've received your enquiry and will be in touch shortly.
          </p>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center">
              <svg
                className="w-6 h-6 mr-3 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Your application is being reviewed by our team
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 mr-3 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              You'll receive an email confirmation shortly
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 mr-3 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              A member of our team will contact you within 24 hours
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
