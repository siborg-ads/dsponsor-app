function isUrlValid(string: string): boolean {
  try {
    const { protocol } = new URL(string);

    return protocol === "http:" || protocol === "https:";
  } catch (err) {
    return false;
  }
}

export default isUrlValid;
