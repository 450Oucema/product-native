export default function (string, length = 35) {
    if (string.length > 35) {
        string = `${string.substring(0, length)}...`
    }

    return string;
}
