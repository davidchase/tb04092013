#global scope variable used below
isValid = ''

#triggers
#Generate form trigger
#Submit form with validator trigger
$('.module').on 'click', '.request', (e) ->
  generateForm(e)
  iePlaceholder()
    
$('.module').on 'click', '.grabData', (e) ->
  e.preventDefault();
  validateForm(e);

#Generate the form
#Append the generated for to parent div
generateForm = (e) ->

  fields = ''
  action = '//go.tollbrothers.com/GenericWebLead/processlead'
  formData = { "First Name*","Last Name*","E-mail*","Phone"} # data object add or subtract items to populate form
 
  for data of formData
      clean = data.toLowerCase().replace(/[*\-\s+]/g,'')
      required = data.indexOf('*')
      inputClass = if required isnt -1 then 'required' else 'optional'
                
      if data is "Comments"
        fields += '<textarea name="' + clean + '" class="' + inputClass + '" placeholder="' + data + '"></textarea>'
      else
        fields += '<input type="text" class="layout ' + inputClass + '" name="' + clean + '" placeholder="' + data + '"/>'
              
  form = '<div class="formWrap"><form method="post">'+fields+'<button class="grabData">Request More Info</button></form></div>'
  $('.formWrap').remove();         
  $(e.target).parent().append form
       
#Input values from placeholder data for IE9 & lower      
iePlaceholder = () ->
    if !Modernizr.input.placeholder
            $('input[type="text"]').each ->
              pl = $(@).attr('placeholder')
              updated = $(@).val(pl)
              $(@).focus ->
                if pl is $(@).val()
                  $(@).val('')
              $(@).blur ->
                if $(@).val() is ''
                  $(@).val(pl)

#Validate the email with regex
validateEmail = (e) ->
              
  theEmail = $(e.target).prevAll('input[name="email"]')
  emailData = theEmail.val()
  filter = /^([\w\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/ #regex
  if filter.test(emailData)
     theEmail.removeClass('error')
     console.log "Email is good"
     isValid = true 
     return true
  else
     console.log "Email Not valid"
     theEmail.addClass('error')
     isValid = false
     return false
              
#Validate the form
#Test both against original value in IE9 & lower and empty fields
validateForm = (e) ->
              
    isValid = true
    $(e.target).parent().children().each ->
             if $(@).hasClass('required') and $(@).val().length is 0 or $(@).hasClass('required') and $(@).attr('placeholder') is $(@).val()
                $(@).addClass('error')
                isValid = false
                return
             else
                $(@).removeClass('error')
                return
            
        console.log 'Results: ' + isValid 
        
        if isValid
            if validateEmail(e)
             console.log "Good to go!"
             return true
        else 
            if validateEmail(e)
             console.log "Something is wrong"
             return false
              
 

       
              
 
            
