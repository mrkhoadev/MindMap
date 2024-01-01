export const emailRegex = (str) => {
    return /^(([^<>()[\]\.,;:\s@"]+(.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/.trim().test(
        str
    );
};
export const htmlScript = (html) => {
    return html?.replace(/(<([^>]+)>)/gi, "").trim();
};
export function isUUID(uuidStr) {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[4][0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(uuidStr);
}
export function isNanoID(nanoIDStr) {
    const nanoIDRegex = /^[0-9a-zA-Z_-]{21}$/;
    return nanoIDRegex.test(nanoIDStr);
}