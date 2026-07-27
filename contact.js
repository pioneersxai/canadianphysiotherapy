/* Contact form -> WhatsApp handoff (Canadian Physio Center) */
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var NUMBERS = {
    'New Cairo (5th Settlement)': '201113372169',
    'Sheikh Zayed': '201150904759',
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('cf-name').value.trim();
    var phone = document.getElementById('cf-phone').value.trim();
    var branch = document.getElementById('cf-branch').value;
    var message = document.getElementById('cf-message').value.trim();
    var note = document.getElementById('cf-note');

    if (!name || !phone || !message) {
      if (note) {
        note.textContent = 'Please fill in your name, phone, and message first.';
        note.classList.remove('sent');
      }
      return;
    }

    var waNumber = NUMBERS[branch] || NUMBERS['New Cairo (5th Settlement)'];
    var text =
      'Hi Canadian Physio Center, my name is ' + name +
      ' (phone: ' + phone + '). Preferred branch: ' + branch +
      '. ' + message;

    var url = 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(text);

    if (note) {
      note.textContent = 'Opening WhatsApp...';
      note.classList.add('sent');
    }

    window.open(url, '_blank');
  });
})();
