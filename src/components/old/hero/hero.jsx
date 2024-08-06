import Image from "next/image";
import { useChainContext } from "../../contexts/hooks/useChainContext";
import MainButton from "../../ui/buttons/mainButton";
import { activated_features } from "../../data/activated_features";
import ConditionalDisplayedComponent from "../../utils/ConditionalDisplayedComponent";

const Hero = () => {
  const { currentChainObject } = useChainContext();

  const chainId = currentChainObject?.chainId;
  return (
    <section className="relative  pt-24 md:pt-10 h-1527">
      <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 block dark:hidden h-full">
        <Image
          width={1519}
          height={760}
          src="/images/gradient.jpg"
          alt="gradient"
          className="h-full w-full object-cover"
        />
      </picture>
      <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden dark:block">
        <Image
          width={1519}
          height={760}
          src="/images/gradient_dark.jpg"
          alt="gradient dark"
          className="h-full w-full object-cover"
        />
      </picture>

      <div className="container h-full mx-auto">
        <div className="grid h-full items-center gap-4 ">
          <div className="col-span-6 flex h-full flex-col items-center justify-center py-10 md:items-start md:py-20 xl:col-span-6">
            <h1 className="text-jacarta-900 font-bold font-display mb-6 text-center text-5xl dark:text-white  lg:text-6xl xl:text-7xl">
              Unlock Smarter Monetization with d&gt;sponsor
            </h1>
            <p className="dark:text-jacarta-200 mb-8 text-center text-lg">
              Leverage audience engagement into investment opportunities. A new Web3 model for an
              enhanced media and creator economy.
            </p>
            <div className="flex items-center space-x-4 justify-center w-full">
              <ConditionalDisplayedComponent condition={activated_features.canCreateOffer}>
                <MainButton link={`/${chainId}/offer/create`} isPurple={true} text="Create" />
              </ConditionalDisplayedComponent>

              <MainButton link="#hot-offers" isPurple={false} text="Buy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
