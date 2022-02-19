const dataToQuery = obj => {
  const column = [];
  const value = [];
  const iteration = [];
  const put = [];
  Object.keys(obj).forEach((val, i) => {
    column.push(val);
    value.push(obj[val]);
    iteration.push(`$${i + 1}`);
    put.push(`${val} = $${i + 1}`);
  });

  return { column: column.join(','), iteration: iteration.join(','), value, put: put.join(',') };
};

module.exports = dataToQuery;
