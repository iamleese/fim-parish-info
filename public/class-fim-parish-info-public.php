<?php

/**
 * The public-facing functionality of the plugin.
 */
class Fim_Parish_Info_Public {

	private $plugin_name;
	private $version;

	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	public function enqueue_styles() {

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/fim-parish-info-public.css', array(), $this->version, 'all' );

	}

	public function enqueue_scripts() {
		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/index.js', array(), $this->version, false );

	}

	public function fim_parish_info_popup(){
		include_once 'partials/fim-parish-info-public-display.php';
		fim_parish_info_popup_display();
	}

}
