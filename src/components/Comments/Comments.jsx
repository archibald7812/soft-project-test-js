import { Comment } from "../Comment/Comment"

export const Comments = ({ active, comments }) => {

	if (!active) return null


	return (
		<div>
			{comments.map(comment => <Comment key={comment.id} comment={comment} commentId={comment.postId} />)}
		</div>
	)
}