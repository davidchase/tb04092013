(function() {
  var generateForm, iePlaceholder, isValid, validateEmail, validateForm;

  isValid = '';

  $('.module').on('click', '.request', function(e) {
    generateForm(e);
    return iePlaceholder();
  });

  $('.module').on('click', '.grabData', function(e) {
    e.preventDefault();
    return validateForm(e);
  });

  generateForm = function(e) {
    var action, clean, data, fields, form, formData, inputClass, required;

    fields = '';
    action = '//go.tollbrothers.com/GenericWebLead/processlead';
    formData = {
      "First Name*": "First Name*",
      "Last Name*": "Last Name*",
      "E-mail*": "E-mail*",
      "Phone": "Phone"
    };
    for (data in formData) {
      clean = data.toLowerCase().replace(/[*\-\s+]/g, '');
      required = data.indexOf('*');
      inputClass = required !== -1 ? 'required' : 'optional';
      if (data === "Comments") {
        fields += '<textarea name="' + clean + '" class="' + inputClass + '" placeholder="' + data + '"></textarea>';
      } else {
        fields += '<input type="text" class="layout ' + inputClass + '" name="' + clean + '" placeholder="' + data + '"/>';
      }
    }
    form = '<div class="formWrap"><form method="post">' + fields + '<button class="grabData">Request More Info</button></form></div>';
    $('.formWrap').remove();
    return $(e.target).parent().append(form);
  };

  iePlaceholder = function() {
    if (!Modernizr.input.placeholder) {
      return $('input[type="text"]').each(function() {
        var pl, updated;

        pl = $(this).attr('placeholder');
        updated = $(this).val(pl);
        $(this).focus(function() {
          if (pl === $(this).val()) {
            return $(this).val('');
          }
        });
        return $(this).blur(function() {
          if ($(this).val() === '') {
            return $(this).val(pl);
          }
        });
      });
    }
  };

  validateEmail = function(e) {
    var emailData, filter, theEmail;

    theEmail = $(e.target).prevAll('input[name="email"]');
    emailData = theEmail.val();
    filter = /^([\w\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(emailData)) {
      theEmail.removeClass('error');
      console.log("Email is good");
      isValid = true;
      return true;
    } else {
      console.log("Email Not valid");
      theEmail.addClass('error');
      isValid = false;
      return false;
    }
  };

  validateForm = function(e) {
    isValid = true;
    $(e.target).parent().children().each(function() {
      if ($(this).hasClass('required') && $(this).val().length === 0 || $(this).hasClass('required') && $(this).attr('placeholder') === $(this).val()) {
        $(this).addClass('error');
        isValid = false;
      } else {
        $(this).removeClass('error');
      }
    });
    console.log('Results: ' + isValid);
    if (isValid) {
      if (validateEmail(e)) {
        console.log("Good to go!");
        return true;
      }
    } else {
      if (validateEmail(e)) {
        console.log("Something is wrong");
        return false;
      }
    }
  };

}).call(this);
