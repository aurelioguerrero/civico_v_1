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

function digitos_chequeo(matricula)
{
	return ((modulo_10(matricula)).toString())+((modulo_11(matricula)).toString())+((modulo_10_3(matricula)).toString());
}

function modulo_10(matricula)
{
	var mi_digito;
	var factor_peso = 2;
	var mi_suma = 0;
	var mi_numero = matricula.toString();
	var mi_longitud = mi_numero.length;
	
	for(var cnt = 1; cnt <= mi_longitud; cnt++)
	{
		mi_digito = parseInt(mi_numero.substring(mi_longitud - cnt,mi_longitud - cnt+1));
		if(cnt%2 == 0)
		{
			mi_suma += mi_digito;
		}
		else
		{
		 	var mi_numero_parcial = (factor_peso*mi_digito).toString();
			var mi_longitud_parcial = mi_numero_parcial.length;
			for(var i = 1; i <= mi_longitud_parcial; i++)
			{
				mi_suma += parseInt(mi_numero_parcial.substring(i-1,i));
			}
		}
	}
	mi_numero = mi_suma.toString();
	var mi_resultado = mi_numero.substring(mi_numero.length-1,mi_numero.length);
	
	if(mi_resultado!='0')
	{
		return mi_resultado = 10 - parseInt(mi_resultado);
	}
	else
	{	
		return 0;
	}
}

function modulo_11(matricula)
{
	var base = 11;
	var minimo = 2;
	var maximo = 7;
	
	var mi_suma = 0;
	var mi_factor = minimo;
	var mi_numero = matricula.toString();
	var mi_longitud = mi_numero.length;
	
	for(var i = 1; i<=mi_longitud; i++)
	{
		mi_suma += mi_factor * parseInt(mi_numero.substring(mi_longitud - i,mi_longitud - i+1));
		if(mi_factor==maximo)
		{
			mi_factor = minimo;
		}
		else
		{
			mi_factor++;
		}
	}
	
	var mi_resultado = base - (mi_suma%base);
	if(mi_resultado > 9)
	{
		return 0;
	}
	else
	{
		return mi_resultado;	
	}
}

function modulo_10_3(matricula)
{
	var factor_peso = 3;
	var mi_digito;
	
	var mi_suma = 0;
	var mi_numero = matricula.toString();
	var mi_longitud = mi_numero.length;
	
	for(var cnt = 1; cnt<=mi_longitud; cnt++)
	{
		mi_digito = parseInt(mi_numero.substring(mi_longitud - cnt,mi_longitud - cnt+1));		
		if(cnt%2 == 0)
		{
			mi_suma += mi_digito;
		}
		else
		{
			mi_suma += (factor_peso * mi_digito);
		}
	}
	if(mi_suma%10 != 0)
	{
		return 10 - (mi_suma%10);
	}
	else
	{
		return (mi_suma%10);
	}
}