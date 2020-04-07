(function ($) {
	var desktopBreakpointClass;
	var desktopBreakpoint;

	function init() {
		setupDesktopBreakpoint();
		setupMobileMenu();
		setupMobileSubmenu();
	}

	/**
	 * Setup desktop breakpoint.
	 * Retrieve desktop breakpoint based on body class.
	 */
	function setupDesktopBreakpoint() {
		desktopBreakpointClass = $('body').attr("class").match(/wpbf-desktop-breakpoint-[\w-]*\b/);

		if (desktopBreakpointClass !== null) {
			desktopBreakpoint = desktopBreakpointClass.toString().match(/\d+/);
			desktopBreakpoint = Array.isArray(desktopBreakpoint) ? desktopBreakpoint[0] : desktopBreakpoint;
		} else {
			desktopBreakpoint = 1024;
		}
	}

	/**
	 * Setup mobile menu both for default and hamburger menu.
	 */
	function setupMobileMenu() {
		$(document).on('click', '.wpbf-mobile-menu-toggle', function () {
			toggleMobileMenu('default');
			toggleMobileMenu('hamburger');
		});

		// Close mobile menu on anchor link clicks but only if menu item doesn't have submenus.
		$(document).on('click', '.wpbf-mobile-menu a', function () {

			var hasSubmenu = this.parentNode.classList.contains('menu-item-has-children');

			if (this.href.match("^#") || this.href.match("^/#")) {
				if (!hasSubmenu) {
					toggleMobileMenu('default');
					toggleMobileMenu('hamburger');
				} else {
					toggleSubmenuOnEmtyLink(this);
				}
			}

		});

		// Hide open mobile menu on window resize.
		$(window).resize(function () {

			var windowHeight = $(window).height();
			var windowWidth = $(window).width();
			var mobileNavWrapperHeight = $('.wpbf-mobile-nav-wrapper').outerHeight();

			$('.wpbf-mobile-menu-container.active nav').css({ 'max-height': windowHeight - mobileNavWrapperHeight });

			if (windowWidth > desktopBreakpoint) {
				closeMobileMenu('default');
				closeMobileMenu('hamburger');

				if ($('.wpbf-mobile-mega-menu').length) {
					$('.wpbf-mobile-mega-menu').removeClass('wpbf-mobile-mega-menu').addClass('wpbf-mega-menu');
				}
			} else {
				if ($('.wpbf-mega-menu').length) {
					$('.wpbf-mega-menu').removeClass('wpbf-mega-menu').addClass('wpbf-mobile-mega-menu');
				}
			}

		});
	}

	/**
	 * Toggle mobile menu.
	 *
	 * @param {string} type Default menu or hamburger menu.
	 */
	function toggleMobileMenu(type) {
		var menuToggle = $('.wpbf-mobile-menu-toggle');

		if (menuToggle.hasClass("active")) {
			$('.wpbf-mobile-menu-container').removeClass('active').slideUp();
			menuToggle.removeClass("active");

			if (type === 'hamburger') {
				menuToggle.removeClass('wpbff-times').addClass('wpbff-hamburger').attr('aria-expanded', 'false');
			} else {
				menuToggle.attr('aria-expanded', 'false');
			}
		} else {
			$('.wpbf-mobile-menu-container').addClass('active').slideDown();
			menuToggle.addClass("active");

			if (type === 'hamburger') {
				menuToggle.removeClass('wpbff-hamburger').addClass('wpbff-times').attr('aria-expanded', 'true');
			} else {
				menuToggle.attr('aria-expanded', 'true');
			}

			$(window).trigger('resize');
		}
	}

	/**
	 * Close mobile menu.
	 * 
	 * @param {string} type Default menu or hamburger menu.
	 */
	function closeMobileMenu(type) {

		var menuToggle = $('.wpbf-mobile-menu-toggle');

		if (menuToggle.hasClass("active")) {
			$('.wpbf-mobile-menu-container').removeClass('active').slideUp();
			menuToggle.removeClass("active");

			if (type === 'hamburger') {
				menuToggle.removeClass('wpbff-times').addClass('wpbff-hamburger').attr('aria-expanded', 'false');
			} else {
				menuToggle.attr('aria-expanded', 'false');
			}
		}

	}

	/**
	 * Setup mobile submenu for both default and hamburger menu.
	 */
	function setupMobileSubmenu() {
		setupSubmenuToggle('default');
		setupSubmenuToggle('hamburger');
	}

	/**
	 * Setup submenu toggle.
	 *
	 * @param {string} type Default menu or hamburger menu.
	 */
	function setupSubmenuToggle(type) {
		var menuClass = type === 'hamburger' ? '.wpbf-mobile-menu-hamburger .wpbf-submenu-toggle' : '.wpbf-mobile-menu-default .wpbf-submenu-toggle';

		$(document).on('click', menuClass, function (e) {
			e.preventDefault();
			toggleMobileSubmenu(this);
		});
	}

	/**
	 * Toggle mobile submenu.
	 */
	function toggleMobileSubmenu(menu) {

		if ($(menu).hasClass("active")) {
			$('i', menu).removeClass('wpbff-arrow-up').addClass('wpbff-arrow-down');
			$(menu).removeClass('active').attr('aria-expanded', 'false').siblings('.sub-menu').slideUp();
		} else {
			$('i', menu).removeClass('wpbff-arrow-down').addClass('wpbff-arrow-up');
			$(menu).addClass('active').attr('aria-expanded', 'true').siblings('.sub-menu').slideDown();
		}

	}

	function toggleSubmenuOnEmtyLink(menu) {

		var toggle = $(menu).siblings('.wpbf-submenu-toggle');

		if (toggle.hasClass("active")) {
			$('i', toggle).removeClass('wpbff-arrow-up').addClass('wpbff-arrow-down');
			toggle.removeClass('active').attr('aria-expanded', 'false').siblings('.sub-menu').slideUp();
		} else {
			$('i', toggle).removeClass('wpbff-arrow-down').addClass('wpbff-arrow-up');
			toggle.addClass('active').attr('aria-expanded', 'true').siblings('.sub-menu').slideDown();
		}

	}

	init();
})(jQuery);