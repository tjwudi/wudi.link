var wd = require('../base'),
  serialize = require('form-serialize'),
  fetch = wd.net.fetch,
  urlShowFactory = require('./url-show');

var urlShow = urlShowFactory.attach(document.querySelector('#url-show'));

var urlPromptFactory = new wd.Module({
  didAttach() {
    this.submits = document.querySelectorAll('[data-submit="url"]');
    this.form = this.el.querySelector('.form');
    this.bindEvents();
  },

  bindEvents() {
    [].slice.call(this.submits).forEach((submit) => {
      submit.addEventListener('click', (e) => {
        e.preventDefault();
        fetch('/api/shorten', {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: serialize(this.form)
        }).
        then((response) => response.json()).
        then((result) => {
          if (result && result.hash) {
            urlShow.trigger('item', result);
            this.showNext();
          }
        }).
        catch((ex) => console.error(ex));
      });
    });
  },

  showNext() {
    this.el.classList.remove('step-visible');
    if (this.el.nextElementSibling) {
      this.el.nextElementSibling.classList.add('step-visible');
    }
  }
});

module.exports = urlPromptFactory;