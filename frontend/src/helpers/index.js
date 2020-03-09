export const validator = (type, value) => {
  switch (type) {
    case "email":
      let regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return { isValidEmail : value.match(regExp) };
    case "password":
      return { isValidPassword : value && value.length >= 6 }
    case "name":
      return { isValidName : value && value.length >= 2 }
    default:
      throw new Error("something error!");
  };
}