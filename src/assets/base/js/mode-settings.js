$(function(){
	
	/*---------------------------------------------------------------------------------------------------------------------------------------------------------
		Mode Settings script
	---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	$('body').css('min-height', 1000);
	if( $('.main-container').length > 0 ){
		$('.main-container').css('min-height', 1000);
	}	
		
	if( $('.mode-screens-outer-wrapper').length > 0 ){
		
		//EDIT 10 Feb 2019
		//On '.machine-navbar-nav .nav-item .nav-link'
		//disable sibling '.nav-link' when one is clicked
		$('.machine-navbar-nav .nav-item .nav-link').click(function() {
			$('.machine-navbar-nav .nav-item .nav-link').not($(this)).toggleClass('disable');
		})
	
		var simpleControls = $('.mode-control-simple');
		var advancedControls = $('.mode-control-advanced');
		var ecoControls = $('.mode-control-eco');
		var modeScreens = $('.mode-screens-outer-wrapper');
		
		$('#btnMode').click(function() {
			simpleControls.toggleClass('pull');
			modeScreens.toggleClass('downsize');
			//$('#btnAdvanced').toggleClass('disable');
			$(this).toggleClass('active');
		});	
		
		$('#btnAdvanced').click(function() {
			$('.machine-and-notif-wrapper').toggleClass('hide');
			advancedControls.toggleClass('pull');
			modeScreens.toggleClass('downsize');
			//$('#btnMode').toggleClass('disable');
			$(this).toggleClass('active');
		});	
		
		$('#btnEco').click(function() {
			ecoControls.toggleClass('pull');
			modeScreens.toggleClass('downsize');
			$(this).toggleClass('active');
		});	
		//END EDIT 10 Feb 2019
		
		
		$('.mode-control-container .close').click(function() {
			modeScreens.toggleClass('downsize');
			$(this).parent().toggleClass('pull');
			if($('.machine-and-notif-wrapper').hasClass('hide')){
				$('.machine-and-notif-wrapper').removeClass('hide');
			}
			if($('#btnMode').hasClass('disable')){
				$('#btnMode').removeClass('disable');
			}
			if($('#btnMode').hasClass('active')){
				$('#btnMode').removeClass('active');
			}
			if($('#btnAdvanced').hasClass('disable')){
				$('#btnAdvanced').removeClass('disable');
			}
			if($('#btnAdvanced').hasClass('active')){
				$('#btnAdvanced').removeClass('active');
			}
		});	
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// SIMPLE CONTROLS
		// MODE CONTROLS LEFT
		$(document).on('click', '.mode-control-simple .mode-controls-left [data-toggle="class"]', function () {
			var $targetScreen = $($(this).data('target'));
			var classes = $(this).data('classes');
			$(this).toggleClass('active');
			$targetScreen.toggleClass(classes);			
		});	
		
		//Click on button AUTOMATIC
		$('.mode-control-simple [data-target="#msAutomaticLeft"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msStandbyLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msStandbyLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashLeft"]').hasClass('disableForStandbyLeft')){
					$('.mode-control-simple [data-target="#msWashLeft"]').toggleClass('disableForStandbyLeft');
				}
				if($('.mode-control-simple [data-target="#msWashLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msWashLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msMixPumpLeft"]').hasClass('disableForStandbyLeft')){
					$('.mode-control-simple [data-target="#msMixPumpLeft"]').toggleClass('disableForStandbyLeft');
				}
				if($('.mode-control-simple [data-target="#msMixPumpLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msMixPumpLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msHeatCycleLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleLeft"]').hasClass('disableForOffLeft')){
					$('.mode-control-simple [data-target="#msHeatCycleLeft"]').removeClass('disableForOffLeft');
				}
				if($('.mode-control-simple [data-target="#msOff"').hasClass('disable')){
					$('.mode-control-simple [data-target="#msOff"').removeClass('disable');
				}
				if($('#msStandbyLeft').hasClass('pull-screen')){
					$('#msStandbyLeft').removeClass('pull-screen');
				}
				if($('#msWashLeft').hasClass('pull-screen')){
					$('#msWashLeft').removeClass('pull-screen');
				}
				if($('#msMixPumpLeft').hasClass('pull-screen')){
					$('#msMixPumpLeft').removeClass('pull-screen');
				}
				$('.mode-control-simple [data-target="#msWashLeft"]').toggleClass('disableForAutomaticLeft');
				$('.mode-control-simple [data-target="#msMixPumpLeft"]').toggleClass('disableForAutomaticLeft');
				$('#msSyrupHeaterLeft').css('z-index', 1);
				$('#msAutomaticLeft').css('z-index', 2);
				
				if($('#msSyrupHeaterLeft').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
					$('#msSyrupHeaterLeft').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;  
			
		});
		
		//Click on button STANDBY
		$('.mode-control-simple [data-target="#msStandbyLeft"]').click(function() {			
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msAutomaticLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msAutomaticLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msWashLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashLeft"]').hasClass('disableForAutomaticLeft')){
					$('.mode-control-simple [data-target="#msWashLeft"]').toggleClass('disableForAutomaticLeft');
				}
				if($('.mode-control-simple [data-target="#msMixPumpLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msMixPumpLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msMixPumpLeft"]').hasClass('disableForAutomaticLeft')){
					$('.mode-control-simple [data-target="#msMixPumpLeft"]').toggleClass('disableForAutomaticLeft');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msHeatCycleLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleLeft"').hasClass('disable')){
					$('.mode-control-simple [data-target="#msHeatCycleLeft"').removeClass('disable');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleLeft"]').hasClass('disableForOffLeft')){
					$('.mode-control-simple [data-target="#msHeatCycleLeft"]').removeClass('disableForOffLeft');
				}
				if($('.mode-control-simple [data-target="#msOffLeft"').hasClass('disable')){
					$('.mode-control-simple [data-target="#msOffLeft"').removeClass('disable');
				}
				if($('#msAutomaticLeft').hasClass('pull-screen')){
					$('#msAutomaticLeft').removeClass('pull-screen');
				}
				if($('#msWashLeft').hasClass('pull-screen')){
					$('#msWashLeft').removeClass('pull-screen');
				}
				if($('#msMixPumpLeft').hasClass('pull-screen')){
					$('#msMixPumpLeft').removeClass('pull-screen');
				}
				$('.mode-control-simple [data-target="#msWashLeft"]').toggleClass('disableForStandbyLeft');
				$('.mode-control-simple [data-target="#msMixPumpLeft"]').toggleClass('disableForStandbyLeft');
				$('#msSyrupHeaterLeft').css('z-index', 1);
				$('#msStandbyLeft').css('z-index', 2);
				
				if($('#msSyrupHeaterLeft').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
					$('#msSyrupHeaterLeft').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;
		
		});
		
		//Click on button WASH
		$('.mode-control-simple [data-target="#msWashLeft"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msAutomaticLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msAutomaticLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msStandbyLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msStandbyLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msHeatCycleLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleLeft"]').hasClass('disableForOffLeft')){
					$('.mode-control-simple [data-target="#msHeatCycleLeft"]').removeClass('disableForOffLeft');
				}
				if($('#msAutomaticLeft').hasClass('pull-screen')){
					$('#msAutomaticLeft').removeClass('pull-screen');
				}
				if($('#msStandbyLeft').hasClass('pull-screen')){
					$('#msStandbyLeft').removeClass('pull-screen');
				}		
				
				$('.mode-control-simple [data-target="#msAutomaticLeft"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msStandbyLeft"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msHeatCycleLeft"]').toggleClass('disable');
				$('#msSyrupHeaterLeft').css('z-index', 1);
				$('#msMixPumpLeft').css('z-index', 1);
				$('#msWashLeft').css('z-index', 2);
							
				if($('.mode-control-simple [data-target="#msMixPumpLeft"]').hasClass('active') && $('.mode-control-simple [data-target="#msSyrupHeaterLeft"]').hasClass('active')){
					
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
					$('#msSyrupHeaterLeft').css('z-index', 1);
					$('#msMixPumpBadgeLeft').css('z-index', 3);
					$('#msMixPumpLeft').css('z-index', 1);
				}	
				if($('#msSyrupHeaterLeft').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
					$('#msSyrupHeaterLeft').css('z-index', 1);
				}				
				if($('#msMixPumpLeft').hasClass('pull-screen')){
					$('#msMixPumpBadgeLeft').toggleClass('pull-screen');
					$('#msMixPumpBadgeLeft').css('z-index', 3);
					$('#msMixPumpLeft').css('z-index', 1);
				}
				
			} else {
				// second click				
			}
			++clicks;
		});
		
		//Click on button HEAT CYCLE
		$('.mode-control-simple [data-target="#msHeatCycleLeft"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msAutomaticLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msAutomaticLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msStandbyLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msStandbyLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msWashLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msMixPumpLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msMixPumpLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashLeft"]').hasClass('disableForAutomaticLeft')){
					$('.mode-control-simple [data-target="#msWashLeft"]').removeClass('disableForAutomaticLeft');
				}
				if($('.mode-control-simple [data-target="#msWashLeft"]').hasClass('disableForStandbyLeft')){
					$('.mode-control-simple [data-target="#msWashLeft"]').removeClass('disableForStandbyLeft');
				}
				if($('.mode-control-simple [data-target="#msMixPumpLeft"]').hasClass('disableForAutomaticLeft')){
					$('.mode-control-simple [data-target="#msMixPumpLeft"]').removeClass('disableForAutomaticLeft');
				}
				if($('.mode-control-simple [data-target="#msMixPumpLeft"]').hasClass('disableForStandbyLeft')){
					$('.mode-control-simple [data-target="#msMixPumpLeft"]').removeClass('disableForStandbyLeft');
				}
				if($('.mode-control-simple [data-target="#msOffLeft"').hasClass('disable')){
					$('.mode-control-simple [data-target="#msOffLeft"').removeClass('disable');
				}
				if($('#msAutomaticLeft').hasClass('pull-screen')){
					$('#msAutomaticLeft').removeClass('pull-screen');
				}
				if($('#msStandbyLeft').hasClass('pull-screen')){
					$('#msStandbyLeft').removeClass('pull-screen');
				}
				if($('#msMixPumpLeft').hasClass('pull-screen')){
					$('#msMixPumpLeft').removeClass('pull-screen');
				}
				$('.mode-control-simple [data-target="#msAutomaticLeft"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msStandbyLeft"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msWashLeft"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msMixPumpLeft"]').toggleClass('disable');
				$('#msSyrupHeaterLeft').css('z-index', 1);
				$('#msHeatCycleLeft').css('z-index', 2);
								
				if($('#msSyrupHeaterLeft').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
					$('#msSyrupHeaterLeft').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button SYRUP HEATER
		$('.mode-control-simple [data-target="#msSyrupHeaterLeft"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msHeatCycleLeft"]').hasClass('disableForOffLeft')){
					$('.mode-control-simple [data-target="#msHeatCycleLeft"]').removeClass('disableForOffLeft');
				}
				$('#msSyrupHeaterLeft').css('z-index', 3);
				
				if($('.mode-control-simple [data-target="#msAutomaticLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msStandbyLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msWashLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msHeatCycleLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msMixPumpLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msMixPumpLeft"]').hasClass('active') && $('.mode-control-simple [data-target="#msWashLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 2);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button MIX PUMP
		$('.mode-control-simple [data-target="#msMixPumpLeft"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click				
				if($('.mode-control-simple [data-target="#msAutomaticLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msAutomaticLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msStandbyLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msStandbyLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleLeft"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msHeatCycleLeft"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleLeft"]').hasClass('disableForOffLeft')){
					$('.mode-control-simple [data-target="#msHeatCycleLeft"]').removeClass('disableForOffLeft');
				}				
				if($('#msStandbyLeft').hasClass('pull-screen')){
					$('#msStandbyLeft').removeClass('pull-screen');
				}
				$('#msWashLeft').css('z-index', 1);
				$('#msSyrupHeaterLeft').css('z-index', 1);
				$('#msMixPumpLeft').css('z-index', 2);
				
				if($('.mode-control-simple [data-target="#msWashLeft"]').hasClass('active')){
					$('#msMixPumpLeft').css('z-index', 0);
					$('#msMixPumpBadgeLeft').toggleClass('pull-screen');
					$('#msMixPumpBadgeLeft').css('z-index', 3);
				}
				if($('[data-target="#msSyrupHeaterLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msSyrupHeaterLeft"]').hasClass('active') && $('.mode-control-simple [data-target="#msWashLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 2);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button OFF
		$('[data-target="#msOffLeft"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-controls-left .mode-control').hasClass('active')){
					$('.mode-controls-left .mode-control').removeClass('active');
				}
				if($('.mode-controls-left .mode-control').hasClass('disableForAutomaticLeft')){
					$('.mode-controls-left .mode-control').removeClass('disableForAutomaticLeft');
				}
				if($('.mode-controls-left .mode-control').hasClass('disableForStandbyLeft')){
					$('.mode-controls-left .mode-control').removeClass('disableForStandbyLeft');
				}
				if($('.mode-controls-left .mode-control').hasClass('disable')){
					$('.mode-controls-left .mode-control').removeClass('disable');
				}
				if($('.mode-screens-left .mode-screen').hasClass('pull-screen')){
					$('.mode-screens-left .mode-screen').removeClass('pull-screen');
				}
				$('.mode-control-simple [data-target="#msHeatCycleLeft"]').addClass('disableForOffLeft');
			} else {
				// second click
			}
			++clicks;
		});
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// SIMPLE CONTROLS
		// MODE CONTROLS RIGHT
		$(document).on('click', '.mode-control-simple .mode-controls-right [data-toggle="class"]', function () {
			var $targetScreen = $($(this).data('target'));
			var classes = $(this).data('classes');
			$(this).toggleClass('active');
			$targetScreen.toggleClass(classes);			
		});	
		
		//Click on button AUTOMATIC
		$('.mode-control-simple [data-target="#msAutomaticRight"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msStandbyRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msStandbyRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashRight"]').hasClass('disableForStandbyRight')){
					$('.mode-control-simple [data-target="#msWashRight"]').toggleClass('disableForStandbyRight');
				}
				if($('.mode-control-simple [data-target="#msWashRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msWashRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msMixPumpRight"]').hasClass('disableForStandbyRight')){
					$('.mode-control-simple [data-target="#msMixPumpRight"]').toggleClass('disableForStandbyRight');
				}
				if($('.mode-control-simple [data-target="#msMixPumpRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msMixPumpRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msHeatCycleRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleRight"]').hasClass('disableForOffRight')){
					$('.mode-control-simple [data-target="#msHeatCycleRight"]').removeClass('disableForOffRight');
				}
				if($('.mode-control-simple [data-target="#msOff"').hasClass('disable')){
					$('.mode-control-simple [data-target="#msOff"').removeClass('disable');
				}
				if($('#msStandbyRight').hasClass('pull-screen')){
					$('#msStandbyRight').removeClass('pull-screen');
				}
				if($('#msWashRight').hasClass('pull-screen')){
					$('#msWashRight').removeClass('pull-screen');
				}
				if($('#msMixPumpRight').hasClass('pull-screen')){
					$('#msMixPumpRight').removeClass('pull-screen');
				}
				$('.mode-control-simple [data-target="#msWashRight"]').toggleClass('disableForAutomaticRight');
				$('.mode-control-simple [data-target="#msMixPumpRight"]').toggleClass('disableForAutomaticRight');
				$('#msSyrupHeaterRight').css('z-index', 1);
				$('#msAutomaticRight').css('z-index', 2);
				
				if($('#msSyrupHeaterRight').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
					$('#msSyrupHeaterRight').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;  
			
		});
		
		//Click on button STANDBY
		$('.mode-control-simple [data-target="#msStandbyRight"]').click(function() {			
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msAutomaticRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msAutomaticRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msWashRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashRight"]').hasClass('disableForAutomaticRight')){
					$('.mode-control-simple [data-target="#msWashRight"]').toggleClass('disableForAutomaticRight');
				}
				if($('.mode-control-simple [data-target="#msMixPumpRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msMixPumpRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msMixPumpRight"]').hasClass('disableForAutomaticRight')){
					$('.mode-control-simple [data-target="#msMixPumpRight"]').toggleClass('disableForAutomaticRight');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msHeatCycleRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleRight"').hasClass('disable')){
					$('.mode-control-simple [data-target="#msHeatCycleRight"').removeClass('disable');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleRight"]').hasClass('disableForOffRight')){
					$('.mode-control-simple [data-target="#msHeatCycleRight"]').removeClass('disableForOffRight');
				}
				if($('.mode-control-simple [data-target="#msOffRight"').hasClass('disable')){
					$('.mode-control-simple [data-target="#msOffRight"').removeClass('disable');
				}
				if($('#msAutomaticRight').hasClass('pull-screen')){
					$('#msAutomaticRight').removeClass('pull-screen');
				}
				if($('#msWashRight').hasClass('pull-screen')){
					$('#msWashRight').removeClass('pull-screen');
				}
				if($('#msMixPumpRight').hasClass('pull-screen')){
					$('#msMixPumpRight').removeClass('pull-screen');
				}
				$('.mode-control-simple [data-target="#msWashRight"]').toggleClass('disableForStandbyRight');
				$('.mode-control-simple [data-target="#msMixPumpRight"]').toggleClass('disableForStandbyRight');
				$('#msSyrupHeaterRight').css('z-index', 1);
				$('#msStandbyRight').css('z-index', 2);
				
				if($('#msSyrupHeaterRight').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
					$('#msSyrupHeaterRight').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;
		
		});
		
		//Click on button WASH
		$('.mode-control-simple [data-target="#msWashRight"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msAutomaticRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msAutomaticRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msStandbyRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msStandbyRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msHeatCycleRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleRight"]').hasClass('disableForOffRight')){
					$('.mode-control-simple [data-target="#msHeatCycleRight"]').removeClass('disableForOffRight');
				}
				if($('#msAutomaticRight').hasClass('pull-screen')){
					$('#msAutomaticRight').removeClass('pull-screen');
				}
				if($('#msStandbyRight').hasClass('pull-screen')){
					$('#msStandbyRight').removeClass('pull-screen');
				}		
				
				$('.mode-control-simple [data-target="#msAutomaticRight"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msStandbyRight"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msHeatCycleRight"]').toggleClass('disable');
				$('#msSyrupHeaterRight').css('z-index', 1);
				$('#msMixPumpRight').css('z-index', 1);
				$('#msWashRight').css('z-index', 2);
							
				if($('.mode-control-simple [data-target="#msMixPumpRight"]').hasClass('active') && $('.mode-control-simple [data-target="#msSyrupHeaterRight"]').hasClass('active')){
					
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
					$('#msSyrupHeaterRight').css('z-index', 1);
					$('#msMixPumpBadgeRight').css('z-index', 3);
					$('#msMixPumpRight').css('z-index', 1);
				}	
				if($('#msSyrupHeaterRight').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
					$('#msSyrupHeaterRight').css('z-index', 1);
				}				
				if($('#msMixPumpRight').hasClass('pull-screen')){
					$('#msMixPumpBadgeRight').toggleClass('pull-screen');
					$('#msMixPumpBadgeRight').css('z-index', 3);
					$('#msMixPumpRight').css('z-index', 1);
				}
				
			} else {
				// second click				
			}
			++clicks;
		});
		
		//Click on button HEAT CYCLE
		$('.mode-control-simple [data-target="#msHeatCycleRight"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msAutomaticRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msAutomaticRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msStandbyRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msStandbyRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msWashRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msMixPumpRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msMixPumpRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msWashRight"]').hasClass('disableForAutomaticRight')){
					$('.mode-control-simple [data-target="#msWashRight"]').removeClass('disableForAutomaticRight');
				}
				if($('.mode-control-simple [data-target="#msWashRight"]').hasClass('disableForStandbyLeft')){
					$('.mode-control-simple [data-target="#msWashRight"]').removeClass('disableForStandbyRight');
				}
				if($('.mode-control-simple [data-target="#msMixPumpRight"]').hasClass('disableForAutomaticRight')){
					$('.mode-control-simple [data-target="#msMixPumpRight"]').removeClass('disableForAutomaticRight');
				}
				if($('.mode-control-simple [data-target="#msMixPumpRight"]').hasClass('disableForStandbyRight')){
					$('.mode-control-simple [data-target="#msMixPumpRight"]').removeClass('disableForStandbyRight');
				}
				if($('.mode-control-simple [data-target="#msOffRight"').hasClass('disable')){
					$('.mode-control-simple [data-target="#msOffRight"').removeClass('disable');
				}
				if($('#msAutomaticRight').hasClass('pull-screen')){
					$('#msAutomaticRight').removeClass('pull-screen');
				}
				if($('#msStandbyRight').hasClass('pull-screen')){
					$('#msStandbyRight').removeClass('pull-screen');
				}
				if($('#msMixPumpRight').hasClass('pull-screen')){
					$('#msMixPumpRight').removeClass('pull-screen');
				}
				$('.mode-control-simple [data-target="#msAutomaticRight"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msStandbyRight"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msWashRight"]').toggleClass('disable');
				$('.mode-control-simple [data-target="#msMixPumpRight"]').toggleClass('disable');
				$('#msSyrupHeaterRight').css('z-index', 1);
				$('#msHeatCycleRight').css('z-index', 2);
								
				if($('#msSyrupHeaterRight').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
					$('#msSyrupHeaterRight').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button SYRUP HEATER
		$('.mode-control-simple [data-target="#msSyrupHeaterRight"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-simple [data-target="#msHeatCycleRight"]').hasClass('disableForOffRight')){
					$('.mode-control-simple [data-target="#msHeatCycleRight"]').removeClass('disableForOffRight');
				}
				$('#msSyrupHeaterRight').css('z-index', 3);
				
				if($('.mode-control-simple [data-target="#msAutomaticRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msStandbyRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msWashRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msHeatCycleRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msMixPumpRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msMixPumpRight"]').hasClass('active') && $('.mode-control-simple [data-target="#msWashRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 2);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button MIX PUMP
		$('.mode-control-simple [data-target="#msMixPumpRight"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click				
				if($('.mode-control-simple [data-target="#msAutomaticRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msAutomaticRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msStandbyRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msStandbyRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleRight"]').hasClass('active')){
					$('.mode-control-simple [data-target="#msHeatCycleRight"]').removeClass('active');
				}
				if($('.mode-control-simple [data-target="#msHeatCycleRight"]').hasClass('disableForOffRight')){
					$('.mode-control-simple [data-target="#msHeatCycleRight"]').removeClass('disableForOffRight');
				}				
				if($('#msStandbyRight').hasClass('pull-screen')){
					$('#msStandbyRight').removeClass('pull-screen');
				}
				$('#msWashRight').css('z-index', 1);
				$('#msSyrupHeaterRight').css('z-index', 1);
				$('#msMixPumpRight').css('z-index', 2);
				
				if($('.mode-control-simple [data-target="#msWashRight"]').hasClass('active')){
					$('#msMixPumpRight').css('z-index', 0);
					$('#msMixPumpBadgeRight').toggleClass('pull-screen');
					$('#msMixPumpBadgeRight').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msSyrupHeaterRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
				}
				if($('.mode-control-simple [data-target="#msSyrupHeaterRight"]').hasClass('active') && $('.mode-control-simple [data-target="#msWashRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 2);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button OFF
		$('.mode-control-simple [data-target="#msOffRight"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-controls-right .mode-control').hasClass('active')){
					$('.mode-controls-right .mode-control').removeClass('active');
				}
				if($('.mode-controls-right .mode-control').hasClass('disableForAutomaticRight')){
					$('.mode-controls-right .mode-control').removeClass('disableForAutomaticRight');
				}
				if($('.mode-controls-right .mode-control').hasClass('disableForStandbyRight')){
					$('.mode-controls-right .mode-control').removeClass('disableForStandbyRight');
				}
				if($('.mode-controls-right .mode-control').hasClass('disable')){
					$('.mode-controls-right .mode-control').removeClass('disable');
				}
				if($('.mode-screens-right .mode-screen').hasClass('pull-screen')){
					$('.mode-screens-right .mode-screen').removeClass('pull-screen');
				}
				$('.mode-control-simple [data-target="#msHeatCycleRight"]').addClass('disableForOffRight');
			} else {
				// second click
			}
			++clicks;
		});
		// END mode-control-simple
		
		
		
		
		
		
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// ADVANCED CONTROLS
		// MODE CONTROLS LEFT
		$(document).on('click', '.mode-control-advanced .mode-controls-left [data-toggle="class"]', function () {
			var $targetScreen = $($(this).data('target'));
			var classes = $(this).data('classes');
			$(this).toggleClass('active');
			$targetScreen.toggleClass(classes);			
		});	
		
		//Click on button AUTOMATIC
		$('.mode-control-advanced [data-target="#msAutomaticLeft"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msStandbyLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msStandbyLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashLeft"]').hasClass('disableForStandbyLeft')){
					$('.mode-control-advanced [data-target="#msWashLeft"]').toggleClass('disableForStandbyLeft');
				}
				if($('.mode-control-advanced [data-target="#msWashLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msWashLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpLeft"]').hasClass('disableForStandbyLeft')){
					$('.mode-control-advanced [data-target="#msMixPumpLeft"]').toggleClass('disableForStandbyLeft');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msMixPumpLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msHeatCycleLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleLeft"]').hasClass('disableForOffLeft')){
					$('.mode-control-advanced [data-target="#msHeatCycleLeft"]').removeClass('disableForOffLeft');
				}
				if($('.mode-control-advanced [data-target="#msOff"').hasClass('disable')){
					$('.mode-control-advanced [data-target="#msOff"').removeClass('disable');
				}
				if($('#msStandbyLeft').hasClass('pull-screen')){
					$('#msStandbyLeft').removeClass('pull-screen');
				}
				if($('#msWashLeft').hasClass('pull-screen')){
					$('#msWashLeft').removeClass('pull-screen');
				}
				if($('#msMixPumpLeft').hasClass('pull-screen')){
					$('#msMixPumpLeft').removeClass('pull-screen');
				}
				$('.mode-control-advanced [data-target="#msWashLeft"]').toggleClass('disableForAutomaticLeft');
				$('.mode-control-advanced [data-target="#msMixPumpLeft"]').toggleClass('disableForAutomaticLeft');
				$('#msSyrupHeaterLeft').css('z-index', 1);
				$('#msAutomaticLeft').css('z-index', 2);
				
				if($('#msSyrupHeaterLeft').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
					$('#msSyrupHeaterLeft').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;  
			
		});
		
		//Click on button STANDBY
		$('.mode-control-advanced [data-target="#msStandbyLeft"]').click(function() {			
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msAutomaticLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msAutomaticLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msWashLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashLeft"]').hasClass('disableForAutomaticLeft')){
					$('.mode-control-advanced [data-target="#msWashLeft"]').toggleClass('disableForAutomaticLeft');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msMixPumpLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpLeft"]').hasClass('disableForAutomaticLeft')){
					$('.mode-control-advanced [data-target="#msMixPumpLeft"]').toggleClass('disableForAutomaticLeft');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msHeatCycleLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleLeft"').hasClass('disable')){
					$('.mode-control-advanced [data-target="#msHeatCycleLeft"').removeClass('disable');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleLeft"]').hasClass('disableForOffLeft')){
					$('.mode-control-advanced [data-target="#msHeatCycleLeft"]').removeClass('disableForOffLeft');
				}
				if($('.mode-control-advanced [data-target="#msOffLeft"').hasClass('disable')){
					$('.mode-control-advanced [data-target="#msOffLeft"').removeClass('disable');
				}
				if($('#msAutomaticLeft').hasClass('pull-screen')){
					$('#msAutomaticLeft').removeClass('pull-screen');
				}
				if($('#msWashLeft').hasClass('pull-screen')){
					$('#msWashLeft').removeClass('pull-screen');
				}
				if($('#msMixPumpLeft').hasClass('pull-screen')){
					$('#msMixPumpLeft').removeClass('pull-screen');
				}
				$('.mode-control-advanced [data-target="#msWashLeft"]').toggleClass('disableForStandbyLeft');
				$('.mode-control-advanced [data-target="#msMixPumpLeft"]').toggleClass('disableForStandbyLeft');
				$('#msSyrupHeaterLeft').css('z-index', 1);
				$('#msStandbyLeft').css('z-index', 2);
				
				if($('#msSyrupHeaterLeft').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
					$('#msSyrupHeaterLeft').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;
		
		});
		
		//Click on button WASH
		$('.mode-control-advanced [data-target="#msWashLeft"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msAutomaticLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msAutomaticLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msStandbyLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msStandbyLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msHeatCycleLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleLeft"]').hasClass('disableForOffLeft')){
					$('.mode-control-advanced [data-target="#msHeatCycleLeft"]').removeClass('disableForOffLeft');
				}
				if($('#msAutomaticLeft').hasClass('pull-screen')){
					$('#msAutomaticLeft').removeClass('pull-screen');
				}
				if($('#msStandbyLeft').hasClass('pull-screen')){
					$('#msStandbyLeft').removeClass('pull-screen');
				}		
				
				$('.mode-control-advanced [data-target="#msAutomaticLeft"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msStandbyLeft"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msHeatCycleLeft"]').toggleClass('disable');
				$('#msSyrupHeaterLeft').css('z-index', 1);
				$('#msMixPumpLeft').css('z-index', 1);
				$('#msWashLeft').css('z-index', 2);
							
				if($('.mode-control-advanced [data-target="#msMixPumpLeft"]').hasClass('active') && $('.mode-control-advanced [data-target="#msSyrupHeaterLeft"]').hasClass('active')){
					
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
					$('#msSyrupHeaterLeft').css('z-index', 1);
					$('#msMixPumpBadgeLeft').css('z-index', 3);
					$('#msMixPumpLeft').css('z-index', 1);
				}	
				if($('#msSyrupHeaterLeft').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
					$('#msSyrupHeaterLeft').css('z-index', 1);
				}				
				if($('#msMixPumpLeft').hasClass('pull-screen')){
					$('#msMixPumpBadgeLeft').toggleClass('pull-screen');
					$('#msMixPumpBadgeLeft').css('z-index', 3);
					$('#msMixPumpLeft').css('z-index', 1);
				}
				
			} else {
				// second click				
			}
			++clicks;
		});
		
		//Click on button HEAT CYCLE
		$('.mode-control-advanced [data-target="#msHeatCycleLeft"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msAutomaticLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msAutomaticLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msStandbyLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msStandbyLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msWashLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msMixPumpLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashLeft"]').hasClass('disableForAutomaticLeft')){
					$('.mode-control-advanced [data-target="#msWashLeft"]').removeClass('disableForAutomaticLeft');
				}
				if($('.mode-control-advanced [data-target="#msWashLeft"]').hasClass('disableForStandbyLeft')){
					$('.mode-control-advanced [data-target="#msWashLeft"]').removeClass('disableForStandbyLeft');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpLeft"]').hasClass('disableForAutomaticLeft')){
					$('.mode-control-advanced [data-target="#msMixPumpLeft"]').removeClass('disableForAutomaticLeft');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpLeft"]').hasClass('disableForStandbyLeft')){
					$('.mode-control-advanced [data-target="#msMixPumpLeft"]').removeClass('disableForStandbyLeft');
				}
				if($('.mode-control-advanced [data-target="#msOffLeft"').hasClass('disable')){
					$('.mode-control-advanced [data-target="#msOffLeft"').removeClass('disable');
				}
				if($('#msAutomaticLeft').hasClass('pull-screen')){
					$('#msAutomaticLeft').removeClass('pull-screen');
				}
				if($('#msStandbyLeft').hasClass('pull-screen')){
					$('#msStandbyLeft').removeClass('pull-screen');
				}
				if($('#msMixPumpLeft').hasClass('pull-screen')){
					$('#msMixPumpLeft').removeClass('pull-screen');
				}
				$('.mode-control-advanced [data-target="#msAutomaticLeft"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msStandbyLeft"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msWashLeft"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msMixPumpLeft"]').toggleClass('disable');
				$('#msSyrupHeaterLeft').css('z-index', 1);
				$('#msHeatCycleLeft').css('z-index', 2);
								
				if($('#msSyrupHeaterLeft').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
					$('#msSyrupHeaterLeft').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button SYRUP HEATER
		$('.mode-control-advanced [data-target="#msSyrupHeaterLeft"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msHeatCycleLeft"]').hasClass('disableForOffLeft')){
					$('.mode-control-advanced [data-target="#msHeatCycleLeft"]').removeClass('disableForOffLeft');
				}
				$('#msSyrupHeaterLeft').css('z-index', 3);
				
				if($('.mode-control-advanced [data-target="#msAutomaticLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msStandbyLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msWashLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msMixPumpLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msMixPumpLeft"]').hasClass('active') && $('.mode-control-advanced [data-target="#msWashLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 2);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button MIX PUMP
		$('.mode-control-advanced [data-target="#msMixPumpLeft"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click				
				if($('.mode-control-advanced [data-target="#msAutomaticLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msAutomaticLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msStandbyLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msStandbyLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleLeft"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msHeatCycleLeft"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleLeft"]').hasClass('disableForOffLeft')){
					$('.mode-control-advanced [data-target="#msHeatCycleLeft"]').removeClass('disableForOffLeft');
				}				
				if($('#msStandbyLeft').hasClass('pull-screen')){
					$('#msStandbyLeft').removeClass('pull-screen');
				}
				$('#msWashLeft').css('z-index', 1);
				$('#msSyrupHeaterLeft').css('z-index', 1);
				$('#msMixPumpLeft').css('z-index', 2);
				
				if($('.mode-control-advanced [data-target="#msWashLeft"]').hasClass('active')){
					$('#msMixPumpLeft').css('z-index', 0);
					$('#msMixPumpBadgeLeft').toggleClass('pull-screen');
					$('#msMixPumpBadgeLeft').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msSyrupHeaterLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msSyrupHeaterLeft"]').hasClass('active') && $('.mode-control-advanced [data-target="#msWashLeft"]').hasClass('active')){
					$('#msSyrupHeaterLeft').css('z-index', 0);
					$('#msSyrupHeaterBadgeLeft').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeLeft').css('z-index', 2);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button OFF
		$('.mode-control-advanced [data-target="#msOffLeft"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced .mode-controls-left .mode-control').hasClass('active')){
					$('.mode-control-advanced .mode-control-advanced .mode-controls-left .mode-control').removeClass('active');
				}
				if($('.mode-control-advanced .mode-controls-left .mode-control').hasClass('disableForAutomaticLeft')){
					$('.mode-control-advanced .mode-controls-left .mode-control').removeClass('disableForAutomaticLeft');
				}
				if($('.mode-control-advanced .mode-controls-left .mode-control').hasClass('disableForStandbyLeft')){
					$('.mode-control-advanced .mode-controls-left .mode-control').removeClass('disableForStandbyLeft');
				}
				if($('.mode-control-advanced .mode-controls-left .mode-control').hasClass('disable')){
					$('.mode-control-advanced .mode-controls-left .mode-control').removeClass('disable');
				}
				if($('.mode-control-advanced .mode-screens-left .mode-screen').hasClass('pull-screen')){
					$('.mode-control-advanced .mode-screens-left .mode-screen').removeClass('pull-screen');
				}
				$('.mode-control-advanced [data-target="#msHeatCycleLeft"]').addClass('disableForOffLeft');
			} else {
				// second click
			}
			++clicks;
		});
		
		
		
		
		
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// ADVANCED CONTROLS
		// MODE CONTROLS RIGHT
		$(document).on('click', '.mode-control-advanced .mode-controls-right [data-toggle="class"]', function () {
			var $targetScreen = $($(this).data('target'));
			var classes = $(this).data('classes');
			$(this).toggleClass('active');
			$targetScreen.toggleClass(classes);			
		});	
		
		//Click on button AUTOMATIC
		$('.mode-control-advanced [data-target="#msAutomaticRight"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msStandbyRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msStandbyRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashRight"]').hasClass('disableForStandbyRight')){
					$('.mode-control-advanced [data-target="#msWashRight"]').toggleClass('disableForStandbyRight');
				}
				if($('.mode-control-advanced [data-target="#msWashRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msWashRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpRight"]').hasClass('disableForStandbyRight')){
					$('.mode-control-advanced [data-target="#msMixPumpRight"]').toggleClass('disableForStandbyRight');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msMixPumpRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msHeatCycleRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleRight"]').hasClass('disableForOffRight')){
					$('.mode-control-advanced [data-target="#msHeatCycleRight"]').removeClass('disableForOffRight');
				}
				if($('.mode-control-advanced [data-target="#msOff"').hasClass('disable')){
					$('.mode-control-advanced [data-target="#msOff"').removeClass('disable');
				}
				if($('#msStandbyRight').hasClass('pull-screen')){
					$('#msStandbyRight').removeClass('pull-screen');
				}
				if($('#msWashRight').hasClass('pull-screen')){
					$('#msWashRight').removeClass('pull-screen');
				}
				if($('#msMixPumpRight').hasClass('pull-screen')){
					$('#msMixPumpRight').removeClass('pull-screen');
				}
				$('.mode-control-advanced [data-target="#msWashRight"]').toggleClass('disableForAutomaticRight');
				$('.mode-control-advanced [data-target="#msMixPumpRight"]').toggleClass('disableForAutomaticRight');
				$('#msSyrupHeaterRight').css('z-index', 1);
				$('#msAutomaticRight').css('z-index', 2);
				
				if($('#msSyrupHeaterRight').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
					$('#msSyrupHeaterRight').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;  
			
		});
		
		//Click on button STANDBY
		$('.mode-control-advanced [data-target="#msStandbyRight"]').click(function() {			
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msAutomaticRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msAutomaticRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msWashRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashRight"]').hasClass('disableForAutomaticRight')){
					$('.mode-control-advanced [data-target="#msWashRight"]').toggleClass('disableForAutomaticRight');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msMixPumpRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpRight"]').hasClass('disableForAutomaticRight')){
					$('.mode-control-advanced [data-target="#msMixPumpRight"]').toggleClass('disableForAutomaticRight');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msHeatCycleRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleRight"').hasClass('disable')){
					$('.mode-control-advanced [data-target="#msHeatCycleRight"').removeClass('disable');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleRight"]').hasClass('disableForOffRight')){
					$('.mode-control-advanced [data-target="#msHeatCycleRight"]').removeClass('disableForOffRight');
				}
				if($('.mode-control-advanced [data-target="#msOffRight"').hasClass('disable')){
					$('.mode-control-advanced [data-target="#msOffRight"').removeClass('disable');
				}
				if($('#msAutomaticRight').hasClass('pull-screen')){
					$('#msAutomaticRight').removeClass('pull-screen');
				}
				if($('#msWashRight').hasClass('pull-screen')){
					$('#msWashRight').removeClass('pull-screen');
				}
				if($('#msMixPumpRight').hasClass('pull-screen')){
					$('#msMixPumpRight').removeClass('pull-screen');
				}
				$('.mode-control-advanced [data-target="#msWashRight"]').toggleClass('disableForStandbyRight');
				$('.mode-control-advanced [data-target="#msMixPumpRight"]').toggleClass('disableForStandbyRight');
				$('#msSyrupHeaterRight').css('z-index', 1);
				$('#msStandbyRight').css('z-index', 2);
				
				if($('#msSyrupHeaterRight').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
					$('#msSyrupHeaterRight').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;
		
		});
		
		//Click on button WASH
		$('.mode-control-advanced [data-target="#msWashRight"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msAutomaticRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msAutomaticRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msStandbyRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msStandbyRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msHeatCycleRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleRight"]').hasClass('disableForOffRight')){
					$('.mode-control-advanced [data-target="#msHeatCycleRight"]').removeClass('disableForOffRight');
				}
				if($('#msAutomaticRight').hasClass('pull-screen')){
					$('#msAutomaticRight').removeClass('pull-screen');
				}
				if($('#msStandbyRight').hasClass('pull-screen')){
					$('#msStandbyRight').removeClass('pull-screen');
				}		
				
				$('.mode-control-advanced [data-target="#msAutomaticRight"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msStandbyRight"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msHeatCycleRight"]').toggleClass('disable');
				$('#msSyrupHeaterRight').css('z-index', 1);
				$('#msMixPumpRight').css('z-index', 1);
				$('#msWashRight').css('z-index', 2);
							
				if($('.mode-control-advanced [data-target="#msMixPumpRight"]').hasClass('active') && $('.mode-control-advanced [data-target="#msSyrupHeaterRight"]').hasClass('active')){
					
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
					$('#msSyrupHeaterRight').css('z-index', 1);
					$('#msMixPumpBadgeRight').css('z-index', 3);
					$('#msMixPumpRight').css('z-index', 1);
				}	
				if($('#msSyrupHeaterRight').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
					$('#msSyrupHeaterRight').css('z-index', 1);
				}				
				if($('#msMixPumpRight').hasClass('pull-screen')){
					$('#msMixPumpBadgeRight').toggleClass('pull-screen');
					$('#msMixPumpBadgeRight').css('z-index', 3);
					$('#msMixPumpRight').css('z-index', 1);
				}
				
			} else {
				// second click				
			}
			++clicks;
		});
		
		//Click on button HEAT CYCLE
		$('.mode-control-advanced [data-target="#msHeatCycleRight"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msAutomaticRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msAutomaticRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msStandbyRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msStandbyRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msWashRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msMixPumpRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msWashRight"]').hasClass('disableForAutomaticRight')){
					$('.mode-control-advanced [data-target="#msWashRight"]').removeClass('disableForAutomaticRight');
				}
				if($('.mode-control-advanced [data-target="#msWashRight"]').hasClass('disableForStandbyRight')){
					$('.mode-control-advanced [data-target="#msWashRight"]').removeClass('disableForStandbyRight');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpRight"]').hasClass('disableForAutomaticRight')){
					$('.mode-control-advanced [data-target="#msMixPumpRight"]').removeClass('disableForAutomaticRight');
				}
				if($('.mode-control-advanced [data-target="#msMixPumpRight"]').hasClass('disableForStandbyRight')){
					$('.mode-control-advanced [data-target="#msMixPumpRight"]').removeClass('disableForStandbyRight');
				}
				if($('.mode-control-advanced [data-target="#msOffRight"').hasClass('disable')){
					$('.mode-control-advanced [data-target="#msOffRight"').removeClass('disable');
				}
				if($('#msAutomaticRight').hasClass('pull-screen')){
					$('#msAutomaticRight').removeClass('pull-screen');
				}
				if($('#msStandbyRight').hasClass('pull-screen')){
					$('#msStandbyRight').removeClass('pull-screen');
				}
				if($('#msMixPumpRight').hasClass('pull-screen')){
					$('#msMixPumpRight').removeClass('pull-screen');
				}
				$('.mode-control-advanced [data-target="#msAutomaticRight"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msStandbyRight"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msWashRight"]').toggleClass('disable');
				$('.mode-control-advanced [data-target="#msMixPumpRight"]').toggleClass('disable');
				$('#msSyrupHeaterRight').css('z-index', 1);
				$('#msHeatCycleRight').css('z-index', 2);
								
				if($('#msSyrupHeaterRight').hasClass('pull-screen')){
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
					$('#msSyrupHeaterRight').css('z-index', 1);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button SYRUP HEATER
		$('.mode-control-advanced [data-target="#msSyrupHeaterRight"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-control-advanced [data-target="#msHeatCycleRight"]').hasClass('disableForOffRight')){
					$('.mode-control-advanced [data-target="#msHeatCycleRight"]').removeClass('disableForOffRight');
				}
				$('#msSyrupHeaterRight').css('z-index', 3);
				
				if($('.mode-control-advanced [data-target="#msAutomaticRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msStandbyRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msWashRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msMixPumpRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msMixPumpRight"]').hasClass('active') && $('.mode-control-advanced [data-target="#msWashRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 2);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button MIX PUMP
		$('.mode-control-advanced [data-target="#msMixPumpRight"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click				
				if($('.mode-control-advanced [data-target="#msAutomaticRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msAutomaticRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msStandbyRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msStandbyRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleRight"]').hasClass('active')){
					$('.mode-control-advanced [data-target="#msHeatCycleRight"]').removeClass('active');
				}
				if($('.mode-control-advanced [data-target="#msHeatCycleRight"]').hasClass('disableForOffRight')){
					$('.mode-control-advanced [data-target="#msHeatCycleRight"]').removeClass('disableForOffRight');
				}				
				if($('#msStandbyRight').hasClass('pull-screen')){
					$('#msStandbyRight').removeClass('pull-screen');
				}
				$('#msWashRight').css('z-index', 1);
				$('#msSyrupHeaterRight').css('z-index', 1);
				$('#msMixPumpRight').css('z-index', 2);
				
				if($('.mode-control-advanced [data-target="#msWashRight"]').hasClass('active')){
					$('#msMixPumpRight').css('z-index', 0);
					$('#msMixPumpBadgeRight').toggleClass('pull-screen');
					$('#msMixPumpBadgeRight').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msSyrupHeaterRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 3);
				}
				if($('.mode-control-advanced [data-target="#msSyrupHeaterRight"]').hasClass('active') && $('.mode-control-advanced [data-target="#msWashRight"]').hasClass('active')){
					$('#msSyrupHeaterRight').css('z-index', 0);
					$('#msSyrupHeaterBadgeRight').toggleClass('pull-screen');
					$('#msSyrupHeaterBadgeRight').css('z-index', 2);
				}
			} else {
				// second click
			}
			++clicks;
		});
		
		//Click on button OFF
		$('.mode-control-advanced [data-target="#msOffRight"]').click(function() {
			var clicks = 0;
			if (clicks == 0){
				// first click
				if($('.mode-controls-right .mode-control').hasClass('active')){
					$('.mode-controls-right .mode-control').removeClass('active');
				}
				if($('.mode-controls-right .mode-control').hasClass('disableForAutomaticRight')){
					$('.mode-controls-right .mode-control').removeClass('disableForAutomaticRight');
				}
				if($('.mode-controls-right .mode-control').hasClass('disableForStandbyRight')){
					$('.mode-controls-right .mode-control').removeClass('disableForStandbyRight');
				}
				if($('.mode-controls-right .mode-control').hasClass('disable')){
					$('.mode-controls-right .mode-control').removeClass('disable');
				}
				if($('.mode-screens-right .mode-screen').hasClass('pull-screen')){
					$('.mode-screens-right .mode-screen').removeClass('pull-screen');
				}
				$('.mode-control-advanced [data-target="#msHeatCycleRight"]').addClass('disableForOffRight');
			} else {
				// second click
			}
			++clicks;
		});
		// END mode-control-advanced
	
	
	}// END if( $('.mode-screens-outer-wrapper').length > 0 ){
	
	
});//End All	