export function titleCase(string) {
  const wordArray = string.split(" ").map((word) => word.toLowerCase());
  let newArray = [];
  for (let i = 0; i < wordArray.length; i++) {
    if (
      wordArray[i] !== "a" &&
      wordArray[i] !== "an" &&
      wordArray[i] !== "and" &&
      wordArray[i] !== "the" &&
      wordArray[i] !== "but" &&
      wordArray[i] !== "at" &&
      wordArray[i] !== "by" &&
      wordArray[i] !== "in" &&
      wordArray[i] !== "on" &&
      wordArray[i] !== "for" &&
      wordArray[i] !== "nor" &&
      wordArray[i] !== "or" &&
      wordArray[i] !== "to" &&
      wordArray[i] !== "yet" &&
      wordArray[i] !== "of"
    ) {
      const newWord =
        wordArray[i].charAt(0).toUpperCase() +
        wordArray[i].slice(1).toLowerCase();
      newArray.push(newWord);
    } else if (i === 0 || i === wordArray.length - 1) {
      const newWord =
        wordArray[i].charAt(0).toUpperCase() +
        wordArray[i].slice(1).toLowerCase();
      newArray.push(newWord);
    } else {
      newArray.push(wordArray[i]);
    }
  }
  const title = newArray.join(" ");
  return title;
}

export function lowerCase(string) {
  return string.toLowerCase();
}

export function trim(string) {
  return string.trim();
}

export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function convertDate(longDate) {
  const year = longDate.getFullYear();
  /*if (longDate.getMonth() + 1 < 10) {
        const month = `0${longDate.getMonth() + 1}`;
    }*/
  const month = longDate.getMonth() + 1;
  const day = longDate.getDate();
  return `${month}/${day}/${year}`;
}

export function dateForInput(longDate) {
  const year = longDate.getFullYear();
  let month;
  if (longDate.getMonth() + 1 < 10) {
    month = `0${longDate.getMonth() + 1}`;
  } else {
    month = longDate.getMonth() + 1;
  }
  let day;
  if (longDate.getDate() < 10) {
    day = `0${longDate.getDate()}`;
  } else {
    day = longDate.getDate();
  }
  const dateString = `${year}-${month}-${day}`;
  return dateString;
}

export function convertCalendarDate(date) {
  if (date === "") {
    return date;
  } else {
    const year = date.slice(0, 4);
    const firstMonthDigit = date.slice(5, 6);
    let month;
    if (firstMonthDigit === "0") {
      month = date.slice(6, 7);
    } else {
      month = date.slice(5, 7);
    }
    const firstDayDigit = date.slice(8, 9);
    let day;
    if (firstDayDigit === "0") {
      day = date.slice(9, 10);
    } else {
      day = date.slice(8, 10);
    }
    return `${month}/${day}/${year}`;
  }
}

export function singleWhitespace(string) {
  return string.replace(/\s+/g, " ").trim();
}

export function sentenceCase(string) {
  const wordArray = string.split(" ").map((word) => word.toLowerCase());
  const newArray = [];

  for (let i = 0; i < wordArray.length; i++) {
    let word = wordArray[i];

    if (i === 0) {
      word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    if (i > 0 && wordArray[i - 1].endsWith(".")) {
      word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    if (word === "i") {
      word = word.charAt(0).toUpperCase();
    }
    newArray.push(word);
  }
  const newSentence = newArray.join(" ");
  return newSentence;
}
