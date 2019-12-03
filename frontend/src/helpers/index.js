export const emailValidator = email => {
  let regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return email.match(regExp);
}

export const passwordValidator = password => {
  if(password && password.length >= 6) return true;
  else return false;
}

export const nameValidator = name => {
  if(name && name.length >= 2) return true;
  else return false;
}