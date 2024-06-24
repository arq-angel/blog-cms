import {Head, router} from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout.jsx";
import BlogPost from "@/Components/BlogPost.jsx";
import Pagination from "@/Components/Pagination.jsx";
import Categories from "@/Components/Categories.jsx";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import SideWidget from "@/Components/SideWidget.jsx";

export default function Index({auth, posts, navLinks = null, categories = null, recentPosts = null, queryParams = null}) {
    queryParams = queryParams || {}
    navLinks = navLinks || {}
    recentPosts = recentPosts || {}
    categories = categories || {}

    const [searchQuery, setSearchQuery] = useState(queryParams.searchQuery || '');

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchQuery.length > 3) {
            router.get(route('home'), { searchQuery });
        }
    };

    const getPost = (event, post) => {
        event.preventDefault();
        router.get(route('post.show', post.id))
    };

    return (<GuestLayout auth={auth} navLinks={navLinks}>
        <Head title="Home"/>

        {/* Page Content */}
        <div className="container mx-auto px-4 pt-20 min-h-screen">
            <div className="flex flex-wrap">
                {/* Blog Entries Column */}
                <div className="w-full md:w-2/3 lg:w-3/4 px-4">

                    {posts.data.map((post) => (<BlogPost key={post.id} post={post} getPost={getPost}/>))}

                    {/* Pagination */}
                    <Pagination links={posts.meta.links}/>
                </div>

                {/* Blog Sidebar Widgets Column */}
                <div className="w-full md:w-1/3 lg:w-1/4 px-4">
                    {/* Blog Search Well */}
                    <div className="mb-8 p-4 bg-gray-100 rounded">
                        <h4 className="text-xl font-bold mb-4">Blog Search</h4>
                        <div>
                            <form onSubmit={handleSearch} className="flex">
                                <input
                                    type="text"
                                    className="form-control p-2 flex-grow border border-gray-300 rounded-l"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="bg-gray-300 text-gray-600 px-4 py-2 rounded-r">
                                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Blog Categories Well */}
                    <Categories categories={categories}/>

                    {/* Side Widget Well */}
                    <SideWidget recentPosts={recentPosts}/>

                </div>
            </div>
        </div>
    </GuestLayout>);
}

Index.propTypes = {
    auth: PropTypes.object,
    queryParams: PropTypes.shape({
        searchQuery: PropTypes.string
    }),
    navLinks: PropTypes.array,
    categories: PropTypes.array,
    recentPosts: PropTypes.array,
    posts: PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            author_id: PropTypes.number,
            created_at: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        }).isRequired).isRequired,
        meta: PropTypes.shape({
            links: PropTypes.arrayOf(PropTypes.shape({
                url: PropTypes.string, label: PropTypes.string.isRequired, active: PropTypes.bool.isRequired,
            }).isRequired).isRequired,
        }).isRequired,
    }).isRequired,
};
