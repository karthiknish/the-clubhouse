import Image from "next/image";
import Link from "next/link";
import JoinFormEmbed from "../components/JoinFormEmbed";
import { getPageContent } from "@/lib/contentService";

export const dynamic = "force-dynamic";

const ClubHospitalityPage = async () => {
  const {
    clubHospitality: { hero, tailored, experiences, benefits, finalCta },
  } = await getPageContent();

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden bg-[#f7f5f0]">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.4em] text-[#9A8C7B]">
                Club Hospitality
              </p>
              <h1 className="mt-6 text-4xl font-semibold text-[#393F37] sm:text-5xl">
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
              <div className="mt-8">
                <Link
                  href="#join-form"
                  className="inline-flex items-center justify-center rounded-full bg-[#393F37] px-7 py-3 text-base font-semibold text-white transition hover:bg-[#4a5246]"
                >
                  {hero.ctaLabel}
                </Link>
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

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="max-w-3xl pt-12">
          <h2 className="text-3xl font-semibold text-[#393F37] sm:text-4xl">
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
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <article
              key={experience.title}
              className="group overflow-hidden rounded-3xl bg-[#f0ede6] shadow-sm transition hover:shadow-xl"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={experience.image}
                  alt={experience.alt}
                  fill
                  priority={experience.title === "Formula 1"}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#393F37]">
                  {experience.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#55594F]">
                  {experience.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#1f2620] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-semibold sm:text-4xl">
            {benefits.heading}
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {benefits.cards.map((benefit, index) => (
              <div
                key={benefit.title}
                className="flex h-full flex-col rounded-3xl bg-white/10 p-8 backdrop-blur"
              >
                <div className="text-sm uppercase tracking-[0.3em] text-[#d8cdb7]">
                  Step {index + 1}
                </div>
                <h3 className="mt-4 text-2xl font-semibold">{benefit.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-[#e8e6df]">
                  {benefit.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <Link
              href="#join-form"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-[#1f2620] transition hover:bg-[#f5f5f5]"
            >
              {benefits.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#393F37] to-[#4a5246] py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            {finalCta.heading}
          </h2>
          <p className="mt-4 text-lg text-[#d1d5d0]">
            {finalCta.body}
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="#join-form"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-[#393F37] transition hover:bg-[#f5f5f5]"
            >
              {finalCta.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      <JoinFormEmbed />
    </main>
  );
};

export default ClubHospitalityPage;
