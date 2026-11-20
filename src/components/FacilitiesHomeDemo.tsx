
import { Link } from "react-router-dom";
import { ArrowRight, Monitor } from "lucide-react";
import type { ElementType } from "react";
import ScrollReveal from "./ScrollReveal";

type Facility = {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
};

type Props = {
  facilities: Facility[];
  iconMap: Record<string, ElementType>;
};

export default function FacilitiesHomeDemo({
  facilities,
  iconMap,
}: Props) {
  const featured = facilities.slice(0, 1);
  const others = facilities.slice(1, 5);

  return (
    <section className="home-facilities-demo bg-[#f8f8f3] py-16 md:py-24">
      <div className="container-mcp">

        {/* SECTION HEADER */}
        <ScrollReveal direction="up">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[4px] text-[#b18b32]">
              Infrastructure & Learning
            </span>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-[#103d2e] md:text-5xl">
              Explore Our Facilities
            </h2>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#d8b54c]" />

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600">
              Discover our modern infrastructure, advanced practical
              training spaces and learning environments designed to
              support excellence in physiotherapy education.
            </p>
          </div>
        </ScrollReveal>

        {/* FACILITY LAYOUT */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* LEFT FEATURED CARD */}
          {featured.map((facility) => {
            const Icon = iconMap[facility.icon] ?? Monitor;

            return (
              <ScrollReveal
                key={facility.id}
                direction="left"
              >
                <Link
                  to="/facilities"
                  className="facility-card group relative block h-[420px] overflow-hidden rounded-2xl bg-[#103d2e] md:h-[540px]"
                >
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#061f17]/95 via-[#061f17]/35 to-transparent" />

                  <span className="absolute left-6 top-6 rounded-full border border-white/30 bg-[#103d2e]/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[2px] text-[#f1cf62] backdrop-blur">
                    Featured Facility
                  </span>

                  <div className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 text-[#103d2e]">
                    <Icon size={23} />
                  </div>

                  <div className="absolute bottom-0 left-0 p-7 md:p-10">
                    <div className="mb-5 h-[3px] w-14 rounded-full bg-[#d8b54c] transition-all duration-500 group-hover:w-24" />

                    <h3 className="font-serif text-3xl font-semibold text-white md:text-4xl">
                      {facility.name}
                    </h3>

                    <p className="mt-4 max-w-lg text-sm leading-7 text-white/80">
                      {facility.description}
                    </p>

                    <span className="mt-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[2px] text-[#f1cf62]">
                      Explore Facility
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-500 group-hover:translate-x-2"
                      />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
          );
          })}

          {/* RIGHT SIDE FACILITIES */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            {others.map((facility, index) => {
              const Icon = iconMap[facility.icon] ?? Monitor;

              return (
                <ScrollReveal
                  key={facility.id}
                  direction="right"
                  delay={index * 120}
                >
                  <Link
                    to="/facilities"
                    className="facility-card group relative block h-[250px] overflow-hidden rounded-2xl bg-[#103d2e] md:h-[257px]"
                  >
                    <img
                      src={facility.image}
                      alt={facility.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#061f17]/95 via-[#061f17]/20 to-transparent" />

                    <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-[#103d2e]">
                      <Icon size={19} />
                    </div>

                    <div className="absolute bottom-0 left-0 p-5">
                      <div className="mb-3 h-[3px] w-9 rounded-full bg-[#d8b54c] transition-all duration-500 group-hover:w-16" />

                      <h3 className="font-serif text-xl font-semibold text-white">
                        {facility.name}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-xs leading-6 text-white/80">
                        {facility.description}
                      </p>

                      <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#f1cf62]">
                        Discover
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}

          </div>
        </div>

        {/* EXPLORE BUTTON */}
        <ScrollReveal direction="up">
          <div className="mt-12 text-center">
            <Link
              to="/facilities"
              className="inline-flex items-center gap-3 rounded-lg bg-[#103d2e] px-8 py-4 text-sm font-bold text-white transition-all duration-500 hover:-translate-y-1 hover:bg-[#18533d] hover:shadow-xl"
            >
              Explore All Facilities
              <ArrowRight size={17} />
            </Link>
          </div>
        </ScrollReveal>

      </div>

      {/* ANIMATIONS */}
      <style>{`
        .home-facilities-demo .facility-card {
          isolation: isolate;
          box-shadow: 0 8px 25px rgba(16,61,46,.08);
          transition:
            transform .7s cubic-bezier(.2,.7,.2,1),
            box-shadow .7s ease;
        }

        .home-facilities-demo .facility-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 22px 45px rgba(16,61,46,.20);
        }

        @media (prefers-reduced-motion: reduce) {
          .home-facilities-demo .facility-card,
          .home-facilities-demo .facility-card img {
            transition: none !important;
          }

          .home-facilities-demo .facility-card:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
