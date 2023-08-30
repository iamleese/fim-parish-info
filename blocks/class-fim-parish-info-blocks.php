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
  				'title' => __( 'Parish Information', 'fim-parish-info' )
  			),
  		)
  	);

	}

	public function fim_parish_info_register_blocks() {

		register_block_type( __DIR__ . '/build/button-filter' );


		register_block_type( __DIR__ . '/build/parish-contact', array(
			'render_callback' => array($this, 'ParishContact'),
			'attributes' => [
					'show_address' => ['type' => 'boolean', 'default' => true ],
					'show_phone' => ['type' => 'boolean', 'default' => true ],
					'show_map' => ['type' => 'boolean', 'default' => true ],
					'show_email' => ['type' => 'boolean', 'default' => false ],
					'hide_headings' => ['type' => 'boolean', 'default' => false ],
					'className' => ['type' => 'string', 'default' => 'wp-block-fim-parish-info-parish-contact']
			]
		));

		register_block_type( __DIR__ . '/build/mass-times' , array(
			'render_callback' => array($this,'massTimes'),
			'attributes' => [
					'hide_headings' => ['type' => 'boolean', 'default' => false ],
					'display_masstimes' => ['type' => 'boolean', 'default' => true ],
					'display_confessions' => ['type' => 'boolean', 'default' => false ],
					'display_custom' => ['type' => 'boolean', 'default' => false ],
					'align'=>['type' => 'string'],
					'className' => ['type' => 'string']
			],
			'supports' => ['align'=> [ 'left', 'right', 'center' ]]
		));
		register_block_type( __DIR__ . '/build/social-info', array(
			'render_callback' => array($this, 'socialLinks'),
			'attributes' => [
					'show_icons'=> [
						'type' => 'boolean',
						'default' => true
					],
					'show_name'=> [
						'type' => 'boolean',
						'default' => true
					],
					'use_custom_colors'=> [
						'type' => 'boolean',
						'default' => false
					],
					'custom_color'=> [
						'type'=> 'string',
						'default'=> '#000000'
					],
					'flexlayout'=> [
						'type'=> 'string',
						'default'=> 'column'
					],
					'gap'=>[
						'type' => 'string',
						'default' => '5'
					],
					'iconsize'=>[
						'type' => 'string',
						'default' => '32'
					],
					'className' => ['type' => 'string']
				]
		));

	}

	public function ParishContact($attributes, $output = ''){
		$show_address = $attributes['show_address'];
		$show_phone = $attributes['show_phone'];
		$show_map = $attributes['show_map'];
		$show_email = $attributes['show_email'];
		$hide_headings = $attributes['hide_headings'];
		$className = $attributes['className'];


		ob_start();

		$contactinfo = get_option($this->option_name.'_contact_info');
		$maptype = get_option($this->option_name.'_map_type');
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

		if($maptype == 'ol'){
			$map_lonlat = get_option($this->option_name.'_contact_lonlat');

			$map_output = '<div id="ol_map_block" data-lonlat="'.$map_lonlat.'"></div>';
		} else {
			$map_output = '<iframe id="gmap_canvas" referrerpolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed/v1/place?key='.$mapkey.'&q='.$mapembed.'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
				</iframe>';
		}

		$output = '<div class="'.$className.'">';
		$output .=	'<div class="parish-info-contact-wrap">';

		if($show_address){
			$output .= '<div class="parish-info-address">';
			if( $hide_headings == false || $hide_headings == ''){
				$output .= '<h3>'.__('Address','fim_parish_info').'</h3>';
			}
			$output .= $contactinfo['street'].'<br />';
			$output .= $contactinfo['city'].', '. $contactinfo['state'] .' '.$contactinfo['zip'];
			$output .= '</div>';
		}
		if($show_phone){
			$output .= '<div class="parish-info-phone">';
			if( $hide_headings == false || $hide_headings == ''){
				$output .= '<h3>'.__('Phone','fim_parish_info').'</h3>';
			}
			$output .= $contactinfo['phone'];
			$output .= '</div>';
		}
		if($show_email){
			$output .= '<div class="parish-info-email">';
			if( $hide_headings == false || $hide_headings == ''){
				$output .= '<h3>'.__('Email','fim_parish_info').'</h3>';
			}
			$output .= '<a href="mailto:'.$contactinfo['email'].'">'.$contactinfo['email'].'</a>';
			$output .= '</div>';
		}

		$output .= '</div> <!-- end parish-info-contact-wrap -->';

		if($show_map){
			$output .= '<div class="parish-info-map">';
			$output .= '<div class="mapouter">'.$map_output.'
				
			</div>';
			$output .= '</div> <!-- end parish-info-map -->';
		}
		$output .= '</div>';
		$output .= ob_get_clean();

		return $output;

	}

	public function socialLinks($attributes,$output = ''){
		$show_icons = $attributes['show_icons'] ? 'show_icons' : '';
		$show_name = $attributes['show_name'] ? 'show_name' : '';
		$custom_color = $attributes['custom_color'];
		$use_custom_colors = $attributes['use_custom_colors'];
		$flexlayout = $attributes['flexlayout'];
		$gap = $attributes['gap'];
		$iconsize = $attributes['iconsize'];
		$className = $attributes['className'];

		$blockProps = implode(' ', array($className, $show_icons, $show_name) );

			$social_links = get_option($this->option_name.'_social_links');
			ob_start();

			$output = '<div class="'.$blockProps.'">';
			$output .= '<div class="socialLinkList" style="flex-direction:'.$flexlayout.'; gap:'.$gap.'px;">';

			foreach ($social_links as $social => $link){
				if($social == 'linkedin'){
					$displayname = 'LinkedIn';
				} else {
					$displayname = ucfirst($social);
				}
				if(!empty($link)){
					$bgcolor = $use_custom_colors ? 'style="background-color:'.$custom_color.';"' : '' ;

					$output .='<li><a class="'.$social.' social_item" href="'.$link.'">
									<div class="iconContainer" style="width:'.$iconsize.'px;">
									<span class="icon" '.$bgcolor.'>
									</span>
									</div>
									<span class="display_name">'.$displayname.'</span></a></li>';
				}
			}
			$output .= '</div>';
			$output .= '</div>';

			$output .= ob_get_clean();

			return $output;
	}


	public function massTimes($attributes){
		$hide_headings = $attributes['hide_headings'];
		$display_masstimes = $attributes['display_masstimes'];
		$display_confessions = $attributes['display_confessions'];
		$display_custom = $attributes['display_custom'];
		$className = $attributes['className'];
		$align = $attributes['align'] ? $attributes['align'] : '';

		$blockProps = implode(' ', array($className, $align ? 'align'.$align : ''));

		ob_start();

		$masstimes_output = '<div class="'.$blockProps.'">';
		//Display Mass Times

		if($display_masstimes == true){
			$mass_times = get_option($this->option_name.'_mass_times');

			$masstimes_output .= '<div>';
			$masstimes_output .= $hide_headings ? '' : '<h4>'.__('Mass Times', 'fim-parish-info').'</h4>';

			foreach($mass_times as $timegroup){
		      $title = $timegroup['title'];
		      $timeset = $timegroup['timeset'];

		      $masstimes_output .= '<div class="mass_group">';
		      $masstimes_output .= '<span class="group_title">'.$title.'</span>';

		      foreach($timeset as $item){
		        $masstimes_output .= '<li class="masstime"><span class="time">'.$item['time'].'</span>';
		        $masstimes_output .= $item['notes'] ? '<span class="details">'.$item['notes'].'</span>' : '';
		        $masstimes_output .= '</li>';
		      }

					$masstimes_output .= '</div>';
		  }
		}


				//Display Confessions
		if($display_confessions == true){
			$confessions = get_option($this->option_name.'_confessions');
			$masstimes_output .= '<div>';
			$masstimes_output .= $hide_headings ? '' : '<h4>'.__('Confessions', 'fim-parish-info').'</h4>';

			$masstimes_output .= wpautop($confessions);
			$masstimes_output .= '</div>';
		}


						//Display Custom
						if($display_custom == true){
							$custom_title= get_option($this->option_name.'_custom_title');
							$custom_content = get_option($this->option_name.'_custom_content');

							$heading = $custom_title ? $custom_title : 'Additional Information';

							$masstimes_output .= '<div>';
							$masstimes_output .= $hide_headings ? '' : '<h4>'.sprintf(__( '%s', 'fim-parish-info'), $heading ).'</h4>';

							$masstimes_output .= wpautop($custom_content);
							$masstimes_output .= '</div>';
						}



		$masstimes_output .= '</div>';


		$masstimes_output .= ob_get_clean();

		return $masstimes_output;

	}


}
