const memory = {};

const generateId = () => (`XYZ`);

const find = jest.fn((id) => (
  Promise.resolve(memory[id])
));

const save = jest.fn((id = generateId(), data) => {
  memory[id] = data;
  return Promise.resolve({id, ...data});
});

const update = jest.fn((id = generateId(), data) => (
  find(id).then(currentData => save(id, { ...currentData, ...data }))
));

export { find, save, update };
