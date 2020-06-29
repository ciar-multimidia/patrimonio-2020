jQuery(document).ready(function($) {

	$('#rodape > .container').append('<a href="#subir" class="btn-subir">subir</a>');
	$('a.btn-subir').on('click', function(){
	  $('html, body').animate({scrollTop:0},1100);
	  return false;
	});

	$('article').on('click', function(event) {
		console.log(event.pageY- $(this).offset().top);
		/* Act on the event */
	});

	var notasrodape = $('.nota-rodape');
	var btrodape = $('.numero-rodape');

	// função que define as posições das notas de rodapé.
	var attPosRodape = function(){
		notasrodape.each(function(index, el) {
			var datanumero = $(el).attr('data-numero');
			var btEquivalente = btrodape.filter('[data-numero=\''+datanumero+'\']');
			var alturaRodape = $(el).height();
			var topCalculado = btEquivalente.position().top - alturaRodape/2;



			var novoTop = (function(){

				if (topCalculado < 0) {
					return 1;
				} else if(topCalculado + alturaRodape > $(el).closest('article').height() ){
					return ($(el).closest('article').height() - alturaRodape - 10);
				} else{
					return topCalculado;
				}
				
			})();
			$(el).css('top', novoTop);

		});	
	}
	



	var rodapeAtual = 0;

	notasrodape.each(function(index, el) {
		$(el).children().wrapAll('<div class="posrel"><div class="texto"></div></div>');
		$(el).find('.posrel').prepend('<p class="numero-equivalente"></p><button class="fechar"></button>');
		$(el).find('.numero-equivalente').text($(el).attr('data-numero'));
		$(el).find('button.fechar').on('click', function(event) {
			$(this).closest('.nota-rodape').removeClass('visivel');
			setTimeout(function(){
				$(this).closest('.nota-rodape').removeClass('db');
				rodapeAtual = 0;
				
			},400);
		});

	});	

	attPosRodape();



	// Atualizar posições sempre que o usuário redimensionar a janela do navegador.
	$(window).on('resize', function(event) {
		attPosRodape();
	});

	btrodape.on('click', function(event) {

		var numeroClicado = parseInt( $(this).attr('data-numero') );

		if (rodapeAtual !== 0) {

			var rodapeAFechar = notasrodape.filter('[data-numero=\''+rodapeAtual+'\']');
			rodapeAFechar.removeClass('visivel');
			setTimeout(function(){
				rodapeAFechar.removeClass('db');
				rodapeAFechar = aRevelar;

			},400);
		}

		var aRevelar = notasrodape.filter('[data-numero=\''+numeroClicado+'\']');

		if (numeroClicado !== rodapeAtual) {
			aRevelar.addClass('db');
			setTimeout(function(){
				aRevelar.addClass('visivel');
			},20);

			rodapeAtual = parseInt( $(this).attr('data-numero') );
		} else{
			rodapeAtual = 0;
		}
	});


	var conjAnexos = $('div.anexos');
	var nMaxAnexos = 8;

	conjAnexos.each(function(index, el) {
		var anexos = $(el).children('figure');
		if (anexos.length > nMaxAnexos) {
			var excessosAnexos = anexos.length - nMaxAnexos;
			anexos.eq(nMaxAnexos-1).append('<p class="maisanexos">+'+excessosAnexos+'</p>')
		}

		var fancyboxArgs = [];
		anexos.each(function(index2, el2) {
			fancyboxArgs.push({
				src: $(el2).children('img').attr('src'),
				opts: {caption: $(el2).children('figcaption').text()}
			});
		});

		$(el).on('click', function(event) {
			$.fancybox.open(
				fancyboxArgs, 
				{
					loop : false,
					gutter: 0,
					slideShow: false,
					fullScreen: false,
					
				});
			/* Act on the event */
		});
	});

	



});