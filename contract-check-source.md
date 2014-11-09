<!--
*
* This page is the contrast checker.
*
* @copyright	2008 SSB BART Group
* @author 		Jonathan David Avila <jon.avila@ssbbartgroup.com>
-->
<html>
<head>
<nowiki>
<script type="text/javascript">
function check()
{
var color1, color2;
var l1; // higher value
var l2; // lower value
var contrast;
var l1R, l1G, l1B, l2R, l2G, l2B;
var txtSizeOp;



color1 = document.getElementById('fg').value;
color2 = document.getElementById('bg').value;
txtSizeOp = document.getElementById('fontSize').selectedIndex;

	// error check, check if pound sign was put in field value
	if (color2.indexOf('#') == 0)
	{
		color2 = color2.substr(1, color2.length-1);
	}
	if (color1.indexOf('#') == 0)
	{
	color1 = color1.substr(1, color1.length-1);
	}
	// error checking
	if ((color1.length != 6) || (color2.length != 6))
	{/*
			var removednode=document.getElementById('error').removeChild(document.getElementById('errTxt'))
			var objNew = document.createElement('span');
			objNew.setAttribute('id', 'errTxt');
			var errTxt = document.createTextNode("Error: ");
			objNew.appendChild(errTxt);
			document.getElementById('error').insertBefore(objNew,document.getElementById('error').firstChild);
 		*/

		if (document.all){
			document.getElementById('errTxt').innerText = "Error: ";
		}
		else{
			document.getElementById('errTxt').textContent = "Error: ";
		}

		document.getElementById('error').style.display = "block";
	  	document.getElementById('error').tabIndex = -1;
	  	document.getElementById('error').focus();
	  	return;
	}else {	/*
			var removednode=document.getElementById('error').removeChild(document.getElementById('errTxt'))
			var objNew = document.createElement('span');
			objNew.setAttribute('id', 'errTxt');
			var errTxt = document.createTextNode("");
			objNew.appendChild(errTxt);
			document.getElementById('error').insertBefore(objNew,document.getElementById('error').firstChild);
			*/

		if (document.all){
			document.getElementById('errTxt').innerText = "";
		}
		else{
			document.getElementById('errTxt').textContent = "";
		}
			// clear error
			document.getElementById('error').style.display = "none";
	}

//Linearised R (for example) = (R/FS)^2.2 where FS is full scale value (255
//for 8 bit color channels). L1 is the higher value (of text or background)
//alert(parseInt("0x"+color1.substr(0,2)));
//Math.pow(n,x);
l1R = parseInt("0x"+color1.substr(0,2))/255;
if (l1R <= 0.03928)
{
	l1R = l1R/12.92;
}
else
{
	l1R = Math.pow(((l1R+0.055)/1.055),2.4);
}
l1G = parseInt("0x"+color1.substr(2,2))/255;
if (l1G <= 0.03928)
{
	l1G = l1G/12.92;
}
else
{
	l1G = Math.pow(((l1G+0.055)/1.055),2.4);
}
l1B = parseInt("0x"+color1.substr(4,2))/255;
if (l1B <= 0.03928)
{
	l1B = l1B/12.92;
}
else
{
	l1B = Math.pow(((l1B+0.055)/1.055),2.4);
}
l2R = parseInt("0x"+color2.substr(0,2))/255;
if (l2R <= 0.03928)
{
	l2R = l2R/12.92;
}
else
{
	l2R = Math.pow(((l2R+0.055)/1.055),2.4);
}
l2G = parseInt("0x"+color2.substr(2,2))/255;
if (l2G <= 0.03928)
{
	l2G = l2G/12.92;
}
else
{
	l2G = Math.pow(((l2G+0.055)/1.055),2.4);
}
l2B = parseInt("0x"+color2.substr(4,2))/255;
if (l2B <= 0.03928)
{
	l2B = l2B/12.92;
}
else
{
	l2B = Math.pow(((l2B+0.055)/1.055),2.4);
}
//where L is luminosity and is defined as
l1 = (.2126*l1R) + (.7152*l1G) + (.0722*l1B); //using linearised R, G, and B value
l2 = (.2126*l2R) + (.7152*l2G) + (.0722*l2B); //using linearised R, G, and B value
//and L2 is the lower value.
l1 = l1 + .05;
l2 = l2 + .05;
if (l1 < l2)
{
  temp = l1;
  l1 = l2;
  l2 = temp;
}
l1 = l1/l2;
l1 = l1.toFixed(1);
document.getElementById('contrast1').value = l1.toString();
document.getElementById('contrast2').value = 1;
document.getElementById('sample').style.color = "#"+ color1;
document.getElementById('sample').style.backgroundColor = "#"+color2;
document.getElementById('sample').style.borderColor = "#" + color1;
document.getElementById('sample').style.borderWidth = "thin";
document.getElementById('sample').style.borderStyle = "solid";
if (txtSizeOp == 1){
	document.getElementById('sample').style.fontSize = "18pt";
	}
else{
	document.getElementById('sample').style.fontSize = "12pt";
	document.getElementById('sample').style.fontWeight = "normal";
	}

if (l1 >= 7)
{
	text = "Section 508 (1194.31 - Functional performance) and WCAG 2 - Level AAA Compliant";
}
else if (l1 >= 4.5) {
	text = "Section 508 (1194.31 - Functional performance) and WCAG 2 - Level AA Compliant";
}
else if (l1 >=3) {
 if (txtSizeOp == 1) {
   text = "Section 508 (1194.31 - Functional performance) and WCAG 2 - Level AA Compliant";
 }
 else {
   text = "Not compliant. Note: there are not any contrast requirements in WCAG 2 - Level A or Section 508 - Section 1194.22 Web Sites and Application. Thus, content may meet these requirements independent of the color palette used.";
 }
}
else
{
     text = "Not compliant. Note: there are not any contrast requirements in WCAG 2 - Level A or Section 508 - Section 1194.22 Web Sites and Application. Thus, content may meet these requirements independent of the color palette used.";

}

if (document.all)
{
	document.getElementById('compliance').innerText = text;
}
else
{
	document.getElementById('compliance').textContent = text;
}

//return contrast;
} // function def
</script>
</nowiki>
</head>
<body>
<p>The algorithm used in this tool and subsequent results are based on the luminosity algorithm recommended in the WCAG 2.0 guidelines to test for contrast.  This tool is for general assessment purposes only and not a guarantee of compliance.</p>
<h3><div id="error" class="error"><span id="errTxt"></span>Please enter a RGB foreground and background color pair in the hexadecimal six character format</div></h3>
<!--<fieldset>-->
<h2>Background</h2>
<label for="bg"><span class="sr">Background - </span>RGB: #</label><input id="bg" type="text" value="FFFFFF" />
<!-- </fieldset> -->
<!--<fieldset>-->
<h2>Foreground</h2>
<label for="fg"><span class="sr">Foreground - </span>RGB: #</label><input id="fg" type="text" value="000000" />

