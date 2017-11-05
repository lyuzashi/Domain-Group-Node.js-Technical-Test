import { update } from './db';

export default (req, res) => {
  update(undefined, req.body).then(({ id }) => {
    res.cookie('user', id);
    res.end();
  });
};
