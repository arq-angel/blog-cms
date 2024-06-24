import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function Dashboard({auth, categories, statuses}) {

    const statusesObject = statuses.reduce((acc, status, index) => {
        acc[index] = status;
        return acc;
    }, {});

    return (<AuthenticatedLayout>
            {/* Page Content */}
            <div className="flex-1 bg-gray-100 p-6 min-h-screen">
                <div className="flex flex-col px-24 items-start">
                    <div className="mx-auto">
                        <h1 className="text-3xl font-semibold">Add a new post</h1>
                        <hr className="my-4 w-full border-gray-300"/>
                    </div>
                    <form action="" className="mt-4 min-w-full">
                        <div className="flex flex-row items-start mb-3">
                            <label htmlFor="title" className="min-w-24 text-gray-700">Post Title:</label>
                            <input type="text" id="text" name="text"
                                   className="flex-1 ms-2 py-1 form-input rounded-md text-gray-700"/>
                        </div>
                        <hr className="my-4 w-full border-gray-300"/>
                        <div className="flex flex-row items-start mb-3">
                            <label htmlFor="title" className="min-w-24 text-gray-700">Post Author:</label>
                            <input type="text" id="author" name="author"
                                   className="flex-1 ms-2 py-1 form-input rounded-md text-gray-700"/>
                        </div>
                        <hr className="my-4 w-full border-gray-300"/>
                        <div className="flex flex-row items-start mb-3">
                            <label htmlFor="title" className="min-w-24 text-gray-700">Category:</label>
                            <select className="ms-2 py-1 form-select rounded-md text-gray-700">
                                <option value="">Select Category</option>
                                {categories.data.map((category) => (
                                        <option key={category.id}  value={category.id}>{category.title}</option>
                                ))}
                            </select>
                        </div>
                        <hr className="my-4 w-full border-gray-300"/>
                        <div className="flex flex-row items-start mb-3">
                            <label htmlFor="title" className="min-w-24 text-gray-700">Status:</label>
                            <select className="ms-2 py-1 form-select rounded-md text-gray-700">
                                <option value="">Select Status</option>
                                {Object.keys(statusesObject).map((key) => (
                                    <option key={key} value={key}>{statusesObject[key]}</option>
                                ))}
                            </select>
                        </div>
                        <hr className="my-4 w-full border-gray-300"/>
                        <div className="flex flex-row items-start mb-3">
                            <label htmlFor="title" className="min-w-24 text-gray-700">Post Tags:</label>
                            <input type="text" id="author" name="author"
                                   className="flex-1 ms-2 py-1 form-input rounded-md text-gray-700"/>
                        </div>
                        <hr className="my-4 w-full border-gray-300"/>
                        <div className="flex flex-row items-start mb-3">
                            <label htmlFor="title" className="min-w-24 text-gray-700">Post Image:</label>
                            <input type="text" id="author" name="author"
                                   className="flex-1 ms-2 py-1 form-input rounded-md text-gray-700"/>
                        </div>
                        <hr className="my-4 w-full border-gray-300"/>
                        <div className="flex flex-row items-start mb-3">
                            <label htmlFor="title" className="min-w-24 text-gray-700">Post Content:</label>
                            <textarea id="author" name="author" rows="10"
                                      className="flex-1 ms-2 py-1 form-input rounded-md text-gray-700">
                            </textarea>
                        </div>

                    </form>
                </div>


            </div>
        </AuthenticatedLayout>
    );
}
