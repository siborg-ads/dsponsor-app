export const bufferAdParams = (data) => {

  const buffedArray = [
    { key: "d99a7aefbfbd3125efbfbd36efbfbd64147eefbfbddb9eefbfbd62efbfbdefbfbd0639efbfbd1e1cefbfbd1f7c67efbfbdefbfbd1527", value: "logoURL" },
    { key: "efbfbdefbfbd1317efbfbd1aefbfbdefbfbd3c7fefbfbd22efbfbd5274efbfbdefbfbdefbfbd59efbfbd0defbfbd54efbfbd55efbfbdefbfbdefbfbdefbfbdefbfbdefbfbdefbfbd", value: "linkURL" },
  ];

  if (!data || !data[0] || !data[0].adParameter) {
    console.error("Invalid input data");
    return;
  }
  console.log(data[0]);
 const adParamsData = [];
  for(const element in data[0]){

      const validParam = element.adParameter;
      console.log(validParam);
      const normalizedParams = Buffer.from(validParam).toString("hex");
      const foundItem = buffedArray.find((item) => item.key === normalizedParams);
        adParamsData.push(foundItem.value);

  }
  if (adParamsData > 1) {
    return adParamsData;
  } else {
    console.log("No matching key found");
    return undefined;
  }
};
