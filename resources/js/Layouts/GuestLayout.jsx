import {Link, router} from '@inertiajs/react';
import PropTypes from 'prop-types';

export default function GuestLayout({children, auth, navLinks}) {
    const getCategoryResults = (event, category) => {
        event.preventDefault();
        router.get(route('categories.show', category.id))
    };
    return (<>
        {/*Navigation*/}
        <nav className="bg-gray-800 fixed w-full z-10 top-0">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('home')}
                            className="rounded-md text-xl font-bold text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Blog Home
                        </Link>


                        <ul className="flex space-x-4">
                            {navLinks.map((category) => (<li key={category.id} className="text-blue-500">
                                <Link
                                    key={category.id}
                                    href='#'
                                    onClick={(event) => getCategoryResults(event, category)}
                                    className="rounded-md font-bold text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    {category.title}
                                </Link>
                            </li>))}

                        </ul>


                    </div>
                    <div className="flex">
                        <ul className="flex space-x-4">
                            {/*{auth.user ? (<li>*/}
                            {true ? (<li>
                                <Link
                                    href={route('admin.dashboard')}
                                    className="rounded-md text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    <span className="text-bold">Dashboard</span>
                                </Link>
                            </li>) : (<>
                                <li>
                                    <Link
                                        href={route('login')}
                                        className="rounded-md text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Log in
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>)}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

        {children}

        {/*Footer*/}
        <footer className="bg-gray-800 py-4">
            <div className="container mx-auto px-4">
                <div className="text-center text-white">
                    <p>Copyright &copy; My Blogging Website 2024</p>
                </div>
            </div>
        </footer>
    </>);
}

GuestLayout.propTypes = {
    children: PropTypes.node.isRequired, auth: PropTypes.shape({
        user: PropTypes.object,
    }), navLinks: PropTypes.array
};
