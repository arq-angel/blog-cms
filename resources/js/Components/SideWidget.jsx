import PropTypes from "prop-types";
import {Link} from "@inertiajs/react";

export default function SideWidget({recentPosts}) {
    return (<div className="mb-8 p-4 bg-gray-100 rounded">
        <h4 className="text-xl font-bold mb-4">Recent Posts</h4>

        <div className="flex flex-col justify-between space-y-2">
            {recentPosts.map((post) => (<div key={post.id} className="flex flex-row items-start justify-between">
                <div className="flex flex-col items-start">
                    <Link
                        href='#'

                        className="rounded-md font-bold text-blue-500 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                    >
                        {post.title}
                    </Link>
                    <div className="text-sm">
                        By<span className="ms-1">{post.author}</span>
                    </div>
                </div>
                <div className="pt-1 max-h-10 max-w-10 overflow-hidden">
                    <img
                        className="object-cover w-full h-full"
                        src={post.image}
                        alt={post.title}
                    />
                </div>
            </div>))}
        </div>
    </div>)
}

SideWidget.propTypes = {
    recentPosts: PropTypes.array
}
