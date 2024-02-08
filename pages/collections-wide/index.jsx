import Image from "next/image";
import Meta from "../../components/Meta";
import Collections from "../../components/collections-wide/collection-content";
import FilterSortHeader from "../../components/collections-wide/collection-content/FilterSortHeader";
import Sidebar from "../../components/collections-wide/sidebar";

const index = () => {
  return (
    <>
      <Meta title="Collections Wide Sidebar" />
      {/* End page title */}

      <main className="mt-24">
        {/* Collections */}
        <section className="relative pt-16 pb-24">
          <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
            <Image
              width={1519}
              height={773}
              priority
              src="/images/gradient_light.jpg"
              alt="gradient"
              className="h-full w-full object-cover"
            />
          </picture>
          <div className="px-6 xl:px-24">
            {/* Filters / Sorting */}
            <FilterSortHeader />
            {/* end filters / sorting */}
            <div className="lg:flex mt-6">
              {/* Sidebar */}
              <Sidebar />
              {/* end sidebar */}
              {/* Content */}
              <div className="lg:w-4/5 js-collections-content">
                <div className="mb-8 pb-px">
                  <h1 className="pt-3 mb-2 font-display text-2xl font-medium text-jacarta-700 dark:text-white">
                    Explore Collections
                  </h1>
                  <p className="dark:text-jacarta-400 font-medium text-2xs">
                    156,893 items
                  </p>
                </div>

                <Collections />
              </div>{" "}
              {/* end content */}
            </div>
          </div>
        </section>
        {/* end collections */}
      </main>
    </>
  );
};

export default index;
