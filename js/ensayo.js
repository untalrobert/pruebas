function toggleFixedMenu(a){
	if(jQuery('#fixeddiv').css('display')=='none'){
		//Effect.BlindDown('menu_fixed_contenido', { duration: 0.2 });
		jQuery('#fixeddiv').show();
// 		$('menu_fixed_contenido').style.display='';
		//a.innerHTML = 'Esconder';
		jQuery('#tarea_ensayo').remove();
	}
	else{
// 		$('menu_fixed_contenido').style.display='none';
		jQuery('#fixeddiv').hide();
		//Effect.BlindUp('menu_fixed_contenido', { duration: 0.2 });
		//a.innerHTML = 'Mostrar';
		
		var tarea = '<div class="tarea" id="tarea_ensayo" onclick="toggleFixedMenu();">Tiempo simulacro <span id="tarea_ensayo_tiempo">02:30:50</span></div>';
		jQuery('#barra_tareas').append(tarea);
		
		jQuery("#tarea_ensayo").effect('pulsate');
		//new Effect.Pulsate('tarea_ensayo', {from:0.0});

	}
}

function toggleTablaPeriodica(hide){
	if(jQuery('#tabla_periodica').css('display')=='none' && !hide){
		//Effect.BlindDown('menu_fixed_contenido', { duration: 0.2 });
		jQuery('#tabla_periodica').show();
// 		$('menu_fixed_contenido').style.display='';
		//a.innerHTML = 'Esconder';
		jQuery('#tarea_tabla_periodica').remove();
	}
	else{
// 		$('menu_fixed_contenido').style.display='none';
		jQuery('#tabla_periodica').hide();
		//Effect.BlindUp('menu_fixed_contenido', { duration: 0.2 });
		//a.innerHTML = 'Mostrar';
		
		var tarea = '<div class="tarea" id="tarea_tabla_periodica" onclick="toggleTablaPeriodica();">Tabla Peri&oacute;dica</div>';
		jQuery('#barra_tareas').append(tarea);
		
		jQuery("#tarea_tabla_periodica").effect('pulsate');
		//new Effect.Pulsate('tarea_tabla_periodica', {from:0.0});

	}
}


function checkPreguntaMenuFixed(obj){
	var campos = obj.id.split('_');
	var id = campos[campos.length-2];
	jQuery('#menu_fixed_pregunta_'+id).removeClass().addClass('pregunta_contestada');
	var titulo = jQuery('#menu_fixed_pregunta_'+id).attr('title');
	var spl = titulo.split('/');
	if(spl.length<2)
		jQuery('#menu_fixed_pregunta_'+id).attr('title', titulo+' / Contestada' );
}
function unCheckPreguntaMenuFixed(id){
	var titulo = jQuery('#menu_fixed_pregunta_'+id).attr('title').split('/');
	jQuery('#menu_fixed_pregunta_'+id).removeClass().addClass('pregunta_omitida');
	jQuery('#menu_fixed_pregunta_'+id).attr('title', jQuery.trim(titulo[0]) );
}

function darMovilidad(div_id){
	//console.log("--------------------------darMovilidad------------------------");
	jQuery('#'+div_id).draggable({
		handle: '#'+div_id+'_handler',
		stop: function(event, ui){
			var posicion = jQuery('#'+div_id).position();
			if(posicion.top<0){
				jQuery('#'+div_id).css('top', "0px");
			} 
		}
	});    
   //console.log("-------------------------------------------");
}
function fixPopup(div_id) {
	if(jQuery('#'+div_id) && typeof document.body.style.maxHeight=="undefined"){
		//get client height
		var offset = getClientHeight();
		// get the element you want to change position to
		var footer = document.getElementById(div_id);
		// get the element right above the previous element
		var main = document.getElementById('ensayo_form');
		// set styles to the element to emulate position:fixed
		footer.style.position = 'absolute';
		//alert(footer.offsetHeight);
		//alert(parseInt($('fixeddiv').style.top));
		//alert(document.documentElement.scrollTop+"+"+parseInt($('fixeddiv').style.top)+"= "+(document.documentElement.scrollTop + parseInt($('fixeddiv').style.top) ));
		//parseInt($('fixeddiv').style.top;
		footer.style.top = (document.documentElement.scrollTop ) + 'px';
		//alert(footer.style.top);
		// add margin to the element above to remove overlapping
		//main.style.marginBottom = footer.offsetHeight + 'px';
	}
}
if(navigator.appName=="Microsoft Internet Explorer" && parseFloat(navigator.appVersion)<=4 ){
	
	jQuery(document).ready(function() {
		jQuery(window).bind("load resize scroll", function() {fixPopup('fixeddiv') });
	});
	
}



function actualizarTiempo(){
	var now = new Date();
	var restante = futuro-now;
	
	var segundos = Math.round(restante/1000); 
	var minutos = Math.floor(segundos/60);

	if(minutos<5){
		if(jQuery('#tarea_ensayo'))
			jQuery('#tarea_ensayo').css('background',"#cc081c");
		jQuery('#tiempo').css('background',"#cc081c");
	}
	if(restante>0){
		var horas = Math.floor(minutos/60);
		var tiempo = PadDigits(horas,2)+":"+PadDigits(minutos%60,2)+":"+PadDigits(segundos%60,2)
		jQuery('#tiempo').html(tiempo);
		if(jQuery('#tarea_ensayo_tiempo').length>0)
			jQuery('#tarea_ensayo_tiempo').html(tiempo);
	}
	else{
		jQuery('#tiempo').html('TIEMPO');
		if(jQuery('#tarea_ensayo_tiempo').length>0)
			jQuery('#tarea_ensayo_tiempo').html('TIEMPO');
		forzarEntrega();
	}
	setTimeout('actualizarTiempo()',500);
}
function chequearTiempo(ensayo_id){
	jQuery.ajax({
		url: base_url+'ensayo/chequearTiempo',
		data: {id:ensayo_id},
		cache: false,     
		type: 'post',
		success: function(html){
		  setTimeout("chequearTiempo("+ensayo_id+")",300000);
		  if(html && html.substring(0,1)==2){
				forzarEntrega();
			  jQuery('#tiempo').html('TIEMPO');
			  if(jQuery('#tarea_ensayo_tiempo').length>0)
				jQuery('#tarea_ensayo_tiempo').html('TIEMPO');
		  }
		},
		error: function(html){
			setTimeout("chequearTiempo("+ensayo_id+")",60000);
		}
		
	});
	
}
function forzarEntrega(){
	jQuery('#ensayo').hide();
	jQuery('#time_out').show();
	jQuery('#ensayo_form').onsubmit = "";
}

