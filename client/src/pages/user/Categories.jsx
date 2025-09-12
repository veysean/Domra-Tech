import { useEffect, useState } from "react";
import {CategoryServices} from "../../api";
import { motion } from "framer-motion";

export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await CategoryServices.findAll();
            setCategories(response.data);
            console.log("Fetched categories:", response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    fetchCategories();
    }, []);
    
    const CategoryCard = ({title, description }) => (
        <div className="w-80 h-44 p-9 bg-white rounded-[20px] border-t-[3px] outline-1 outline-offset-[-1px] outline-slate-200 border-indigo-500 inline-flex flex-col justify-start items-center gap-5 hover:shadow-lg transition-shadow duration-300">
            <div className="justify-start text-indigo-500 text-base font-medium font-['Inter'] group-hover:font-bold"> {title}</div>
            <div className="w-80 h-20 text-center justify-start text-slate-500 text-sm font-medium font-['Inter']">{description}</div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
        <div className="categories-page">
            <div className="max-w-[1156px] m-auto flex flex-col items-center gap-8 p-10">
                <h1 className="text-3xl font-bold gradient-text">Our Categories</h1>
                <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.categoryId}
                        title={category.categoryName}
                        description={category.description}
                    />
                ))}
                </div>
            </div>
        </div>
        </motion.div>
    );
}