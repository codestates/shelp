module.exports = {
  items: {
    get: (req, res) => {
      res.send('items get 입니다');
    },
    post: (req, res) => {
      res.send('items post 입니다');
    },
    put: (req, res) => {
      res.send('items 입니다');
    },
    getById: (req, res) => {
      const id = req.params.id;
      res.send(`items get ${id} 입니다`);
    },
    delete: (req, res) => {
      const id = req.params.id
      res.send(`items delete ${id} 입니다`);
    },
  },
  profile: {
    get: (req, res) => {
        res.send('profile 입니다');
    },
    put: (req, res) => {
      res.send('profile 입니다');
    },
    delete: (req, res) => {
      res.send('profile 입니다');
    },
  },
  recipe: {
    get: (req, res) => {
        res.send('recipe 입니다');
    },
    getById: (req, res) => {
      res.send('recipe 입니다');
    },
  },
  user: {
    signout: (req, res) => {
        res.send('user 입니다');
    },
    signup: (req, res) => {
      res.send('user 입니다');
    },
    signin: (req, res) => {
      res.send('user 입니다');
    },
    check: (req, res) => {
      res.send('user 입니다');
    },
  },
};
