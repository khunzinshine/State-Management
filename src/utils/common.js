export const modifiedArrays = (data) => {
  return (
    data &&
    data.map((d) => {
      return Object.assign({ key: d.id, name: d.first_name, code: d.position });
    })
  );
};
