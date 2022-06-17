import axios from "axios";

export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const capitalizeWords = (string) => {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};

export const replaceUnderscoresWithSpaces = (str) => str.replace(/_/g, " ");

export const snakeToPascalCase = (input) => {
  return `${input}`
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w+)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, "g"), "")
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};
export const toSnakeCase = (str = "") => {
  const strArr = str.split(" ");
  const snakeArr = strArr.reduce((acc, val) => {
    return acc.concat(val.toLowerCase());
  }, []);
  return snakeArr.join("_");
};

export const splitPascalCase = (word) => {
  var wordRe = /($[a-z])|[A-Z][^A-Z]+/g;
  return word.match(wordRe).join(" ");
};

export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const formatErrorResponse = (errata) => {
  if (errata.error) {
    return [{ attribute: "login", messages: errata.error }];
  }

  if (errata.errors) {
    return errata.errors.map((error) => {
      var parts = error.detail.split(" - ");
      return { attribute: parts[0], message: parts[1] };
    });
  }
};

export const formatUnprocessibleResponse = (err, item) => {
  let message =
    "Something went wrong! Some of your changes could not be saved at this time.";
  if(err.response.status == 403) {
    message = err.response.data.errors[0].detail;
  }
  if (err.response.status == 422) {
    let serverErrors = formatErrorResponse(err.response.data);
    message =
      `Could not save ${item}. ` +
      serverErrors.map((error) => {
        var attributeName =
          error.attribute.charAt(0).toUpperCase() +
          error.attribute.slice(1).replaceAll("-", " ");
        return attributeName + " " + error.message;
      });
  }
  return message;
};

export const removeDuplicates = (data, key) => {
  return [...new Map(data.map((item) => [key(item), item])).values()];
};

export const getDate = (dateString, options) => {
  if (dateString) {
    let dateArray = dateString.split("-");
    let year = dateArray[0];
    let month = parseInt(dateArray[1], 10) - 1;
    let date = dateArray[2];
    let dueDate = new Date(year, month, date).toLocaleDateString(
      "en-US",
      options
    );
    return dueDate;
  }
};
export const wordCount = (str) => {
  var wordCount = str.match(/(\w+)/g).length;
  return wordCount;
};