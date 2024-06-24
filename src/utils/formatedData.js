export const bufferAdParams = (data) => {
  const buffedArray = [
    {
      key: "d99a7aefbfbd3125efbfbd36efbfbd64147eefbfbddb9eefbfbd62efbfbdefbfbd0639efbfbd1e1cefbfbd1f7c67efbfbdefbfbd1527",
      value: "imageURL"
    },
    {
      key: "6a0befbfbd4575efbfbdefbfbd41efbfbd4defbfbd546510efbfbd3e6eefbfbdefbfbd232eefbfbd32610fefbfbdefbfbd707d6cefbfbd",
      value: "linkURL"
    }
  ];

  if (!data || !data[0] || !data[0].adParameter) {
    console.error("Invalid input data");
    return;
  }
  const adParamsData = [];
  for (const element of data) {
    const validParam = element.adParameter;
    const normalizedParams = Buffer.from(validParam).toString("hex");
    const foundItem = buffedArray.find((item) => item.key === normalizedParams);

    adParamsData.push(foundItem?.value);
  }

  if (adParamsData.length > 1) {
    return adParamsData;
  } else {
    throw new Error("No matching key found");
  }
};
