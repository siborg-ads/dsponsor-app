export const bufferAdParams = (data) => {
  const buffedArray = [
    { key: "d99a7aefbfbd3125efbfbd36efbfbd64147eefbfbddb9eefbfbd62efbfbdefbfbd0639efbfbd1e1cefbfbd1f7c67efbfbdefbfbd1527", value: "logoURL" },
    { key: "efbfbdefbfbd1317efbfbd1aefbfbdefbfbd3c7fefbfbd22efbfbd5274efbfbdefbfbdefbfbd59efbfbd0defbfbd54efbfbd55efbfbdefbfbdefbfbdefbfbdefbfbdefbfbdefbfbd", value: "linkURL" },
  ];

  if (!data || !data[0] || !data[0].adParameter) {
    console.error("Invalid input data");
    return;
  }

  const adParamsData = [];
  for (let i = 0; i < data.length; i++) {
    const validParam = data[i].adParameter;
    const normalizedParams = Buffer.from(validParam).toString("hex");

    const foundItem = buffedArray.find((item) => item.key === normalizedParams);

    adParamsData.push(foundItem.value);
  }
  if (adParamsData.length > 1) {
    return adParamsData;
  } else {
    console.log("No matching key found");
    return undefined;
  }
};
