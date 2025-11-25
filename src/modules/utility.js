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

export function dateForInput(longDate) {
    const year = longDate.getFullYear();
    const month = longDate.getMonth() + 1;
    const day = longDate.getDate();
    let dateString;
    if (month < 10) {
        dateString = `${year}-0${month}-${day}`;
    } else {
        dateString = `${year}-${month}-${day}`;
    }
    return dateString;
};

export function convertCalendarDate(date) {
    if (date === '') {
        return date;
    } else {
        const year = date.slice(0,4);
        let month;
        const firstDigit = date.slice(5, 6);
        if (firstDigit === '0') {
            month = date.slice(6, 7);
        } else {
            month = date.slice(5, 7);
        }
        const day = date.slice(8, 10);
        return `${month}/${day}/${year}`;
    }
};