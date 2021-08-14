const randomizeString = (length) => {
  let result = '';
  const ALPHANUM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const alphanumLength = ALPHANUM.length;
  for (let i = 0; i < length; i++) {
    result += ALPHANUM.charAt(Math.floor(Math.random() * alphanumLength));
  }
  return result;
};
export default randomizeString;
