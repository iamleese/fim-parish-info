<?php

/**
 * Plugin Name:       FIM Parish Info
 * Plugin URI:        https://faithinmarketing.com/websites
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.2.0
 * Author:            Melissa Hiatt, Faith in Marketing
 * Author URI:        https://faithinmarketing.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       fim-parish-info
 * Domain Path:       /languages
 */

if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'FIM_PARISH_INFO_VERSION', '1.0.0' );

function activate_fim_parish_info() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-fim-parish-info-activator.php';
	Fim_Parish_Info_Activator::activate();
}

function deactivate_fim_parish_info() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-fim-parish-info-deactivator.php';
	Fim_Parish_Info_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_fim_parish_info' );
register_deactivation_hook( __FILE__, 'deactivate_fim_parish_info' );


require plugin_dir_path( __FILE__ ) . 'includes/class-fim-parish-info.php';


function run_fim_parish_info() {

	$plugin = new Fim_Parish_Info();
	$plugin->run();

}
run_fim_parish_info();
