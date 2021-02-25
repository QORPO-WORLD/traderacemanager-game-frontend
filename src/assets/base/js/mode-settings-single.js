$(function(){
	
	/*---------------------------------------------------------------------------------------------------------------------------------------------------------
		Mode Settings script
	---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	$('body').css('min-height', 1000);
	if( $('.main-container').length > 0 ){
		$('.main-container').css('min-height', 1000);
	}	
		
	if( $('.mode-screens-outer-wrapper').length > 0 ){
		
		var simpleControls = $('.mode-control-simple');
		var advancedControls = $('.mode-control-advanced');
		var modeScreens = $('.mode-screens-outer-wrapper');
		
		$('#btnModeSingle').click(function() {
			simpleControls.toggleClass('pull');
			modeScreens.toggleClass('downsize');
			$('#btnAdvancedSingle').toggleClass('disable');
			$(this).toggleClass('active');
		});	
		
		$('#btnAdvancedSingle').click(function() {
			$('.machine-and-notif-wrapper').toggleClass('hide');
			advancedControls.toggleClass('pull');
			modeScreens.toggleClass('downsize');
			$('#btnModeSingle').toggleClass('disable');
			$(this).toggleClass('active');
		});	
		
		$('.mode-control-container .close').click(function() {
			modeScreens.toggleClass('downsize');
			$(this).parent().toggleClass('pull');
			if($('.machine-and-notif-wrapper').hasClass('hide')){
				$('.machine-and-notif-wrapper').removeClass('hide');
			}
			if($('#btnModeSingle').hasClass('disable')){
				$('#btnModeSingle').removeClass('disable');
			}
			if($('#btnModeSingle').hasClass('active')){
				$('#btnModeSingle').removeClass('active');
			}
			if($('#btnAdvancedSingle').hasClass('disable')){
				$('#btnAdvancedSingle').removeClass('disable');
			}
			if($('#btnAdvancedSingle').hasClass('active')){
				$('#btnAdvancedSingle').removeClass('active');
			}
		});	
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// SIMPLE CONTROLS
		// MODE CONTROLS SINGLE
		$(document).on('click', '.mode-control-simple .mode-controls-single [data-toggle="class"]', function () {
			var $targetScreen = $($(this).data('target'));
			var classes = $(this).data('classes');
			$(this).toggleClass('active');
			$targetScreen.toggleClass(classes);			
		});	
		
		//Click on button AUTOMATIC
		$('.mode-control-simple [data-target="#msAutomaticSingle"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msStandbySingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msStandbySingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashSingle"]').hasClass('disableForStandbySingle')){
					$('.mode-control-simple [data-target="#msWashSingle"]').toggleClass('disableForStandbySingle');
				}
				if($('.mode-control-simple [data-target="#msWashSingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msWashSingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msMixPumpSingle"]').hasClass('disableForStandbySingle')){
					$('.mode-control-simple [data-target="#msMixPumpSingle"]').toggleClass('disableForStandbySingle');
				}
				if($('.mode-control-simple [data-target="#msMixPumpSingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msMixPumpSingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleSingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msHeatCycleSingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleSingle"]').hasClass('disableForOffSingle')){
					$('.mode-control-simple [data-target="#msHeatCycleSingle"]').removeClass('disableForOffSingle');
				}
				if($('.mode-control-simple [data-target="#msOffSingle"').hasClass('disable')){
					$('.mode-control-simple [data-target="#msOffSingle"').removeClass('disable');
				}
				if($('#msStandbySingle').hasClass('pull-screen')){
					$('#msStandbySingle').removeClass('pull-screen');
				}
				if($('#msWashSingle').hasClass('pull-screen')){
					$('#msWashSingle').removeClass('pull-screen');
				}
				if($('#msMixPumpSingle').hasClass('pull-screen')){
					$('#msMixPumpSingle').removeClass('pull-screen');
				}
				$('.mode-control-simple [data-target="#msWashSingle"]').toggleClass('disableForAutomaticSingle');
				$('.mode-control-simple [data-target="#msMixPumpSingle"]').toggleClass('disableForAutomaticSingle');
				$('#msSyrupHeaterSingle').css('z-index', 1);
				$('#msAutomaticSingle').css('z-index', 2);
				
				if($('#msSyrupHeaterSingle').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
					$('#msSyrupHeaterSingle').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;  
			
		});
		
		//Click on button STANDBY
		$('.mode-control-simple [data-target="#msStandbySingle"]').click(function() {			
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msAutomaticSingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msAutomaticSingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashSingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msWashSingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashSingle"]').hasClass('disableForAutomaticSingle')){
					$('.mode-control-simple [data-target="#msWashSingle"]').toggleClass('disableForAutomaticSingle');
				}
				if($('.mode-control-simple [data-target="#msMixPumpSingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msMixPumpSingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msMixPumpSingle"]').hasClass('disableForAutomaticSingle')){
					$('.mode-control-simple [data-target="#msMixPumpSingle"]').toggleClass('disableForAutomaticSingle');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleSingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msHeatCycleSingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleSingle"').hasClass('disable')){
					$('.mode-control-simple [data-target="#msHeatCycleSingle"').removeClass('disable');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleSingle"]').hasClass('disableForOffSingle')){
					$('.mode-control-simple [data-target="#msHeatCycleSingle"]').removeClass('disableForOffSingle');
				}
				if($('.mode-control-simple [data-target="#msOffSingle"').hasClass('disable')){
					$('.mode-control-simple [data-target="#msOffSingle"').removeClass('disable');
				}
				if($('#msAutomaticSingle').hasClass('pull-screen')){
					$('#msAutomaticSingle').removeClass('pull-screen');
				}
				if($('#msWashSingle').hasClass('pull-screen')){
					$('#msWashSingle').removeClass('pull-screen');
				}
				if($('#msMixPumpSingle').hasClass('pull-screen')){
					$('#msMixPumpSingle').removeClass('pull-screen');
				}
				$('.mode-control-simple [data-target="#msWashSingle"]').toggleClass('disableForStandbySingle');
				$('.mode-control-simple [data-target="#msMixPumpSingle"]').toggleClass('disableForStandbySingle');
				$('#msSyrupHeaterSingle').css('z-index', 1);
				$('#msStandbySingle').css('z-index', 2);
				
				if($('#msSyrupHeaterSingle').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
					$('#msSyrupHeaterSingle').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;
		
		});
		
		//Click on button WASH
		$('.mode-control-simple [data-target="#msWashSingle"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msAutomaticSingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msAutomaticSingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msStandbySingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msStandbySingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleSingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msHeatCycleSingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleSingle"]').hasClass('disableForOffSingle')){
					$('.mode-control-simple [data-target="#msHeatCycleSingle"]').removeClass('disableForOffSingle');
				}
				if($('#msAutomaticSingle').hasClass('pull-screen')){
					$('#msAutomaticSingle').removeClass('pull-screen');
				}
				if($('#msStandbySingle').hasClass('pull-screen')){
					$('#msStandbySingle').removeClass('pull-screen');
				}		
				
				$('.mode-control-simple [data-target="#msAutomaticSingle"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msStandbySingle"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msHeatCycleSingle"]').toggleClass('disable');
				$('#msSyrupHeaterSingle').css('z-index', 1);
				$('#msMixPumpSingle').css('z-index', 1);
				$('#msWashSingle').css('z-index', 2);
							
				if($('.mode-control-simple [data-target="#msMixPumpSingle"]').hasClass('active') && $('.mode-control-simple [data-target="#msSyrupHeaterSingle"]').hasClass('active')){
					
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
					$('#msSyrupHeaterSingle').css('z-index', 1);
					$('#msMixPumpBadgeSingle').css('z-index', 3);
					$('#msMixPumpSingle').css('z-index', 1);
				}	
				if($('#msSyrupHeaterSingle').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
					$('#msSyrupHeaterSingle').css('z-index', 1);
				}				
				if($('#msMixPumpSingle').hasClass('pull-screen')){
					$('#msMixPumpBadgeSingle').toggleClass('pull-screen');
					$('#msMixPumpBadgeSingle').css('z-index', 3);
					$('#msMixPumpSingle').css('z-index', 1);
				}
				
			} else {
				// second click				
			}
			++clicks;
		});
		
		//Click on button HEAT CYCLE
		$('.mode-control-simple [data-target="#msHeatCycleSingle"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msAutomaticSingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msAutomaticSingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msStandbySingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msStandbySingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashSingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msWashSingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msMixPumpSingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msMixPumpSingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashSingle"]').hasClass('disableForAutomaticSingle')){
					$('.mode-control-simple [data-target="#msWashSingle"]').removeClass('disableForAutomaticSingle');
				}
				if($('.mode-control-simple [data-target="#msWashSingle"]').hasClass('disableForStandbySingle')){
					$('.mode-control-simple [data-target="#msWashSingle"]').removeClass('disableForStandbySingle');
				}
				if($('.mode-control-simple [data-target="#msMixPumpSingle"]').hasClass('disableForAutomaticSingle')){
					$('.mode-control-simple [data-target="#msMixPumpSingle"]').removeClass('disableForAutomaticSingle');
				}
				if($('.mode-control-simple [data-target="#msMixPumpSingle"]').hasClass('disableForStandbySingle')){
					$('.mode-control-simple [data-target="#msMixPumpSingle"]').removeClass('disableForStandbySingle');
				}
				if($('.mode-control-simple [data-target="#msOffSingle"').hasClass('disable')){
					$('.mode-control-simple [data-target="#msOffSingle"').removeClass('disable');
				}
				if($('#msAutomaticSingle').hasClass('pull-screen')){
					$('#msAutomaticSingle').removeClass('pull-screen');
				}
				if($('#msStandbySingle').hasClass('pull-screen')){
					$('#msStandbySingle').removeClass('pull-screen');
				}
				if($('#msMixPumpSingle').hasClass('pull-screen')){
					$('#msMixPumpSingle').removeClass('pull-screen');
				}
				$('.mode-control-simple [data-target="#msAutomaticSingle"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msStandbySingle"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msWashSingle"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msMixPumpSingle"]').toggleClass('disable');
				$('#msSyrupHeaterSingle').css('z-index', 1);
				$('#msHeatCycleSingle').css('z-index', 2);
								
				if($('#msSyrupHeaterSingle').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
					$('#msSyrupHeaterSingle').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button SYRUP HEATER
		$('.mode-control-simple [data-target="#msSyrupHeaterSingle"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msHeatCycleSingle"]').hasClass('disableForOffSingle')){
					$('.mode-control-simple [data-target="#msHeatCycleSingle"]').removeClass('disableForOffSingle');
				}
				$('#msSyrupHeaterSingle').css('z-index', 3);
				
				if($('.mode-control-simple [data-target="#msAutomaticSingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msStandbySingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msWashSingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msHeatCycleSingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msMixPumpSingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msMixPumpSingle"]').hasClass('active') && $('.mode-control-simple [data-target="#msWashSingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 2);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button MIX PUMP
		$('.mode-control-simple [data-target="#msMixPumpSingle"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click				
				if($('.mode-control-simple [data-target="#msAutomaticSingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msAutomaticSingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msStandbySingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msStandbySingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleSingle"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msHeatCycleSingle"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleSingle"]').hasClass('disableForOffSingle')){
					$('.mode-control-simple [data-target="#msHeatCycleSingle"]').removeClass('disableForOffSingle');
				}				
				if($('#msStandbySingle').hasClass('pull-screen')){
					$('#msStandbySingle').removeClass('pull-screen');
				}
				$('#msWashSingle').css('z-index', 1);
				$('#msSyrupHeaterSingle').css('z-index', 1);
				$('#msMixPumpSingle').css('z-index', 2);
				
				if($('.mode-control-simple [data-target="#msWashSingle"]').hasClass('active')){
					$('#msMixPumpSingle').css('z-index', 0);
					$('#msMixPumpBadgeSingle').toggleClass('pull-screen');
					$('#msMixPumpBadgeSingle').css('z-index', 3);
				}
				if($('[data-target="#msSyrupHeaterSingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msSyrupHeaterSingle"]').hasClass('active') && $('.mode-control-simple [data-target="#msWashSingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 2);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button OFF
		$('[data-target="#msOffSingle"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-controls-single .mode-control').hasClass('active')){
					$('.mode-controls-single .mode-control').removeClass('active');
				}
				if($('.mode-controls-single .mode-control').hasClass('disableForAutomaticSingle')){
					$('.mode-controls-single .mode-control').removeClass('disableForAutomaticSingle');
				}
				if($('.mode-controls-single .mode-control').hasClass('disableForStandbySingle')){
					$('.mode-controls-single .mode-control').removeClass('disableForStandbySingle');
				}
				if($('.mode-controls-single .mode-control').hasClass('disable')){
					$('.mode-controls-single .mode-control').removeClass('disable');
				}
				if($('.mode-screens-single .mode-screen').hasClass('pull-screen')){
					$('.mode-screens-single .mode-screen').removeClass('pull-screen');
				}
				$('.mode-control-simple [data-target="#msHeatCycleSingle"]').addClass('disableForOffSingle');
			} else {
				// second click
			}
			++clicks;
		});
		
		
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// ADVANCED CONTROLS
		// MODE CONTROLS RIGHT
		$(document).on('click', '.mode-control-advanced .mode-controls-single-right [data-toggle="class"]', function () {
			var $targetScreen = $($(this).data('target'));
			var classes = $(this).data('classes');
			$(this).toggleClass('active');
			$targetScreen.toggleClass(classes);			
		});	
		
		//Click on button AUTOMATIC
		$('.mode-control-advanced [data-target="#msAutomaticSingle"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msStandbySingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msStandbySingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashSingle"]').hasClass('disableForStandbySingle')){
					$('.mode-control-advanced [data-target="#msWashSingle"]').toggleClass('disableForStandbySingle');
				}
				if($('.mode-control-advanced [data-target="#msWashSingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msWashSingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpSingle"]').hasClass('disableForStandbySingle')){
					$('.mode-control-advanced [data-target="#msMixPumpSingle"]').toggleClass('disableForStandbySingle');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpSingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msMixPumpSingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleSingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msHeatCycleSingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleSingle"]').hasClass('disableForOffSingle')){
					$('.mode-control-advanced [data-target="#msHeatCycleSingle"]').removeClass('disableForOffSingle');
				}
				if($('.mode-control-advanced [data-target="#msOffSingle"').hasClass('disable')){
					$('.mode-control-advanced [data-target="#msOffSingle"').removeClass('disable');
				}
				if($('#msStandbySingle').hasClass('pull-screen')){
					$('#msStandbySingle').removeClass('pull-screen');
				}
				if($('#msWashSingle').hasClass('pull-screen')){
					$('#msWashSingle').removeClass('pull-screen');
				}
				if($('#msMixPumpSingle').hasClass('pull-screen')){
					$('#msMixPumpSingle').removeClass('pull-screen');
				}
				$('.mode-control-advanced [data-target="#msWashSingle"]').toggleClass('disableForAutomaticSingle');
				$('.mode-control-advanced [data-target="#msMixPumpSingle"]').toggleClass('disableForAutomaticSingle');
				$('#msSyrupHeaterSingle').css('z-index', 1);
				$('#msAutomaticSingle').css('z-index', 2);
				
				if($('#msSyrupHeaterSingle').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
					$('#msSyrupHeaterSingle').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;  
			
		});
		
		//Click on button STANDBY
		$('.mode-control-advanced [data-target="#msStandbySingle"]').click(function() {			
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msAutomaticSingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msAutomaticSingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashSingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msWashSingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashSingle"]').hasClass('disableForAutomaticSingle')){
					$('.mode-control-advanced [data-target="#msWashSingle"]').toggleClass('disableForAutomaticSingle');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpSingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msMixPumpSingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpSingle"]').hasClass('disableForAutomaticSingle')){
					$('.mode-control-advanced [data-target="#msMixPumpSingle]').toggleClass('disableForAutomaticSingle');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleSingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msHeatCycleSingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleSingle"').hasClass('disable')){
					$('.mode-control-advanced [data-target="#msHeatCycleSingle"').removeClass('disable');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleSingle"]').hasClass('disableForOffSingle')){
					$('.mode-control-advanced [data-target="#msHeatCycleSingle"]').removeClass('disableForOffSingle');
				}
				if($('.mode-control-advanced [data-target="#msOffSingle"').hasClass('disable')){
					$('.mode-control-advanced [data-target="#msOffSingle"').removeClass('disable');
				}
				if($('#msAutomaticSingle').hasClass('pull-screen')){
					$('#msAutomaticSingle').removeClass('pull-screen');
				}
				if($('#msWashSingle').hasClass('pull-screen')){
					$('#msWashSingle').removeClass('pull-screen');
				}
				if($('#msMixPumpSingle').hasClass('pull-screen')){
					$('#msMixPumpSingle').removeClass('pull-screen');
				}
				$('.mode-control-advanced [data-target="#msWashSingle"]').toggleClass('disableForStandbySingle');
				$('.mode-control-advanced [data-target="#msMixPumpSingle"]').toggleClass('disableForStandbySingle');
				$('#msSyrupHeaterSingle').css('z-index', 1);
				$('#msStandbySingle').css('z-index', 2);
				
				if($('#msSyrupHeaterSingle').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
					$('#msSyrupHeaterSingle').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;
		
		});
		
		//Click on button WASH
		$('.mode-control-advanced [data-target="#msWashSingle"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msAutomaticSingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msAutomaticSingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msStandbySingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msStandbySingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleSingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msHeatCycleSingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleSingle"]').hasClass('disableForOffSingle')){
					$('.mode-control-advanced [data-target="#msHeatCycleSingle"]').removeClass('disableForOffSingle');
				}
				if($('#msAutomaticSingle').hasClass('pull-screen')){
					$('#msAutomaticSingle').removeClass('pull-screen');
				}
				if($('#msStandbySingle').hasClass('pull-screen')){
					$('#msStandbySingle').removeClass('pull-screen');
				}		
				
				$('.mode-control-advanced [data-target="#msAutomaticSingle"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msStandbySingle"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msHeatCycleSingle"]').toggleClass('disable');
				$('#msSyrupHeaterSingle').css('z-index', 1);
				$('#msMixPumpSingle').css('z-index', 1);
				$('#msWashSingle').css('z-index', 2);
							
				if($('.mode-control-advanced [data-target="#msMixPumpSingle"]').hasClass('active') && $('.mode-control-advanced [data-target="#msSyrupHeaterSingle"]').hasClass('active')){
					
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
					$('#msSyrupHeaterSingle').css('z-index', 1);
					$('#msMixPumpBadgeSingle').css('z-index', 3);
					$('#msMixPumpSingle').css('z-index', 1);
				}	
				if($('#msSyrupHeaterSingle').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
					$('#msSyrupHeaterSingle').css('z-index', 1);
				}				
				if($('#msMixPumpSingle').hasClass('pull-screen')){
					$('#msMixPumpBadgeSingle').toggleClass('pull-screen');
					$('#msMixPumpBadgeSingle').css('z-index', 3);
					$('#msMixPumpRight').css('z-index', 1);
				}
				
			} else {
				// second click				
			}
			++clicks;
		});
		
		//Click on button HEAT CYCLE
		$('.mode-control-advanced [data-target="#msHeatCycleSingle"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msAutomaticSingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msAutomaticSingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msStandbySingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msStandbySingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashSingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msWashSingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpSingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msMixPumpSingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashSingle"]').hasClass('disableForAutomaticSingle')){
					$('.mode-control-advanced [data-target="#msWashSingle"]').removeClass('disableForAutomaticSingle');
				}
				if($('.mode-control-advanced [data-target="#msWashSingle"]').hasClass('disableForStandbySingle')){
					$('.mode-control-advanced [data-target="#msWashSingle"]').removeClass('disableForStandbySingle');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpSingle"]').hasClass('disableForAutomaticSingle')){
					$('.mode-control-advanced [data-target="#msMixPumpSingle"]').removeClass('disableForAutomaticSingle');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpSingle"]').hasClass('disableForStandbySingle')){
					$('.mode-control-advanced [data-target="#msMixPumpSingle"]').removeClass('disableForStandbySingle');
				}
				if($('.mode-control-advanced [data-target="#msOffSingle"').hasClass('disable')){
					$('.mode-control-advanced [data-target="#msOffSingle"').removeClass('disable');
				}
				if($('#msAutomaticSingle').hasClass('pull-screen')){
					$('#msAutomaticSingle').removeClass('pull-screen');
				}
				if($('#msStandbySingle').hasClass('pull-screen')){
					$('#msStandbySingle').removeClass('pull-screen');
				}
				if($('#msMixPumpSingle').hasClass('pull-screen')){
					$('#msMixPumpSingle').removeClass('pull-screen');
				}
				$('.mode-control-advanced [data-target="#msAutomaticSingle"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msStandbySingle"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msWashSingle"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msMixPumpSingle"]').toggleClass('disable');
				$('#msSyrupHeaterSingle').css('z-index', 1);
				$('#msHeatCycleSingle').css('z-index', 2);
								
				if($('#msSyrupHeaterSingle').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
					$('#msSyrupHeaterSingle').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button SYRUP HEATER
		$('.mode-control-advanced [data-target="#msSyrupHeaterSingle"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msHeatCycleSingle"]').hasClass('disableForOffSingle')){
					$('.mode-control-advanced [data-target="#msHeatCycleSingle"]').removeClass('disableForOffSingle');
				}
				$('#msSyrupHeaterRight').css('z-index', 3);
				
				if($('.mode-control-advanced [data-target="#msAutomaticSingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msStandbySingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msWashSingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleSingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msMixPumpSingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msMixPumpSingle"]').hasClass('active') && $('.mode-control-advanced [data-target="#msWashSingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 2);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button MIX PUMP
		$('.mode-control-advanced [data-target="#msMixPumpSingle"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click				
				if($('.mode-control-advanced [data-target="#msAutomaticSingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msAutomaticSingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msStandbySingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msStandbySingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleSingle"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msHeatCycleSingle"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleSingle"]').hasClass('disableForOffSingle')){
					$('.mode-control-advanced [data-target="#msHeatCycleSingle"]').removeClass('disableForOffSingle');
				}				
				if($('#msStandbySingle').hasClass('pull-screen')){
					$('#msStandbySingle').removeClass('pull-screen');
				}
				$('#msWashSingle').css('z-index', 1);
				$('#msSyrupHeaterSingle').css('z-index', 1);
				$('#msMixPumpSingle').css('z-index', 2);
				
				if($('.mode-control-advanced [data-target="#msWashSingle"]').hasClass('active')){
					$('#msMixPumpSingle').css('z-index', 0);
					$('#msMixPumpBadgeSingle').toggleClass('pull-screen');
					$('#msMixPumpBadgeSingle').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msSyrupHeaterSingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msSyrupHeaterSingle"]').hasClass('active') && $('.mode-control-advanced [data-target="#msWashSingle"]').hasClass('active')){
					$('#msSyrupHeaterSingle').css('z-index', 0);
					$('#msSyrupHeaterBadgeSingle').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeSingle').css('z-index', 2);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button OFF
		$('.mode-control-advanced [data-target="#msOffSingle"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-controls-single-right .mode-control').hasClass('active')){
					$('.mode-controls-single-right .mode-control').removeClass('active');
				}
				if($('.mode-controls-single-right .mode-control').hasClass('disableForAutomaticSingle')){
					$('.mode-controls-single-right .mode-control').removeClass('disableForAutomaticSingle');
				}
				if($('.mode-controls-single-right .mode-control').hasClass('disableForStandbySingle')){
					$('.mode-controls-single-right .mode-control').removeClass('disableForStandbySingle');
				}
				if($('.mode-controls-single-right .mode-control').hasClass('disable')){
					$('.mode-controls-single-right .mode-control').removeClass('disable');
				}
				if($('.mode-screens-right .mode-screen').hasClass('pull-screen')){
					$('.mode-screens-right .mode-screen').removeClass('pull-screen');
				}
				$('.mode-control-advanced [data-target="#msHeatCycleSingle"]').addClass('disableForOffSingle');
			} else {
				// second click
			}
			++clicks;
		});
		// END mode-control-advanced
			
	
	}// END if( $('.mode-screens-outer-wrapper').length > 0 ){
	
	
});//End All	