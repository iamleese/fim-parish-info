<?php


class Fim_Parish_Info {

	protected $loader;

	protected $plugin_name;

	protected $version;

	public function __construct() {
		if ( defined( 'FIM_PARISH_INFO_VERSION' ) ) {
			$this->version = FIM_PARISH_INFO_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'fim-parish-info';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
		$this->define_block_hooks();

	}

	private function load_dependencies() {


		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-fim-parish-info-loader.php';

		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-fim-parish-info-i18n.php';

		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-fim-parish-info-admin.php';

		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-fim-parish-info-public.php';

		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'blocks/class-fim-parish-info-blocks.php';

		$this->loader = new Fim_Parish_Info_Loader();

	}

	private function set_locale() {

		$plugin_i18n = new Fim_Parish_Info_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	private function define_admin_hooks() {

		$plugin_admin = new Fim_Parish_Info_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );

		$this->loader->add_action('admin_menu', $plugin_admin, 'fim_parish_info_add_menu');
		$this->loader->add_action('admin_init', $plugin_admin, 'fim_parish_info_settings');

	}

	private function define_public_hooks() {

		$plugin_public = new Fim_Parish_Info_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );
		$this->loader->add_action('wp_body_open', $plugin_public, 'fim_parish_info_popup');

	}

	private function define_block_hooks(){
		$plugin_blocks = new Fim_Parish_Info_Blocks( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'init', $plugin_blocks, 'fim_parish_info_register_blocks');
		$this->loader->add_filter( 'block_categories', $plugin_blocks, 'fim_parish_info_add_block_category', 10, 2);

	}

	public function run() {
		$this->loader->run();
	}

	public function get_plugin_name() {
		return $this->plugin_name;
	}

	public function get_loader() {
		return $this->loader;
	}

	public function get_version() {
		return $this->version;
	}

}
