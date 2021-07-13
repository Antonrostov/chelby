class Controller {
  static homeIndex = (req, res) => {
    res.render('index', { title: 'Home', login: true, username: '' });
  };
}
export default Controller;
