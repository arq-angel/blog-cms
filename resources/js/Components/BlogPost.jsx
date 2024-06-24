import {format} from 'date-fns';
import {Link} from "@inertiajs/react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function BlogPost({post, getPost, isSinglePost = false}) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "MMMM d, yyyy 'at' h:mm a");
    };

    return (<div className="mb-8">
        <h2 className="text-2xl font-bold">
            <Link href='#'
                  onClick={(event) => getPost(event, post)}
                  className="text-blue-500">
                {post.title}
            </Link>
        </h2>
        <p className="text-gray-600">by
            <Link href='#' className="ms-1 text-blue-500">
                {post.author}
            </Link>
        </p>
        <p className="text-gray-600">
            <FontAwesomeIcon icon={faClock} className="me-1"/>Posted on {formatDate(post.created_at)}
        </p>
        <hr className="mt-2"/>
        <div className="mt-3 w-full max-h-64 overflow-hidden">
            <img
                className="object-cover w-full h-full"
                src={post.image}
                alt={post.title}
            />
        </div>
        <div className="mt-2 mb-3">
            <p>{post.content}</p>
        </div>

        {!isSinglePost ? <Link
            href={route('post.show', post.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Read More <FontAwesomeIcon icon={faArrowRight} className="ms-2"/>
        </Link>:''}
        <hr className="mt-4"/>
    </div>)
}

BlogPost.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        author_id: PropTypes.number,
        created_at: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
    }).isRequired,
    getPost: PropTypes.func,
    isSinglePost: PropTypes.bool,
};
