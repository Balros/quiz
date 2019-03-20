const validate = (value, rules) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case "minLength":
        isValid = isValid && minLengthValidator(value, rules[rule]);
        break;
      case "isRequired":
        isValid = isValid && requiredValidator(value);
        break;
      case "elementsAreRequired":
        isValid = isValid && elementsAreRequired(value);
        break;
      default:
        isValid = true;
    }
  }
  return isValid;
};

const minLengthValidator = (value, minLength) => {
  return value.length >= minLength;
};
const requiredValidator = value => {
  return value.trim() !== "";
};
const elementsAreRequired = value => {
  let isValid = true;
  value.forEach(element => {
    isValid = isValid && requiredValidator(element);
  });
  return isValid;
};

export default validate;
