<?php

class Fim_Parish_Info_Admin {


	private $plugin_name;
	private $version;
	public $option_name = 'fim_parish_info';

	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	public function enqueue_styles() {

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/fim-parish-info-admin.css', array(), $this->version, 'all' );

	}


	public function enqueue_scripts() {

	}

	public function admin_page_assets(){
		 wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/index.js', array(), $this->version, true );

	}

	public function add_rest_route(){
		register_rest_route( 'fim-parish-info/v1', '/option/(?P<sfx>[a-zA-Z_-]+)', array(
        'methods'  => WP_REST_Server::READABLE,
        'callback' => array($this,'fim_parish_info_get_option')
    ) );
	}

	public function fim_parish_info_get_option($option){
		$opt = get_option($this->option_name.'_'.$option['sfx']);
		if ( isset( $opt) ) {
        return rest_ensure_response( $opt );
    } else {
        // Return a WP_Error because the request product was not found. In this case we return a 404 because the main resource was not found.
        return new WP_Error( 'rest_fim_parish_option_invalid', esc_html__( 'The option is invalid.', 'fim-parish-info' ), array( 'status' => 404 ) );
    }

	}

	/*
	* Add Settings Menu
	*/

	public function fim_parish_info_add_menu(){

		$page_hook_suffix = add_menu_page(
			__( 'Parish Info', $this->plugin_name),
				'Parish Info',
				'manage_options',
				str_replace('-','_',$this->plugin_name),
				array($this,'fim_parish_info_settings_page'),
				esc_url( plugins_url( '/admin/assets/fim_church_icon.svg', dirname(__FILE__) ) ),
				30);

			add_action( "admin_print_scripts-{$page_hook_suffix}", array($this,'admin_page_assets') );

	}

	public function fim_parish_info_settings_page(){
		include_once 'partials/fim-parish-info-admin-display.php';

	}

