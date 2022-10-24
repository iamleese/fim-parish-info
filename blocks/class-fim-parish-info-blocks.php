<?php


class Fim_Parish_Info_Blocks {

	private $plugin_name;
	private $version;
	public $option_name = 'fim_parish_info';

	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	public function fim_parish_info_add_block_category($categories){

		return array_merge(
  		$categories,
  		array(
  			array(
  				'slug' => 'fim-parish-info',
  				'title' => __( 'Parish Information', 'ministry-blocks' )
  			),
  		)
  	);

	}

	public function fim_parish_info_register_blocks() {
		register_block_type( __DIR__ . '/build/parish-contact', array(
			'render_callback' => array($this, 'ParishContact'),
			'attributes' => [
					'show_address' => ['type' => 'boolean', 'default' => true ],
					'show_phone' => ['type' => 'boolean', 'default' => true ],
					'show_map' => ['type' => 'boolean', 'default' => true ],
					'show_email' => ['type' => 'boolean', 'default' => false ],
			]
		));

		register_block_type( __DIR__ . '/build/mass-times' );
	}

	public function ParishContact($attributes, $output = ''){
		$show_address = $attributes['show_address'];
		$show_phone = $attributes['show_phone'];
		$show_map = $attributes['show_map'];
		$show_email = $attributes['show_email'];

		ob_start();

		$contactinfo = get_option($this->option_name.'_contact_info');
		$mapkey = get_option($this->option_name.'_maps_api_key');
		$mapembed = '';

		if(empty($contactinfo) ) {
			$contactinfo=[
								'street' => '',
								'city' => '',
								'state' => '',
								'zip' => '',
								'phone' => '',
								'email' => ''
			];
		} else {
			$mapembed = urlencode($contactinfo['street'].','.$contactinfo['city'].' '.$contactinfo['state'].', '.$contactinfo['zip']);
		}

		$output = '<div class="wp-block-fim-parish-info-parish-contact">';

		$output .=	'<div class="parish-info-contact-wrap">';

		if($show_address){
			$output .= '<div class="parish-info-address">';
			$output .= '<h3>'.__('Address','fim_parish_info').'</h3>';
			$output .= $contactinfo['street'].'<br />';
			$output .= $contactinfo['city'].', '. $contactinfo['state'] . $contactinfo['zip'];
			$output .= '</div>';
		}
		if($show_phone){
			$output .= '<div class="parish-info-phone">';
			$output .= '<h3>'.__('Phone','fim_parish_info').'</h3>';
			$output .= $contactinfo['phone'];
			$output .= '</div>';
		}
		if($show_email){
			$output .= '<div class="parish-info-email">';
			$output .= '<h3>'.__('Email','fim_parish_info').'</h3>';
			$output .= '<a href="mailto:'.$contactinfo['email'].'">'.$contactinfo['email'].'</a>';
			$output .= '</div>';
		}

		$output .= '</div> <!-- parish-info-contact-wrap -->';

		if($show_map){
			$output .= '<div class="parish-info-map">';
			$output .= '<div class="mapouter">
				<iframe id="gmap_canvas" referrerpolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed/v1/place?key='.$mapkey.'&q='.$mapembed.'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
				</iframe>
			</div>';
			$output .= '</div> <!-- parish-info-map -->';
		}
		$output .= '</div>';

		$output .= ob_get_clean();

		return $output;

	}

	public function socialLinks(){

			$social_links = get_option($option_name.'_social_links');

			ob_start();
			$output = '<div class="parish-info-social">';
			foreach ($social_links as $social => $link){
				if(!empty($link)){
					$output .= '<li class="parish-info-social-item '.$social.'"><a href="'.$link.'" target="_blank" ><span class="social_name">'.ucfirst($social).'</span></a></li>';;
				}
			}
			$output .= '</div>';

			$output .= ob_get_clean();

			return $output;
	}


}
