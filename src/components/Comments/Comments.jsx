import { Comment } from "../Comment/Comment"

export const Comments = ({ active, comments, depth }) => {

	depth++;
	if (!active) return null


	return (
		<div>
			{comments.map(comment => <Comment key={comment.id} comment={comment} commentId={comment.postId} depth={depth} />)}
		</div>
	)
}