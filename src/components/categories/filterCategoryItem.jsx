import React, { useEffect } from "react";
import { trendingCategoryData } from "../../data/categories_data";
import CollectionCategoryFilter from "../collections/collection_category_filter";
import CategoryItem from "./categoryItem";
import { useDispatch } from "react-redux";
import { updateTrendingCategoryItemData } from "../../redux/counterSlice";

const FilterCategoryItem = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTrendingCategoryItemData(trendingCategoryData.slice(0, 8)));
  }, [dispatch]);

  return (
    <div>
      {/* <!-- Filter --> */}
      <CollectionCategoryFilter />
      <CategoryItem />
    </div>
  );
};

export default FilterCategoryItem;