	public function fim_parish_info_settings(){

		register_setting( $this->plugin_name.'-contact', $this->option_name . '_contact_info');
		register_setting( $this->plugin_name.'-contact', $this->option_name . '_maps_api_key');
		register_setting( $this->plugin_name.'-contact', $this->option_name . '_map_type');
		register_setting( $this->plugin_name.'-conatct', $this->option_name . '_lonlat');
		register_setting( $this->plugin_name.'-contact', $this->option_name . '_office_hours');
		register_setting( $this->plugin_name.'-contact', $this->option_name . '_social_links');
		register_setting( $this->plugin_name.'-masstimes', $this->option_name . '_mass_times');
		register_setting( $this->plugin_name.'-confessions', $this->option_name . '_confessions');
		register_setting( $this->plugin_name.'-custom', $this->option_name . '_custom_title');
		register_setting( $this->plugin_name.'-custom', $this->option_name . '_custom_content');


		//register settings
		add_settings_section(
			$this->option_name . '_contact_section', // section id
			__( 'Contact Info', 'fim-parish-info' ), //title
			array( $this, $this->option_name . '_contact_setion_cb' ), //callback
			$this->plugin_name.'-contact' //page
		);


		add_settings_field(
			$this->option_name . '_contact_info', //field id
			__( 'Contact Information', 'fim-parish-info' ), //title
			array( $this, $this->option_name . '_contact_info_cb' ), //callback
			$this->plugin_name.'-contact',//page
			$this->option_name . '_contact_section', //section
			array( 'label_for' => $this->option_name . '_contact_info' ) //args
		);


		add_settings_field(
			$this->option_name . '_', //field id
			__( 'Map Type', 'fim-parish-info' ), //title
			array( $this, $this->option_name . '_map_type_cb' ), //callback
			$this->plugin_name.'-contact',//page
			$this->option_name . '_contact_section', //section
			array( 'label_for' => $this->option_name . '_map_type' ) //args
		);

		add_settings_field(
			$this->option_name . '_maps_api_key', //field id
			__( 'Google Maps Embed API Key', 'fim-parish-info' ), //title
			array( $this, $this->option_name . '_maps_api_key_cb' ), //callback
			$this->plugin_name.'-contact',//page
			$this->option_name . '_contact_section', //section
			array( 'label_for' => $this->option_name . '_maps_api_key' ) //args
		);

		add_settings_field(
			$this->option_name . '_office_hours',
			__( 'Office Hours', 'fim-parish-info' ),
			array( $this, $this->option_name . '_office_hours_cb' ), //callback
			$this->plugin_name.'-contact',
			$this->option_name . '_contact_section',
			array( 'label_for' => $this->option_name . '_office_hours' )
		);

		add_settings_field(
			$this->option_name . '_social_links',
			__( 'Social Links', 'fim-parish-info' ),
			array( $this, $this->option_name . '_social_links_cb' ), //callback
			$this->plugin_name.'-contact',
			$this->option_name . '_contact_section',
			array( 'label_for' => $this->option_name . '_social_links' )
		);

		add_settings_section(
			$this->option_name . '_masstimes_section',
			__( 'Mass Times', 'fim-parish-info' ),
			array( $this, $this->option_name . '_masstimes_section_cb' ),
			$this->plugin_name.'-masstimes'
		);

		add_settings_field(
			$this->option_name . '_mass_times',
			__( 'Mass Time:', 'fim-parish-info' ),
			array( $this, $this->option_name . '_mass_times_cb' ), //callback
			$this->plugin_name.'-masstimes',
			$this->option_name . '_masstimes_section',
			array( 'label_for' => $this->option_name . '_mass_times' )
		);

		add_settings_section(
			$this->option_name . '_confessions_section',
			__( 'Confessions', 'fim-parish-info' ),
			array( $this, $this->option_name . '_confessions_section_cb' ),
			$this->plugin_name.'-confessions'
		);

		add_settings_field(
			$this->option_name . '_confessions',
			__( 'Confessions:', 'fim-parish-info' ),
			array( $this, $this->option_name . '_confessions_cb' ), //callback
			$this->plugin_name.'-confessions',
			$this->option_name . '_confessions_section',
			array( 'label_for' => $this->option_name . '_confessions' )
		);

		add_settings_section(
			$this->option_name . '_custom_section',
			__( 'Custom', 'fim-parish-info' ),
			array( $this, $this->option_name . '_custom_section_cb' ),
			$this->plugin_name.'-custom'
		);

		add_settings_field(
			$this->option_name . '_custom_title',
			__( 'Title:', 'fim-parish-info' ),
			array( $this, $this->option_name . '_custom_title_cb' ), //callback
			$this->plugin_name.'-custom',
			$this->option_name . '_custom_section',
			array( 'label_for' => $this->option_name . '_custom' )
		);

		add_settings_field(
			$this->option_name . '_custom_content',
			__( 'Content:', 'fim-parish-info' ),
			array( $this, $this->option_name . '_custom_content_cb' ), //callback
			$this->plugin_name.'-custom',
			$this->option_name . '_custom_section',
			array( 'label_for' => $this->option_name . '_custom' )
		);


	}
	/**
	* Contact Section and Settings Callbacks
	**/

	public function fim_parish_info_contact_setion_cb(){
		echo '<p>' . __( 'Contact information and office hours.', 'fim-parish-info' ) . '</p>';
	}

	public function fim_parish_info_contact_info_cb(){
		$contactinfo = get_option($this->option_name.'_contact_info');
		$mapkey = get_option($this->option_name.'_maps_api_key');
		$lonlat = get_option($this->option_name.'_lonlat');
		$map_type = get_option($this->option_name.'_map_type');
		$map_type ? ' style="visibility:hidden" ' : ' style="visibility: visible;" ';

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


		?>
		<div class="contact_container">
		<fieldset class="contact_info">
			<label for="contact_street">Street Address:</label>
			<input type="text" id="contact_street" class="contact_input" name="<?php echo $this->option_name.'_contact_info[street]';?>" value="<?php echo $contactinfo['street'] ?>">

			<label for="contact_city">City:</label>
			<input type="text" id="contact_city" class="contact_input" name="<?php echo $this->option_name.'_contact_info[city]';?>" value="<?php echo $contactinfo['city'] ?>">

			<label for="contact_state">State:</label>
			<input type="text" id="contact_state" class="contact_input" name="<?php echo $this->option_name.'_contact_info[state]';?>" value="<?php echo $contactinfo['state'] ?>" size="5">

			<label for="contact_state">Zip Code:</label>
			<input type="text" id="contact_zip" class="contact_input" name="<?php echo $this->option_name.'_contact_info[zip]';?>" value="<?php echo $contactinfo['zip'] ?>" size="20">

			<label for="contact_phone">Main Phone Number:</label>
			<input type="text" id="contact_phone" name="<?php echo $this->option_name.'_contact_info[phone]';?>" value="<?php echo $contactinfo['phone'] ?>" size="20">

			<label for="contact_phone">Main Email Address:</label>
			<input type="text" id="contact_email" name="<?php echo $this->option_name.'_contact_info[email]';?>" value="<?php echo $contactinfo['email'] ?>" size="30">
			<input type="hidden" id="contact_lonlat" name="<?php echo $this->option_name.'_contact_lonlat';?>" value="<?php echo $lonlat ?>">
		</fieldset>
		<div class="map">
			<div class="mapouter">
				<div id="ol_map" <?php echo $map_type ? ' style="visibility: visible;" ' : ' style="visibility: hidden;" '; ?> >
						
				</div>
				<iframe id="gmap_canvas" referrerpolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed/v1/place?key=<?php echo $mapkey;?>&q=<?php echo $mapembed; ?>" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" <?php echo  $map_type ? ' style="visibility:hidden;" ' : ' style="visibility:visible;" '; ?> >
				</iframe>
			</div>
		</div><!-- map -->
	</div><!--contact_container-->
		<hr />
		 <?php

	}

