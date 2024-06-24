import {format} from "date-fns";
import Pagination from "@/Components/Pagination.jsx";

export default function Comments({comments}) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, "MMMM d, yyyy 'at' h:mm a");
    };

    return (<div className="mb-8 p-4 bg-gray-100 rounded">
        <h4 className="text-xl font-bold mb-4">Comments</h4>
        {comments.data.map((comment) => (
            <div key={comment.id} >
                <div className="flex flex-row items-start justify-between">
                    <div className="flex flex-col items-start">
                        <div>{comment.content}</div>
                        <div className="text-sm">
                            By<span className="ms-1">{comment.author}</span>
                        </div>
                        <div className="text-sm">
                            On<span className="ms-1">{formatDate(comment.created_at)}</span>
                        </div>
                    </div>
                </div>
                <hr className="mb-3 border-gray-300"/>
            </div>
        ))}
        {/* Pagination */}
        <Pagination links={comments.meta.links}/>
    </div>)
}
