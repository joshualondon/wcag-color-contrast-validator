/**
*	Original Copyright:	2008 SSB BART Group
*	Origianl Author: 	Jonathan David Avila | jon.avila@ssbbartgroup.com
*	Source URL:			https://www.ssbbartgroup.com/reference/index.php/Color_Contrast_Checker
*
*	Initial Update:		2014/11/06
*	Author:				Josh London | josh@joshualondon.me
*	Initial changes:
*						* Code formatting
*						* jQuery introduction
*						* naming
*
*	todo				* adjust naming so not to be confused with standard naming conventions
*/

$(document).ready(function() {
	
	/**
	* Actions/triggers
	*/
	$('#reset').click(function() {
		resetAll();
	});
	
	$('#run-contrastor').click(function() {
		runContrastor();
	});

	/**
	*	Error checking on inputs
	*	Throw error if user moves away from input
	*	Remove error when user enters 6 characters using keyup
	*/
	$('#background-color').on('blur', function() { // Check on blur
		if ($(this).val().length !== 6) {
			$('#background-color').addClass('error');
			$('#run-contrastor').attr('disabled', 'disabled');
			$('#bg-color-alert').removeClass('is-hidden');
			$(this).focus();
		} else {
			$('#background-color').removeClass('error');
			$('#run-contrastor').removeAttr('disabled', 'disabled');
			$('#bg-color-alert').addClass('is-hidden');
		}
	});
	
	$('#background-color').on('keyup', function() { // Check keyups assuming error
		if ($(this).val().length === 6) {
			$('#background-color').removeClass('error');
			$('#run-contrastor').removeAttr('disabled', 'disabled');
			$('#bg-color-alert').addClass('is-hidden');
		} else {
			$('#run-contrastor').html('Check');
			$('#run-contrastor').removeClass('pass fail');
			$('#run-contrastor').attr('disabled', 'disabled');
		}
	});
	
	$('#foreground-color').on('blur', function() { // Check on blur
		if ($(this).val().length !== 6) {
			$('#foreground-color').addClass('error');
			$('#run-contrastor').attr('disabled', 'disabled');
			$('#fg-color-alert').removeClass('is-hidden');
			$(this).focus();
		} else {
			$('#foreground-color').removeClass('error');
			$('#run-contrastor').removeAttr('disabled', 'disabled');
			$('#fg-color-alert').addClass('is-hidden');
		}
	});
	
	$('#foreground-color').on('keyup', function() { // Check keyups assuming error
		if ($(this).val().length === 6) {
			$('#foreground-color').removeClass('error');
			$('#run-contrastor').removeAttr('disabled', 'disabled');
			$('#fg-color-alert').addClass('is-hidden');
		} else {
			$('#run-contrastor').html('Check');
			$('#run-contrastor').removeClass('pass fail');
			$('#run-contrastor').attr('disabled', 'disabled');
		}
	});
	
	function buttonFunctional() {
		$('#run-contrastor').html('Check');
		$('#run-contrastor').removeClass('pass fail');
		$('#run-contrastor').removeAttr('disabled', 'disabled');
	}
	
	function buttonDisabled() {
		$('#run-contrastor').attr('disabled', 'disabled');
	}
	
	$('#font-size').on('change', function() {
		buttonFunctional();
	});
	
	/**
	*	Reset entirely
	*/
	function resetAll() {
		$('#background-color').val('000000');
		$('#foreground-color').val('ffffff');
		$('#results').css({
			'background-color': '#191919',
			'color': '#ffffff'
		});
		$('#run-contrastor').removeClass('pass');
		$('#run-contrastor').removeClass('fail');
		$('#run-contrastor').html('Check');
		$('#run-contrastor').removeClass('disabled');
		
		$('#level-aaa-compliant').removeClass('active');
		$('#level-aa-compliant').removeClass('active');
		$('#level-not-compliant').removeClass('active');
		
		$('#main-ratio').html('0.0');
		$('#base-ratio').html('1');
		
		$('#contrast-meter').removeClass('fail pass');
		$('#contrast-meter-value').css('width', '0');
	}

});