	public function fim_parish_info_map_type_cb(){
		$map_type = get_option($this->option_name.'_map_type'); 

		?>
		<fieldset class="map_type">
		<label for="contact_map_type">Select a Map Type:</label>
        <select id="contact_map_type" name="<?php echo $this->option_name.'_map_type';?>">
            <option value="" <?php selected( $map_type, '', true ); ?> >Google Maps</option>
            <option value="ol" <?php selected( $map_type, 'ol', true ); ?>>OpenLayers</option>
        </select><br />
		<span class="ol_notice"><em><?php echo __('OpenLayers Maps uses OpenStreetMap to pinpoint locations. Because OpenStreetMap is user-contributed, some locations may not be accurate. Visit <a href="https://openstreetmap.org/about">OpenStreetMap</a> for more information.') ?></em></span>
	<?php }

	public function fim_parish_info_maps_api_key_cb(){
		$key = get_option($this->option_name.'_maps_api_key'); ?>
		<fieldset class="maps_api">
			<label for="contact_maps_api">Google Maps API Key:</label>
			<input type="text" id="contact_maps_api" name="<?php echo $this->option_name.'_maps_api_key';?>" value="<?php echo $key ?>" size="50"><br />
			<a href="https://developers.google.com/maps/documentation/embed/cloud-setup" target="_blank">Get an Maps Embed API key from Google</a>
		</fieldset>
		<hr />
		<?php
	}

	public function fim_parish_info_office_hours_cb(){
		$officehours = get_option($this->option_name.'_office_hours');
		$editor_settings = array(
				'media_buttons' => FALSE,
				'textarea_rows' => 10,
				'teeny' => TRUE);?>

		<fieldset>
			<?php wp_editor(  $officehours, $this->option_name.'_office_hours', $editor_settings );?>
			</fieldset>
			<hr />
		<?php
	}

	public function fim_parish_info_social_links_cb(){
		$sociallinks = get_option($this->option_name.'_social_links');
		if(empty($sociallinks) ){
			$sociallinks = [
								'facebook' => '',
								'twitter' => '',
								'instagram' => '',
								'linkedin' => ''
							];
		}
		foreach($sociallinks as $social => $link) {

			switch ($social) {
				case 'linkedin':
					$name = 'LinkedIn';
					break;
				case 'youtube':
					$name = 'YouTube';
					break;
				default:
				 $name = ucfirst($social);
				break;
			}

			$slug = $social;
		?>
			<fieldset class="contact_info">
				<label for="<?php echo $slug; ?>"><?php echo $name; ?>:</label>
				<input type="text" id="<?php echo $slug; ?>" name="<?php echo $this->option_name.'_social_links['.$slug.']';?>" value="<?php echo $link ?>" >
			</fieldset>
		<?php
		}
		?>
		<hr />
		<?php
	}

	/**
	* Mass Times Section and Settings Callbacks
	**/

	public function fim_parish_info_masstimes_section_cb(){
		echo '<p>' . __( 'Enter your mass times.', 'fim-parish-info' ) . '</p>';
	}

