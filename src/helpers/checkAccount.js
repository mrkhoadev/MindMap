export default function handleCheckAccount(userEmail, email, isAccessible) {
    if (userEmail !== email && isAccessible)
    {
        return false;
    }
    return true
}