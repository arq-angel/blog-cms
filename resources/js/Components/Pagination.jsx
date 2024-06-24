import {Link} from "@inertiajs/react";
import PropTypes from 'prop-types';

export default function Pagination({links}) {
    return (<nav className="text-center mt-4 mb-3">
        {links.map(link => (<Link
            preserveScroll
            href={link.url || ""}
            key={link.label}
            className={"inline-block py-2 px-3 rounded-lg text-dark-200 text-xs" + (link.active ? "bg-gray-950 " : " ") + (!link.url ? "!text-white-500 cursor-not-allowed " : "hover:bg-gray-950 hover:text-white")}
            dangerouslySetInnerHTML={{__html: link.label}}>
        </Link>))}
    </nav>)
}

Pagination.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string,
            label: PropTypes.string.isRequired,
            active: PropTypes.bool.isRequired
        })
    ).isRequired
};