/**
*	Run the contrast
*/
function runContrastor() {
	
	var l1; // higher value
	var l2; // lower value
	var l1R, l1G, l1B, l2R, l2G, l2B;
	
	/**
	* Set results background and foreground colors
	*/
	var foregroundColor = $('#foreground-color').val();
	var backgroundColor = $('#background-color').val();
	
	/**
	* Weird, can't use foregroudColor as variable and get it to render
	*/
	document.getElementById('results').style.color = "#" + foregroundColor;
	document.getElementById('results').style.backgroundColor = "#" + backgroundColor;

/** All the maths (original author) */
	//Linearised R (for example) = (R/FS)^2.2 where FS is full scale value (255
	//for 8 bit color channels). L1 is the higher value (of text or background)
	//alert(parseInt("0x"+color1.substr(0,2)));
	//Math.pow(n,x);
	l1R = parseInt("0x"+foregroundColor.substr(0,2))/255;
		if (l1R <= 0.03928) {
			l1R = l1R/12.92;
		} else {
			l1R = Math.pow(((l1R+0.055)/1.055),2.4);
		}
		
	l1G = parseInt("0x"+foregroundColor.substr(2,2))/255;
		if (l1G <= 0.03928) {
			l1G = l1G/12.92;
		} else {
			l1G = Math.pow(((l1G+0.055)/1.055),2.4);
		}
		
	l1B = parseInt("0x"+foregroundColor.substr(4,2))/255;
		if (l1B <= 0.03928) {
			l1B = l1B/12.92;
		} else {
			l1B = Math.pow(((l1B+0.055)/1.055),2.4);
		}

	l2R = parseInt("0x"+backgroundColor.substr(0,2))/255;
		if (l2R <= 0.03928) {
			l2R = l2R/12.92;
		} else {
			l2R = Math.pow(((l2R+0.055)/1.055),2.4);
		}

	l2G = parseInt("0x"+backgroundColor.substr(2,2))/255;
		if (l2G <= 0.03928) {
			l2G = l2G/12.92;
		} else {
			l2G = Math.pow(((l2G+0.055)/1.055),2.4);
		}

	l2B = parseInt("0x"+backgroundColor.substr(4,2))/255;
		if (l2B <= 0.03928) {
			l2B = l2B/12.92;
		} else {
			l2B = Math.pow(((l2B+0.055)/1.055),2.4);
		}

	//where L is luminosity and is defined as
	l1 = (.2126*l1R) + (.7152*l1G) + (.0722*l1B); //using linearised R, G, and B value
	l2 = (.2126*l2R) + (.7152*l2G) + (.0722*l2B); //using linearised R, G, and B value
	
	//and L2 is the lower value.
	l1 = l1 + .05;
	l2 = l2 + .05;
	
	if (l1 < l2) {
		temp = l1;
		l1 = l2;
		l2 = temp;
	}
	
	l1 = l1/l2;
	l1 = l1.toFixed(1);
/** end maths */

	
	/**
	*	Display the contrast ratio
	*/
	$('#main-ratio').text(l1.toString());
	$('#base-ratio').text('1');
	
	/**
	*	Text size indicator
	*/
	var textSize = $('#font-size').val();
	
	if (textSize == 1) {
		$('#text-size-small').addClass('active');
		$('#text-size-large').removeClass('active');
	} else {
		$('#text-size-small').removeClass('active');
		$('#text-size-large').addClass('active');
	}
	
	/**
	*	Contrast Meter
	*/
	var contrastMeter = l1.toString().split('.').join('');	
	$('#contrast-meter-value').css('width', contrastMeter);

	/**
	*	Display compliance message
	*/
	function aaaCompliance() {
		// Messages
		$('#level-aaa-compliant').addClass('active');
		$('#level-aa-compliant').removeClass('active');
		$('#level-not-compliant').removeClass('active');
		
		// Button
		$('#contrast-meter').addClass('pass');
		$('#run-contrastor').html('Passed');
		
		// Meters & such
		$('#run-contrastor').addClass('pass');
		$('#contrast-meter').removeClass('fail');
		
	}
	
	function aaCompliance() {
		// Messages
		$('#level-aaa-compliant').removeClass('active');
		$('#level-aa-compliant').addClass('active');
		$('#level-not-compliant').removeClass('active');
		
		// Button
		$('#contrast-meter').addClass('pass');
		$('#run-contrastor').html('Passed');
		
		// Meters & such
		$('#run-contrastor').addClass('pass');
		$('#contrast-meter').removeClass('fail');
	}
	
	function noCompliance() {
		// Messages
		$('#level-aaa-compliant').removeClass('active');
		$('#level-aa-compliant').removeClass('active');
		$('#level-not-compliant').addClass('active');
		
		// Button
		$('#contrast-meter').removeClass('pass');
		$('#run-contrastor').addClass('fail');
		$('#run-contrastor').html('Failed');
		
		// Meters & such
		$('#run-contrastor').removeClass('pass');
		$('#contrast-meter').addClass('fail');
	}
	
	if (l1 >= 7) {
		aaaCompliance();
		
	} else if (l1 >= 4.5) {
		aaCompliance();
		
	} else if (l1 >=3) {
		if (textSize == 1) {
			aaaCompliance();
		} else {
			noCompliance();
		}
	} else {
	     noCompliance();
	}
	
	/**
	*	Scroll to the top of the screen for mobile
	*	The keyboard (especially iOS) pulls the screen down
	*	Move the screen back to the top to view the results
	*	Todo: make it smoother
	*/
	if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {           
		window.scrollTo(0,0);
    }
} 
