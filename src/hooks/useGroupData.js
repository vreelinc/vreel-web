export const useGroupData = (data, size) => {
  const Data = [];
  data?.length &&
    data.forEach((element) => {
      if (!Data.length || Data[Data.length - 1].length === size) {
        Data.push([]);
      }
      Data[Data.length - 1].push(element);
    });
  return Data;
};
