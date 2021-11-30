/**
 * Extract public id from image url
 * @param {String} url
 */
export const extractPublicId = url => {
    const phase1 = url.split("/nhomvang/");
    const phase2 = phase1[1].split(".");
    return `nhomvang/${phase2[0]}`;
};
