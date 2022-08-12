module.exports = {
  equalityCheck_LogInID_to_msgUserID: (message_author_id, userId) => {
    // userId is the current logged in user on the page
    return message_author_id === userId ? " current-user": ""
  }
}