	public function fim_parish_info_mass_times_cb(){
		$masstimes = get_option($this->option_name.'_mass_times');

		//set defaults
		if( empty($masstimes) ){
			$count = 1;

			$masstimes = [ 0 => ['title' => '',
													 'timeset' => [
														 0 => [ 'time' => '',
																		'notes' => ''
																	]
														]
													]
										];

		} else {
			$count = count($masstimes);
		}


		?>
		<div id="mass_time_container">

		<?php
		for( $i = 0; $i< $count; $i++ ){ ?>
			<div id="mass_group_<?php echo $i; ?>"class="masstime_set">
			<fieldset>
				<label for="title_<?php echo $i; ?>" class="masstimetitle">Title:</label>
				<input class="titleentry" type="text" id="title_<?php echo $i; ?>" name="<?php echo $this->option_name.'_mass_times['.$i.'][title]';?>" value="<?php echo $masstimes[$i]['title'] ?>">
			</fieldset>
			<div class="times">
			<?php
					$k = 0;
					foreach ($masstimes[$i]['timeset'] as $time_field):
						$time = $time_field['time'];
						$notes = $time_field['notes'];
						?>

						<fieldset name="time" class="masstime">
							<label class="timetitle">Time:</label>
							<input class="timeentry" type="text" name="<?php echo $this->option_name.'_mass_times['.$i.'][timeset]['.$k.'][time]';?>" value="<?php echo $masstimes[$i]['timeset'][$k]['time'] ?>">

							<label class="detailtitle">Detail:</label>
							<input class="notesentry" type="text"  name="<?php echo $this->option_name.'_mass_times['.$i.'][timeset]['.$k.'][notes]';?>" value="<?php echo $masstimes[$i]['timeset'][$k]['notes'] ?>">

					<?php
					//add delete button if it's more than one item
					if($k > 0){ ?>
							<a class="delete_time button" data-container='mass_group_<?php echo $i; ?>'> Delete Time</a>
					<?php } ?>


					<?php

					$k++;
					endforeach;
					?>
					</fieldset>
				</div>
				<a class="add_time button">+ Add Time</a>
				<?php
				if($count > 1 && $i > 0){ ?>
					<div class="deletecol"><a class="delete_mass_group button" data-container="mass_group_<?php echo $i; ?>">Delete Mass Group</a></div>

				<?php
				}
				?>
				</div>


		<?php
		}//mass time fieldset loop

		?>
		</div><!-- Mass Time container -->
		<div class="add_time_group button">+ Add Mass Group</div>
		<?php
	}//_mass_times_cb



	 /**
	 * Confessions Section and Settings Callbacks
	 **/

	 public function fim_parish_info_confessions_section_cb(){
		 echo '<p>' . __( 'Enter your parish confession information.', 'fim-parish-info' ) . '</p>';


	 }

	 public function fim_parish_info_confessions_cb(){
		 $confessions = get_option($this->option_name.'_confessions');
 		$editor_settings = array(
 				'media_buttons' => FALSE,
 				'textarea_rows' => 10,
 				'teeny' => TRUE);?>

 		<fieldset>
 			<?php wp_editor(  $confessions, $this->option_name.'_confessions', $editor_settings );?>
 			</fieldset>
 		<?php

		}

		/**
 	 * Confessions Section and Settings Callbacks
 	 **/

 	 public function fim_parish_info_custom_section_cb(){
 		 echo '<p>' . __( 'Enter your custom entries such as adoration days, devotion prayers, rosaries, etc.', 'fim-parish-info' ) . '</p>';


 	 }
	 public function fim_parish_info_custom_title_cb(){
 		 $customtitle = get_option($this->option_name.'_custom_title');
			?>

  		<fieldset>
				<input id="customtitle" type="text" name="<?php echo $this->option_name.'_custom_title'; ?>" value="<?php echo $customtitle ?>">
  		</fieldset>
  		<?php

 		}

 	 public function fim_parish_info_custom_content_cb(){
 		 $custom = get_option($this->option_name.'_custom_content');


  		$editor_settings = array(
  				'media_buttons' => FALSE,
  				'textarea_rows' => 10,
  				'teeny' => TRUE);

			?>

  		<fieldset>
  			<?php wp_editor($custom, $this->option_name.'_custom_content', $editor_settings );?>
  		</fieldset>
  		<?php

 		}

}
