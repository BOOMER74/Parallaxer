if (typeof jQuery === "undefined") {
	throw new Error("Parallaxer requires jQuery!");
}

(function ($) {
	"use strict";

	$.fn.parallaxer = function () {
		var initialized = false;

		var $that = $(this);

		function handleScroll() {
			function onScroll() {
				//noinspection JSValidateTypes
				var scrollTop = $(this).scrollTop(), // jshint ignore:line
					windowHeight = $(this).outerHeight(), // jshint ignore:line
					windowBottom = windowHeight + scrollTop;

				$that.each(function () {
					//noinspection JSValidateTypes
					var $image = $(this).children("img").first();

					var imageHeight = $image.outerHeight(),
						containerTop = $(this).offset().top,
						containerHeight = $(this).outerHeight();

					var translate = Math.round((imageHeight - containerHeight) * ((windowBottom - containerTop) / (containerHeight + windowHeight)));

					if ((containerTop + containerHeight > scrollTop) && (containerTop < (scrollTop + windowHeight))) {
						$image.css({
							"-webkit-transform": "translate3D(-50%, " + translate + "px, 0)",
							"-moz-transform": "translate3D(-50%, " + translate + "px, 0)",
							"-ms-transform": "translate3D(-50%, " + translate + "px, 0)",
							"-o-transform": "translate3D(-50%, " + translate + "px, 0)",
							"transform": "translate3D(-50%, " + translate + "px, 0)"
						});
					}

					if (!initialized) {
						$image.css("opacity", "1");
					}
				});
			}

			$(window).on("scroll", onScroll);

			onScroll.call(window);

			initialized = true;
		}

		var translateSupport = function () {
			if (typeof window.getComputedStyle !== "function") {
				return false;
			}

			var div = document.createElement("div");

			document.body.appendChild(div);

			var transforms = [
				"-webkit-transform",
				"-moz-transform",
				"-ms-transform",
				"-o-transform",
				"transform"
			];

			var support = true;

			for (var i = 0; i < transforms.length; i++) {
				div.style[transforms[i]] = "translate3D(-100%, -100%, 0)";

				var computedStyle = window.getComputedStyle(div).getPropertyValue(transforms[i]);

				support = support || (computedStyle.length > 0 && computedStyle !== "none");
			}

			document.body.removeChild(div);

			return support;
		}();

		var loaded = true;

		$that.each(function () {
			if (translateSupport) {
				//noinspection JSValidateTypes
				var $image = $(this).children("img").first();

				var complete = $image.get(0).complete;

				if (!complete) {
					$image.one("load", function () {
						var alreadyLoad = true;

						$that.each(function () {
							//noinspection JSValidateTypes
							alreadyLoad = alreadyLoad && $(this).children("img").first().get(0).complete;
						});

						if (!initialized && alreadyLoad) {
							$that.each(function () {
								//noinspection JSValidateTypes
								$(this).children("img").first().off("load");
							});

							handleScroll();
						}
					});
				}

				loaded = loaded && complete;
			} else {
				$(this).addClass("parallaxer-not-supported");
			}
		});

		if (loaded) {
			handleScroll();
		}
	};
}(jQuery));