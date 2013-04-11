Spawn Forms v1.1
==========

Spawning Form Module with validator.

Create a new instance of a form everytime you click the button.

### CSS class selectors

`.module` static parent for the button/triggers.

`.request` for spawning the form.

`.grabData` for form submission and validation.


### Update the `formData` object.

The following object `formData = { "First Name*","Last Name*","E-mail*","Phone"}` 

can be updated to add more fields and/or make the fields required by adding an `*`.

If the `formData` object contains the keyword `Comments` it will show up on the form as a `textarea` field.
