// JavaScript Document
function verReportes()
{
	var i = 0;
	xhttp=new XMLHttpRequest();
	xhttp.open("GET","listaReportes.xml",false);
	xhttp.send();
	xmlDoc=xhttp.responseXML;	
	x = xmlDoc.getElementsByTagName("reporte");
	
	for(i=0;i<x.length;i++)
	{	
		
		$("#listarep").append('<li><a href="#"><img src="'+x[i].getElementsByTagName("imagen")[0].childNodes[0].nodeValue+'"><p>'+x[i].getElementsByTagName("titulo")[0].childNodes[0].nodeValue+'</p><p>'+x[i].getElementsByTagName("intro")[0].childNodes[0].nodeValue+'</p><span class="ui-li-count">'+x[i].getElementsByTagName("puntos")[0].childNodes[0].nodeValue+'</span></a></li>');//.listview("refresh");
	}
	$.mobile.changePage( "#reportes", { transition: "slideup"} );
}