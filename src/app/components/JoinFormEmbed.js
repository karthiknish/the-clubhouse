"use client";

const JoinFormEmbed = () => {
  return (
    <section id="join-form" className="bg-[#393F37] py-12">
      <h2 className="text-center text-5xl font-semibold text-white">
        Join Clubhouse
      </h2>
      <iframe
        id="JotFormIFrame-241052282184046"
        title="Clubhouse Business App"
        allowtransparency="true"
        allow="geolocation; microphone;"
        src="https://form.jotform.com/241052282184046"
        frameBorder="0"
        style={{
          minWidth: "100%",
          maxWidth: "100%",
          height: "539px",
          border: "none",
          backgroundColor: "transparent",
        }}
        scrolling="no"
      />
    </section>
  );
};

export default JoinFormEmbed;
