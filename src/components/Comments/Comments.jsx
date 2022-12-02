import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchComments } from "../../features/comments/actions";
import { selectCommentByPostId } from "../../features/comments/selectors";
import { Comment } from "../Comment/Comment"

export const Comments = ({ active, depth, postId }) => {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchComments(postId))
	}, [])

	const comments = useSelector((state) => selectCommentByPostId(state, postId))

	depth++;

	if (!active) return null

	return (
		<div>
			{comments ? comments.map(comment => <Comment key={comment.id} comment={comment} commentId={comment.postId} depth={depth} />) : null}
		</div>
	)
}