$(function() {
	'use strict';

	function main() {
	var bodyHeight=$(window).height();
	$('#showmatch').height(bodyHeight*0.14);
	$('#play, #giveitatry').on('click', function () {
		$('body').on('touchmove', function(e) { e.preventDefault(); });
		window.scrollTo(0, bodyHeight);
	});
	$('.contrast').on('click', function () {
		$('body').css('background-blend-mode', 'normal');
		$('body').css('background-image', 'url(images/nobckgP.jpg)');
		$('#intro, #try').css('mix-blend-mode','difference');
	});
	$('.highcontrast').on('click', function () {
		$('body').css('background-blend-mode', 'screen, overlay');
		$('#intro, #try').css('mix-blend-mode','difference');
	});
	$('.nocontrast').on('click', function () {
		$('body').css('background-blend-mode', 'normal');
		$('body').css('background-image', 'url(images/bckgIri.jpg)');
		$('#intro, #try').css('mix-blend-mode','normal');
	});
	var $cool=$('.cool'), $hot=$('.hot'); //unpicked and currently picked numbers
	var $choice=$('.choice'), $randoms=$('.randoms');
	var picks=[null, null, null, null, null, null], spins=[], matched=[];
	var allBalls=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49];
	var $quitAgain=$('#quitAgain'); //var $undoK=$('#undoK'),
	$quitAgain.hide();
	var $oK=$('#oK'), $undo=$('#undo');
	$oK.prop('disabled', true); $undo.prop('disabled', true);
	$oK.on('click', agree);

	var $results=$('#congrats'), $chosen=$('#chosen');
	var $reset=$('#reset');
	$reset.prop('disabled', true);
	$reset.on('click', playAgain);

	$cool.each(function(index) {
		$(this).text(parseInt(index+1));
	}).on('click', pick);

	//$cool.on('click', pick);

function pick() {
	//$undo.prop('disabled', false);
	$(this).addClass('hot').removeClass('cool').off().on('click', unpick);
	var picked=parseInt($(this).text());
	picks[$.inArray(null, picks)]=picked;
	$('.choice:empty').first().text(picked);
	if (picks.length==6 && $.inArray(null, picks)==-1) {
		$oK.prop('disabled', false);
		$cool.not('.hot').prop('disabled', true);
	}
}

function unpick() {
	$(this).addClass('cool').removeClass('hot').off().on('click', pick);
	$oK.prop('disabled', true);
	$cool.not('.hot').prop('disabled', false);
	var el=parseInt($(this).text());
	var pickedIndex=$.inArray(el, picks);
	picks.splice(pickedIndex, 1, null);
	$choice.filter(function() {
    return $(this).text() == el;
}).empty();
}

function agree() {
	var $undoK=$('#undoK');
	var $choiceRandom=$('.choice, .randoms');
	$cool.prop('disabled', true);
	$hot.prop('disabled', true);
	window.scrollTo(0, 0);
	$quitAgain.show();
	$undoK.hide();
	$reset.prop('disabled', false);
	getRandom();
	$oK.prop('disabled', true);
	compare(picks, spins);
	$choiceRandom.prop('disabled', true);
}

function getRandom() {
	var rIndex;
	var rElem;
	for (var i=0; i<6; i++) {
		  rIndex=Math.floor(Math.random()*(allBalls.length));
		  rElem=allBalls.splice(rIndex, 1);
		  spins.push(rElem[0]);
		  $randoms.eq(spins.length-1).text(spins[spins.length-1]);
   }
}

function compare(arr1, arr2) {
$.grep(arr1, function(el) {
	if ($.inArray(el, arr2) !== -1) {
		matched.push(el);
	}
});
	if (matched.length>0) {
		if (matched.length==1) {
			$results.text(matched.length + ' number matched!');
		}
		else {
			$results.text(matched.length + ' numbers matched!');
		}
		$chosen.text(matched.join(', '));
		toGreen(matched, picks, $choice);
		toGreen(matched, spins, $randoms);
	}
	else {
		$results.text('no matches this time... try again!');
	}
}

function toGreen(arr1, arr2, selection) {
$.grep(arr1, function(el) {
	var ndex=$.inArray(el, arr2);
	if (ndex !== -1) {
		selection.eq(ndex)
		.css({'background-color': 'green',
		'box-shadow':'0 8px 18px 0 rgba(255, 255, 255, 0.2), 0 12px 40px 0 rgba(255, 255, 255, 0.19)', 'border-color':'transparent'});
	}
	});
}

function playAgain() {
$('#buttons').remove();
$('#try').append(outerH);
main();
window.scrollTo(0, $(window).height());
}

}

$('#buttons').removeClass('collapse');
var outerH=$('#try').html();
$('#buttons').addClass('collapse');
main();
});
