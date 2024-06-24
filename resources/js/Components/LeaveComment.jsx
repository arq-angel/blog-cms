import {format} from "date-fns";
import {useState} from "react";
import {usePage} from "@inertiajs/react";

export default function LeaveComment({post}) {
    const {csrfToken} = usePage().props;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "MMMM d, yyyy 'at' h:mm a");
    };

    const [formData, setFormData] = useState({
        post_id: post.data.id,
        author: '',
        email: '',
        content: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = {};

        // Name validation
        if (!formData.author) {
            formErrors.author = 'Name is required.';
        }

        // Email validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
            formErrors.email = 'Valid email is required.';
        }

        // Comment validation
        if (!formData.content) {
            formErrors.content = 'Comment is required.';
        }

        setErrors(formErrors);

        console.log(formData);

        if (Object.keys(formErrors).length === 0) {
            try {
                const response = await axios.post('/comment', formData, {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken
                    }
                });
                console.log('Form submitted successfully:', response.data);
                // Handle success response, e.g., clear form or display a success message
                setFormData({
                    post_id: post.data.id,
                    author: '',
                    email: '',
                    content: ''
                });
                setErrors({});
                window.location.reload();
            } catch (error) {
                console.error('Form submission error:', error.response.data);
                // Handle error response, e.g., display error message
                setErrors({ form: 'An error occurred while submitting the form. Please try again.' });
            }
        }
    };

    return (<div className="mb-8 p-4 bg-gray-100 rounded">
        <h4 className="text-xl font-bold mb-2">Leave a Comment:</h4>
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="_token" value={csrfToken}/>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-semibold" htmlFor="author">Name:</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    value={formData.author}
                    onChange={handleChange}
                />
                {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-semibold" htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="flex flex-col mb-4">
                <label className="mb-2 font-semibold" htmlFor="content">Comment:</label>
                <textarea
                    id="content"
                    name="content"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    rows="4"
                    value={formData.content}
                    onChange={handleChange}
                ></textarea>
                {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Submit
            </button>
        </form>
    </div>)
}
