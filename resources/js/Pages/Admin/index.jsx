import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Dashboard({auth}) {
    return (<AuthenticatedLayout>
            {/* Page Content */}
            <div className="flex-1 bg-gray-100 p-6">
                <h1 className="text-2xl font-semibold">Blank Page</h1>
                <p className="text-gray-700 mt-2">Subheading</p>
                <nav className="mt-4">
                    <ol className="list-reset flex">
                        <li><a href="index.html" className="text-blue-600 hover:underline">Dashboard</a></li>
                        <li className="mx-2">/</li>
                        <li className="text-gray-700">Blank Page</li>
                    </ol>
                </nav>
            </div>
        </AuthenticatedLayout>
    );
}
