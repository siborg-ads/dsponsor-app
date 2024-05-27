import HeadLine from "../headLine";
import { howItWorks } from "../../data/how_it_works_data";
import Image from "next/image";

const HowItWorks = ({ bgWhite = true }) => {
  return (
    <section className="dark:bg-jacarta-800 relative py-16">
      {bgWhite && (
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <Image src="/images/gradient_light.jpg" alt="gradient" className="h-full w-full object-cover" width={1559} height={761} />
        </picture>
      )}

      <div className="container">
        <HeadLine text="How It Works" classes="font-display text-jacarta-700 mb-16 text-center text-3xl dark:text-white" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {howItWorks.map((item) => {
            const { id, icon, title, text } = item;
            return (
              <div className="text-center newseLatter-item" key={id}>
                <div className={`mb-6 inline-flex rounded-full p-3`} style={{ backgroundColor: icon.parentBg }}>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full`} style={{ backgroundColor: icon.childBg }}>
                    <svg className="icon icon-wallet h-5 w-5 fill-white">
                      <use xlinkHref={`/icons.svg#${icon.svg}`}></use>
                    </svg>
                  </div>
                </div>
                <h3 className="font-display text-jacarta-700 mb-4 text-lg dark:text-white">
                  {id}. {title}
                </h3>
                <p className="dark:text-jacarta-300">{text}</p>
              </div>
            );
          })}
          
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
