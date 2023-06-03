export const isOwner = (user, note) => {
    const userId = JSON.stringify(user._id);
    const noteAuthor = JSON.stringify(note.author);

    if (userId === noteAuthor) return true;
    return false;
}