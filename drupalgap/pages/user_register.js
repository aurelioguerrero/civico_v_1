/**
 * Handles the register page show event.
 *
 */
$('#drupalgap_page_user_register').live('pageshow',function(){
  try {
	    if (drupalgap_user.uid != 0) {
          alert("Ya ingresaste con tu usuario!");
          $.mobile.changePage("dashboard.html", "slideup");
        }
  }
  catch (error) {
	  console.log("drupalgap_page_user_register - " + error);
  }
});

/**
 * Handles the submission of the user registration form.
 *
 */
$('#drupalgap_user_register_submit').live('click',function() {
	
	try {
	  
	  // Grab name and validate it.
	  var name = $('#drupalgap_user_register_name').val();
	  if (!name) { alert('Por favor ingrese su nombre de usuario.'); return false; }
	  
	  var cuenta = $('#drupalgap_user_register_cuenta_siec').val();
	  if (!cuenta) { alert('Por favor ingrese su cuenta CHEC.'); return false; }
	  if (cuenta.toString().length != 9){ alert('El número de cuenta CHEC no es válido!'); return false;}
	  if (digitos_chequeo((cuenta.toString()).substring(0,6)) != (cuenta.toString()).substring(6,9)){ alert('El número de cuenta CHEC no es válido!'); return false;}	  
	  
	  // Grab mail and validate it.
	  var mail = $('#drupalgap_user_register_mail').val();
	  if (!mail) { alert('Por favor ingrese su dirección de correo electrónico.'); return false; }
	  if (!validarEmail(mail)) { alert('Por favor ingrese una dirección de correo electrónico válida.'); return false; }
	  
	  // Grab passwords, compare and validate. 
	  var pass = $('#drupalgap_user_register_pass').val();
	  if (!pass) { alert('Por favor ingrese su contraseña.'); return false; }
	  var pass2 = $('#drupalgap_user_register_confirm_pass').val();
	  if (!pass2) { alert('Por favor confirme su contraseña.'); return false; }
	  if (pass != pass2) { alert("Las contraseñas no coinciden."); return false; }
	  
	  // Build service call options.
	  //user_registration = drupalgap_services_user_register(name,mail,pass);
	  options = {
		"name":name,
		"mail":mail,
		"cuenta":cuenta,
		"pass":pass,
		
		"error":function(jqXHR, textStatus, errorThrown) {
			if (errorThrown) {
				alert(errorThrown);
			}
			else {
				alert(textStatus);
			}
	  	},
	  	
		"success":function(data){
	  	  
	  	  if (data._user_resource_create.uid) {
	  		  
	  		  // User registration was successful...
	  		  
			  // Show message depending on site's user registration settings.
			  site_name = drupalgap_site_settings.variable.site_name;
			  
			  // Who can create accounts?
			  // TODO - take into account the 'require e-mail verification when a
			  // visitor creates an account' checkbox on the drupal site
			  switch (drupalgap_site_settings.variable.user_register) {
				case 1: // Visitors
				case "1":
					alert("Registro completo! Por favor consulte su correo electrónico para finalizar la inscripción.");
					break;
				case 2: // Visitors, but administrator approval is required
				case "2":
					alert("Registro completo! Ahora el administrador del sitio debe aprovar su registro.");
					break;
				default:
					alert("Registro completo!"); // TODO - this should be more informative, instruct user what's next.
					break;
			  }
			  
			  $.mobile.changePage("dashboard.html", "slideup");
			  
	  	  }
		  
	  	  else {
			// User registration was not successful...
			  
			// Clear any existing messages.
			$('#drupalgap_page_user_register_messages').html("");
			
			// Show error messages.
			$.each(user_registration.form_errors,function(field,message){
				$('#drupalgap_page_user_register_messages').append("<li>" + message + "</li>"); 
			});
			$('#drupalgap_page_user_register_messages').show();
			
		  }
	  	  
	  	},
	  };
	  
	  // Make the service call.
	  //drupalgap_services_user_register.resource_call(options);
	  //drupalgap_services_drupalgap_user_register.resource_call(options);
	  alert('Usuario Registrado!');
	}
	catch (error) {
	  console.log("drupalgap_user_register_submit - " + error);
	  alert("drupalgap_user_register_submit - " + error);
	}
	
  return false; // stop the click from executing any further
  
});