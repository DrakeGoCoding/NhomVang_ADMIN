import Image from "./api/image.api";

export const htmlDecode = input => {
    if (!input) return "";
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
};

export const beforeUploadImage = (file, callback, statusCallback) => {
    statusCallback(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
        try {
            const base64Image = reader.result;
            const { url } = await Image.upload(base64Image);
            callback(url);
            statusCallback(false);
        } catch (error) {
            callback("");
        }
    };
    return false;
};
