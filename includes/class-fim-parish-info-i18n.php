<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://faithinmarketing.com
 * @since      1.0.0
 *
 * @package    Fim_Parish_Info
 * @subpackage Fim_Parish_Info/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Fim_Parish_Info
 * @subpackage Fim_Parish_Info/includes
 * @author     Melissa Hiatt, Faith in Marketing <melissa@faithinmarketing.com>
 */
class Fim_Parish_Info_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'fim-parish-info',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
