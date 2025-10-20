import Link from "next/link";
import Image from "next/image";
import JoinFormEmbed from "../components/JoinFormEmbed";
import { getPageContent } from "@/lib/contentService";

export const dynamic = "force-dynamic";

const LuxuryTravelPage = async () => {
  const {
    luxuryTravel: { hero, tailored, conciergeHighlights, assurance },
  } = await getPageContent();

  return (
    <main className="bg-white text-[#393F37]">
      <section className="relative isolate overflow-hidden bg-[#f7f5f0]">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.4em] text-[#A0886B]">
                Luxury Travel
              </p>
              <h1 className="mt-6 text-4xl font-semibold sm:text-5xl">
                {hero.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[#55594F]">
                {hero.body}
              </p>
              <ul className="mt-4 space-y-2 text-lg text-[#393F37]">
                {hero.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="#join-form"
                  className="inline-flex items-center justify-center rounded-full bg-[#393F37] px-8 py-3 text-base font-semibold text-white transition hover:bg-[#4a5246]"
                >
                  {hero.primaryCtaLabel}
                </Link>
                {hero.secondaryCta ? (
                  <Link
                    href={hero.secondaryCta.href}
                    className="inline-flex items-center justify-center rounded-full border border-[#393F37] px-8 py-3 text-base font-semibold text-[#393F37] transition hover:bg-[#393F37] hover:text-white"
                  >
                    {hero.secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </div>
            {hero.image?.src ? (
              <div className="relative hidden h-96 overflow-hidden rounded-3xl shadow-lg lg:block">
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              {tailored.heading}
            </h2>
            {tailored.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`text-lg leading-relaxed text-[#55594F] ${index === 0 ? "mt-6" : "mt-4"}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
          {tailored.image?.src ? (
            <div className="relative h-80 overflow-hidden rounded-3xl">
              <Image
                src={tailored.image.src}
                alt={tailored.image.alt}
                fill
                className="object-cover"
              />
            </div>
          ) : null}
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {conciergeHighlights.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-[#E7E3DA] bg-[#F7F5F0] p-8 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-[#393F37]">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#55594F]">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#1f2620] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-semibold sm:text-4xl">
            {assurance.heading}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-[#d1d9d0]">
            {assurance.intro}
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {assurance.items.map((item) => (
              <div
                key={item.title}
                className="flex h-full flex-col rounded-3xl bg-white/10 p-8 backdrop-blur"
              >
                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-[#e8e6df]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <Link
              href="#join-form"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-[#1f2620] transition hover:bg-[#f5f5f5]"
            >
              {assurance.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      <JoinFormEmbed />
    </main>
  );
};

export default LuxuryTravelPage;
