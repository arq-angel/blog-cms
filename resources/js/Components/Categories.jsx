import PropTypes from "prop-types";
import {Link, router} from "@inertiajs/react";

export default function Categories({categories})
{
    const getCategoryResults = (event, category) => {
        event.preventDefault();
        router.get(route('categories.show', category.id))
    };
    return (
        <div className="mb-8 p-4 bg-gray-100 rounded">
            <h4 className="text-xl font-bold mb-4">Categories</h4>
            <div className="flex flex-wrap">
                <div>
                    <ul className="list-none">
                        {categories.map((category) => (
                            <li key={category.id} className="text-blue-500">
                                <Link
                                    href='#'
                                    onClick={(event) => getCategoryResults(event, category)}
                                >
                                    {category.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

Categories.propTypes = {
    categories: PropTypes.array
};
