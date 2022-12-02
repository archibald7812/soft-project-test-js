export const selectCommentByPostId = (state, postId) => {
	return state.comments.comments.filter(comment => comment.postId === postId)
};