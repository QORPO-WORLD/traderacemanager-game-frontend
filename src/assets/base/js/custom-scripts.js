//$(function(){

	/*---------------------------------------------------------------------------------------------
		Toggle class "show-menu" in header.main-menu to animate hamburger icon
	---------------------------------------------------------------------------------------------*/
	function fnHeaderMainMenuRight(){
		$('.right-menu-toggler').click(function() {
			$('body').toggleClass('show-right-menu');
		});
	}
	function fnHeaderMainMenuLeft(){
		$('.navbar-left .menu-toggler').click(function() {
			$('body').toggleClass('show-left-menu');
		});
	}


	/*---------------------------------------------------------------------------------------------
		Launch form search above placed above header
	---------------------------------------------------------------------------------------------*/
	if( $('.main-header-search-form-container').length > 0 ){
		$('.page-blue-header .btn-header-search-toggler').click(function() {
			$('body').toggleClass('pull-header-search-form');
		});
	}
	//Close search form
	$(document).on('click', '.page-blue-header .main-header-search-form-container .close', function() {
		if($('.page-blue-header').hasClass('pull-header-search-form')){
			$('.page-blue-header').removeClass('pull-header-search-form')
		}
		$('.page-blue-header').removeClass('pull-header-search-form');
	});


	/*---------------------------------------------------------------------------------------------
		See page s4-EOA-setup.html where this function is used
	---------------------------------------------------------------------------------------------*/
	function fnSwitchLandingScreens(){
		if( $('.page-landing-screens').length > 0 ){
			setTimeout(function(){
				$('#screenContainerOne').addClass('pull-screen');
				$('#btnSettings').addClass('show');
			},500);
			$('#screenToggler').click(function() {
				$('#screenContainerOne').toggleClass('pull-screen');
				$('#btnSettings').toggleClass('show');
				$('#screenContainerTwo').toggleClass('pull-screen');
				$('#btnAdd').toggleClass('show');
				$(this).toggleClass('active');
			});
		}
	}

	// animate screen on page load, see s4-EOA-setup.html for usage
	if( $('.animate-on-load').length > 0 ){
		setTimeout(function(){
			$('.animate-on-load').addClass('pull-screen');
		},500);
	}

	/*---------------------------------------------------------------------------------------------
		animate <li> fade up one at a time
		- see page s6-app-landing.html
	---------------------------------------------------------------------------------------------*/
	$('.ul-animate-li-fadeup li').each(function(i){
		var row = $(this);
		setTimeout(function() {
			row.addClass('fadeup');
		}, 1000*i);
	});


	/*---------------------------------------------------------------------------------------------
		Animate form-group's border-bottom on active
	---------------------------------------------------------------------------------------------*/
	function fnFormFormGroupFocus(){
		$('.form-group').click(function(event) {
			if($('.form-group').hasClass('active')){
				$('.form-group').removeClass('active');
			}
			$(this).toggleClass('active');
		});
	}// End fnFormAnimateBorderBottom()


	/*---------------------------------------------------------------------------------------------
		INITIATE custom select boxes
		- https://select2.org/
		- https://gromo.github.io/jquery.scrollbar/demo/basic.html for custom scrollbar inside custom select
	---------------------------------------------------------------------------------------------*/
	function fnInitiateCustomSelectBoxes(){
		if( $('select').length > 0 ){
			$('select').select2({
				//hide search box
				minimumResultsForSearch: Infinity
			});
			//add custom scrollbar
			$('select').on('select2:open', function(e){
				$('.select2-results__options').scrollbar().parent().addClass('scrollbar-inner');
			});
		}
	}// End fnInitiateCustomSelectBoxes


	/*---------------------------------------------------------------------------------------------
		Animate form-group's border-bottom on active
	---------------------------------------------------------------------------------------------*/
	//page s9-store-page-1.html
	//Add "active" class to div.boxed-radio on radio button click for more on-click custom style
	$(document).on('click', '.boxed-radio .styled-radio', function() {
		$(this).parent().addClass('active');
	});


	/*---------------------------------------------------------------------------------------------
		Add class "active-card" to style accordion card
	---------------------------------------------------------------------------------------------*/
	$(document).on('click', '.collapsible-dropdown', function() {
		if($('.collapsible-dropdown').hasClass('active')){
			$('.collapsible-dropdown').removeClass('active')
		}
		$('.collapse').collapse('hide');
		$(this).addClass('active');
	});


	/*---------------------------------------------------------------------------------------------
		Add class "show" to .form-row-different-billing-address.animate-height
		- see page s9-store-page-2.html
	---------------------------------------------------------------------------------------------*/
	$('#differentBillingAddress').click(function() {
        if ($(this).is(':checked')) {
			$('.form-row-different-billing-address').removeClass('show');
		} else {
			$('.form-row-different-billing-address').addClass('show');
		}
	});


	/*---------------------------------------------------------------------------------------------
		toggle show search form
	---------------------------------------------------------------------------------------------*/
	$(document).on('click', '.page-blue-header .main-header-search-form-container .close', function() {
		if($('.page-blue-header').hasClass('pull-header-search-form')){
			$('.page-blue-header').removeClass('pull-header-search-form')
		}
		$('.page-blue-header').removeClass('pull-header-search-form');
	});


	/*---------------------------------------------------------------------------------------------
		Add class "active-card" to style accordion card
	---------------------------------------------------------------------------------------------*/
	$(document).on('click', '.accordion .card-header', function() {
		if($('.accordion .card').hasClass('active-card')){
			$('.accordion .card').removeClass('active-card')
		}
		$(this).parent().addClass('active-card');
	});


	/*---------------------------------------------------------------------------------------------
		Update profile pic as seen on Settings Page
		ref --> https://codepen.io/mobifreaks/pen/LIbca
	---------------------------------------------------------------------------------------------*/
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$('#myProfilePic')
				.attr('src', e.target.result);
			};
			reader.readAsDataURL(input.files[0]);
		}
	}

	/*---------------------------------------------------------------------------------------------
		IF click outside actions
	---------------------------------------------------------------------------------------------*/
	$(document).on('click', function(e) {
		var container1 = $('.navbar-left .menu-toggler');
		var container2 = $('.right-menu-toggler');
		var container3 = $('.form-group');
		if (!container1.is(e.target) && container1.has(e.target).length === 0) {
			$('body').removeClass('show-left-menu');
		}
		if (!container2.is(e.target) && container2.has(e.target).length === 0) {
			$('body').removeClass('show-right-menu');
		}
		if (!container3.is(e.target) && container3.has(e.target).length === 0) {
			$('.form-group').removeClass('active');
		}
	});


	/*---------------------------------------------------------------------------------------------
		Adjust CSS if window is resized
	---------------------------------------------------------------------------------------------*/
	function updatePage() {

		var $windowWidth = $(window).width();
		var $windowHeight = $(window).height();

		if( $('.page-blue-header .nav-link-label').length > 0 ){
			if ( $windowWidth > 1199 ) {
				$('.page-blue-header .main-header .show-after-content').on('mouseover', function() {
					var navLinkLabel = $(this).find('.nav-link-label').text();
					$(this).attr('nav-link-label', navLinkLabel);
				});
			}
		}

		if( $('.page-blue-header .fixed-banner-block').length > 0 ){
			if ( $windowWidth < 992 ) {
				setTimeout(function(){
					$('.fixed-banner-block').addClass('pull-up');
				},500);
			}
		}

		//$('body').css('min-height', $windowHeight);
		if( $('main').length > 0 ){
			$('main').css('min-height', $windowHeight);
		}
	}

	updatePage();

	var resizeTimer;
	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(updatePage, 100);
	});


	/*---------------------------------------------------------------------------------------------
		Run functions
	---------------------------------------------------------------------------------------------*/
	fnHeaderMainMenuRight();
	fnHeaderMainMenuLeft();
	fnFormFormGroupFocus();
	fnInitiateCustomSelectBoxes();
	fnSwitchLandingScreens();

//});//End All
