export function titleCase(string) {
    const newString = string
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    return newString;
};

export function lowerCase(string) {
    return string.toLowerCase();
};

export function trim(string) {
    return string.trim();
};

export function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export function convertDate(longDate) {
    const year = longDate.getFullYear();
    const month = longDate.getMonth() + 1;
    const day = longDate.getDate();
    return `${month}/${day}/${year}`;
};