<label for="fontSize">Text Size:</label>
<select id="fontSize" value="1">
	<option> Less than 18 points</option>
	<option>18 Points or larger or 14 points and bold </option>
</select>
<input id="check" onclick="check();" accessKey="c" value="Check" type="submit" />
<!-- </fieldset> -->
<div style="margin-top:.1em; width:100%;">
  <div style="float:left; width:50%;">
    <h2 style="vertical-align:top;">Sample</h2>
    <div style="width:70%;" id="sample"> This is Sample Text </div>
  </div>
  <div style="float:right; width:49%;"> <!-- right -->
    <h2>Contrast Ratio</h2>
    <div>
    <input title="contrast ratio" style="width:3em;" id="contrast1" type=text maxlength=5 /> :
    <input title="to" style="width:1em;" id="contrast2" type=text maxlength=5 />
    </div>
  </div>  <!-- end right -->
</div> <!-- 100% -->
<div style="padding-top:.1em; clear:both;">
<h2>Compliance Level</h2>
<div id="compliance">N/A</div>
<h2>Note</h2>
The compliance rate shown above is the highest compliance rate met. The WCAG 2.0 level AA and proposed Section 508 refresh compliance level is based on achieving a contrast ratio of 3:1 for text with a size of 18 points (14 points if bolded) or larger or 4.5:1 for text with a size less than 18 points.  The WCAG 2.0 level AAA compliance level is meet when a contrast ration of 7:1 is achieved for text less than 18 points and 4.5:1 for text 18 points (14 points if bolded) or larger.
</div>
</body>
</html>
