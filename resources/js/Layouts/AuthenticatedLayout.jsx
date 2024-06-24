import {Head, Link} from '@inertiajs/react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpRightFromSquare, faDashboard, faBarChart, faMessage, faUsers, faList, faLayerGroup, faCaretDown} from "@fortawesome/free-solid-svg-icons";
import ProfileDropDown from "@/Components/ProfileDropDown.jsx";
import {useState, useRef, useEffect} from "react";

export default function AuthenticatedLayout({auth, children}) {
    const [isPostsDropdownOpen, setIsPostsDropdownOpen] = useState(false);
    const [isUsersDropdownOpen, setIsUsersDropdownOpen] = useState(false);
    const postsDropdownRef = useRef(null);
    const usersDropdownRef = useRef(null);

    const togglePostsDropdown = () => setIsPostsDropdownOpen(!isPostsDropdownOpen);
    const toggleUsersDropdown = () => setIsUsersDropdownOpen(!isUsersDropdownOpen);

    const handleClickOutside = (event) => {
        if (postsDropdownRef.current && !postsDropdownRef.current.contains(event.target)) {
            setIsPostsDropdownOpen(false);
        }
        if (usersDropdownRef.current && !usersDropdownRef.current.contains(event.target)) {
            setIsUsersDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (<div className="min-h-screen flex flex-col item-start">
        <Head title="Dashboard"/>
        {/* Navigation */}
        <nav className="bg-gray-800 fixed w-full h-16 top-0">
            <div className="w-full mx-auto px-4 flex flex-row justify-between items-center h-16">
                <div className="flex items-center">
                    {/*<button className="text-gray-300 focus:outline-none lg:hidden">
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>*/}
                    <Link
                        href={route("admin.dashboard")}
                        className="text-white text-lg font-semibold ml-2 hover:text-gray-300"
                    >
                        Blog Admin
                    </Link>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <Link
                        href={route("home")}
                        className="text-white text-sm ml-2 hover:text-gray-300"
                    >
                        <FontAwesomeIcon icon={faUpRightFromSquare} className="me-1"/>Visit Website
                    </Link>
                    <ProfileDropDown/>
                </div>
            </div>
        </nav>

        <div className="flex flex-1 mt-16">
            <div className="bg-gray-800 text-white w-48 min-h-screen px-4 py-2">
                <ul className="space-y-3">
                    <li>
                        <Link
                            className="hover:text-gray-300"
                        >
                            <FontAwesomeIcon icon={faDashboard} className="me-1"/>Dashboard
                        </Link>
                    </li>
                    <li ref={postsDropdownRef}>
                        <div>
                            <button
                                className="hover:text-gray-300 flex items-center"
                                onClick={togglePostsDropdown}
                            >
                                    <span>
                                        <FontAwesomeIcon icon={faLayerGroup} className="me-1"/>
                                        Posts
                                    </span>
                                <FontAwesomeIcon icon={faCaretDown} className="ms-1"/>
                            </button>
                            {isPostsDropdownOpen && (
                                <ul className="pl-6 mt-2 space-y-2">
                                    <li>
                                        <Link
                                            href = {route("admin.posts.index")}
                                            className="hover:text-gray-300"
                                        >
                                            View All Posts
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href = {route("admin.posts.create")}
                                            className="hover:text-gray-300"
                                        >
                                            Add Post
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </li>
                    <li>
                        <Link
                            className="hover:text-gray-300"
                        >
                            <FontAwesomeIcon icon={faList} className="me-1"/>Categories
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="hover:text-gray-300"
                        >
                            <FontAwesomeIcon icon={faMessage} className="me-1"/>Comments
                        </Link>
                    </li>
                    <li ref={usersDropdownRef}>
                        <div>
                            <button
                                className="hover:text-gray-300 flex items-center"
                                onClick={toggleUsersDropdown}
                            >
                                    <span>
                                        <FontAwesomeIcon icon={faUsers} className="me-1"/>
                                        Users
                                    </span>
                                <FontAwesomeIcon icon={faCaretDown} className="ms-1"/>
                            </button>
                            {isUsersDropdownOpen && (
                                <ul className="pl-6 mt-2 space-y-2">
                                    <li>
                                        <Link
                                            className="hover:text-gray-300"
                                        >
                                            All Users
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="hover:text-gray-300"
                                        >
                                            Add User
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </li>
                    <li>
                        <Link
                            className="hover:text-gray-300"
                        >
                            <FontAwesomeIcon icon={faBarChart} className="me-1"/>Your Profile
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-0">
                {children}
            </div>
        </div>

    </div>);
}
