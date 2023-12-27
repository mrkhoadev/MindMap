export const handleAlert = async (status, text) => {
    if (typeof document !== 'undefined') {
        const alertify = await import('alertifyjs');
        alertify[status](text);
    }
}