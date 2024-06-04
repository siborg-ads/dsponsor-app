const handleCopy = async (text, setCopied) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  } catch (error) {
    console.error(error);
  }
};

export default handleCopy;
