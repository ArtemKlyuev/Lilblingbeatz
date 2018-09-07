document.body.onload = function () {
	setTimeout(function () {
		var preloader = document.getElementById('page-preloader');
		if (!preloader.classList.contains('done')) {
			preloader.classList.add('done');
		};
		if (preloader.classList.contains('done')) {
			var $isAnimatedEntrySection = $('.entrySection .is-animated');
			$isAnimatedEntrySection.addClass('animated fadeInDown');
			$(".underlogo-text").delay(800).queue(function () {
				$(this).addClass("animated fadeIn").dequeue();
			});
			$(".center-logo__text").delay(1500).queue(function () {
				$(this).addClass("js-underlogo-text-bg-img").dequeue();
			});
		};

	}, 4000);
}

$(document).ready(function () {
	var $isAnimatedLeft2 = $('.beatsPlayer .is-animated-left'),
		$isAnimatedRight2 = $('.beatsPlayer .is-animated-right'),
		$isAnimatedBottom2 = $('.beatsPlayer .is-animated-bottom'),
		$isAnimatedLeft3 = $('.pricing .is-animated-left'),
		$isAnimatedRight3 = $('.pricing .is-animated-right'),
		$isAnimatedBottom3 = $('.pricing .is-animated-bottom'),
		$isAnimatedLeft4 = $('.contacts .is-animated-left'),
		$isAnimatedRight4 = $('.contacts .is-animated-right'),
		$isAnimatedBottom4 = $('.contacts .is-animated-bottom');

	$('.center-logo__item').click(function () {
		$(this).addClass('hinge').delay(2500).queue(function () {
			$(this).removeClass('hinge').dequeue();
		});
	});

	$('.center-logo__item').click(function () {
		$(this).addClass('hinge');
	});

	function animatedLeft(i) {
		$(this).addClass('animated fadeInLeft').css('animation-delay', '.6s');
	};

	function animatedRight(i) {
		$(this).addClass('animated fadeInRight').css('animation-delay', +'0.3' * i + +'0.9' + 's');

	};
	$('#fullpage').fullpage({
		scrollOverflow: true,
		anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage'],
		onLeave: function (index, nextIndex, direction) {

			if (index == 1 && nextIndex == 2) {

				$isAnimatedLeft2.each(animatedLeft);
				$isAnimatedRight2.each(animatedRight);
				$isAnimatedBottom2.addClass('animated fadeInUp');
				$isAnimatedBottom2.css('animation-delay', '2s');
			} else if ((index == 1 || index == 2) && nextIndex == 3) {
				$isAnimatedLeft3.each(animatedLeft);
				$isAnimatedRight3.each(animatedRight);
				$isAnimatedBottom3.each(function (i) {
					$(this).addClass('animated fadeInUp').css('animation-delay', +'0.3' * i + +'2' + 's');
				});
			} else if ((index == 1 || index == 2 || index == 3) && nextIndex == 4) {
				$isAnimatedBottom4.each(function (i) {
					$(this).addClass('animated fadeInUp').css('animation-delay', +'1.4' * i + +'0.6' + 's');
				});
				$isAnimatedLeft4.addClass('animated fadeInLeftBig');
				$isAnimatedLeft4.css('animation-delay', '.9s');

				$isAnimatedRight4.addClass('animated fadeInRightBig');
				$isAnimatedRight4.css('animation-delay', '1.2s');
			}
		}


	});

	$('.center-logo__text').on('click', function () {
		$.fn.fullpage.moveSectionDown();
	});

	$('.mouse').on('click', function () {
		$.fn.fullpage.moveSectionDown();
	});

	$('.card').on('click', function () {
		$.fn.fullpage.moveSectionUp();
	});

	$('.menu-toggle').click(function () {
		$('body').toggleClass('open-menu');
	});

	$('.menu-close').click(function () {
		$('body').toggleClass('open-menu');
	});

	$('.nav__item').click(function () {
		$('body').toggleClass('open-menu');
	});

	$('.modal-open').click(function () {

		$('.modal-background').removeClass('out end open').addClass('open');
	})

	$('.close').click(function () {
		$('.modal-background').addClass('out end');
	});

	$(".modal__input").focus(function () {
		$(this).parent().addClass("is-active is-completed");
	});

	$(".modal__input").focusout(function () {
		if ($(this).val() === "")
			$(this).parent().removeClass("is-completed");
		$(this).parent().removeClass("is-active");
	});

	$('.modal-background').mouseup(function (e) { // by clicking outside the pop-up
		var modal = $('.modal');
		if (e.target != modal[0] && modal.has(e.target).length === 0) {
			$('.modal-background').addClass('out end');
		}
	});
	$('.js-modal-background').mouseup(function (e) { // by clicking outside the pop-up
		var jsModal = $('.js-modal');
		if (e.target != jsModal[0] && jsModal.has(e.target).length === 0) {
			$('.modal-background').addClass('end');
			//$('body').removeClass('modal-active');
		}
	});
	$('#form').submit(function () { // Check for empty fields. The html5 — 'required' attribute is not suitable (Safari is not supported)
		if (document.form.name.value == '' || document.form.phone.value == '') {
			valid = false;
			return valid;
		}
		var inName = document.getElementById('name').value;
		var inPhone = document.getElementById('phone').value;
		var name_pattern = /^[a-z\ ]+$/i;
		var phone_pattern = /^[\+\d\(\)\ -]{2,20}\d+$/i;
		var checkName = name_pattern.test(inName);
		var checkPhone = phone_pattern.test(inPhone);

		if (checkName == false && checkPhone == true) {
			$('.input-name-message').text('Please use only Latin letters');
			$('.input-phone-message').text('');
			return false;
		} else if (checkName == true && checkPhone == false) {
			$('.input-name-message').text('');
			$('.input-phone-message').text('Phone number is incorrect');
			return false;
		} else if (checkName == false && checkPhone == false) {
			$('.input-name-message').text('Please use only Latin letters');
			$('.input-phone-message').text('Phone number is incorrect');
			return false;
		} else if (checkName == true && checkPhone == true) {
			$('.input-name-message').text('');
			$('.input-phone-message').text('');
		}
		$.ajax({
			type: "POST",
			url: "./mail.php",
			data: $(this).serialize()
		}).done(function () {
			$('.modal-background').addClass('out successfully');
			$('.js-modal .btn').click(function () {
				$('.modal-background').addClass('end');
			});
			$(this).find('input').val('');
			$('#form').trigger('reset');
		});
		return false;
	});
});