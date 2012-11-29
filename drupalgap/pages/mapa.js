// JavaScript Document
var civicoUrlMap1 = 'https://maps.google.com/maps/ms?msa=0&amp;msid=206997018444257962319.0004cf680c791de2df2c7&amp;hl=es&amp;ie=UTF8&amp;t=m&amp;ll=';
var civicoUrlMap2 = '&amp;spn=0,0&amp;output=embed';

$('#civico_mapa').live('pageshow',function(){
	try {
		$.mobile.showPageLoadingMsg("a", "Cargando coordenadas...", false);
		navigator.geolocation.getCurrentPosition(cargarMapa, errorCoordenadas);
	}
	catch (error) {
		console.log("drupalgap_page_node_edit");
		console.log(error);
	}
});

function cargarMapa(position)
{
	try {
		var html = '<iframe id="civicoFrameMapa" width="100%" height="90%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="'+civicoUrlMap1 + position.coords.latitude + ',' + position.coords.longitude + civicoUrlMap2+'">Si aparece este texto, tu navegador no soporta iframes</iframe>';
		//var Url = civicoUrlMap1 + position.coords.latitude + ',' + position.coords.longitude + civicoUrlMap2;
		//$('#civicoFrameMapa').attr('src',Url);
		var frame = document.getElementById('civicoFrameMapa');
		frame.html = html;
		$.mobile.hidePageLoadingMsg();
		//alert(Url);
	}
	catch (error) {		
		alert(error);
	}
}

function errorCoordenadas(error)
{
	alert('Error al cargar las coordenadas, codigo: '    + error.code    + '\n' +
                'mensaje: ' + error.message + '\n');
}