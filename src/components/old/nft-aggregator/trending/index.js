import DataTable from "./DataTable";
import Header from "./Header";
import TableHeader from "./TableHeader";

const TrendingContent = () => {
  return (
    <div
      role="table"
      className="rounded-2lg border border-jacarta-100 bg-white text-sm dark:border-jacarta-800 dark:bg-secondaryBlack dark:text-white"
    >
      <Header />
      <TableHeader />
      <DataTable />
    </div>
  );
};

export default TrendingContent;
