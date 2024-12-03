import React from "react";
import ProductCard from "./ProductCard";

const ProductsList = ({ data }) => {
	return (
		<>
			{data?.map((product, index) => (
				<ProductCard product={product} key={index} />
			))}
		</>
	);
};

export default ProductsList;
