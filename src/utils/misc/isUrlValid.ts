function isUrlValid(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export default isUrlValid;
