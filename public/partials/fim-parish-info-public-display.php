<?php

/**
 * Public-facing view
 **/


 //PopUp display

function fim_parish_info_popup_display(){
  $option_name = 'fim_parish_info';

  ob_start();
  //address and map
  $contact_info = get_option($option_name.'_contact_info');
  $maptype = get_option($option_name.'_map_type');


  //mass times
  $mass_times = get_option($option_name.'_mass_times');

  //confessions
  $confessions = get_option($option_name.'_confessions');

  //custom
  $customtitle = get_option($option_name.'_custom_title');
  $customcontent = get_option($option_name.'_custom_content');

  //contact output
  $masstimes_output = '';

  //setup contact_info
  $mapembed = urlencode($contact_info['street'].','.$contact_info['city'].','.$contact_info['state'].' '.$contact_info['zip']);

  if($maptype == 'ol'){
    $lonlat = get_option($option_name.'_contact_lonlat');
    $map = '<div id="ol_map" data-lonlat="'.$lonlat.'"></div>';

  } else {
    $mapkey = get_option($option_name.'_maps_api_key');

    $map =  '<iframe id="gmap_canvas" referrerpolicy="no-referrer-when-downgrade"
    src="https://www.google.com/maps/embed/v1/place?key='.$mapkey.'&q='.$mapembed.'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
        </iframe>';
  }



  $masstimes_output .= '<div class="popup_mass_times">';
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
  $masstimes_output .= '</div><!--popup_mass_times-->';
  $masstimes_output .= '<div class="popup_map">';
  $masstimes_output .= '<div class="mapouter">'.$map.'</div><!--mapouter-->';
  $masstimes_output .= '<div class="popup_button_group">';
  $masstimes_output .= '<a class="popup_inner_button" href="https://www.google.com/maps/dir/'.$mapembed.'" target="_blank" rel="noreferrer" >'.__('Get Directions','fim_parish_info').'</a>';

  if(!empty($contact_info['phone'])){
    $replace = '/[^0-9.]/';
    $phonestring = preg_replace($replace,'',$contact_info['phone']);
    $phonelink = "tel:+1".$phonestring;
    $masstimes_output .= '<a class="popup_inner_button" href="'.$phonelink.'" >'.__('Call '.$contact_info['phone'],'fim_parish_info').'</a>';
  }

  $masstimes_output .= '</div><!--popup button group -->';
  $masstimes_output .= '</div><!--popup_map-->';

  //full PopUp ?>
  <div id="mass_times_outer">

    <div class="popup_modal">
    <div class="popup_header">
      <a href="#" class="closemodal"> </a>
    </div>
      <div class="tabs">
      <a class="tab active" role="tab" aria-controls="mass_time_content" aria-selected="true" href="#" aria-label="<?php echo __('Mass Times','fim_parish_info'); ?>">
        <span class="title_tab"><?php echo __('Mass Times','fim_parish_info'); ?></span>
      </a>
      <?php if(!empty($confessions)){ ?>
        <a class="tab" role="tab" aria-controls="confession_content" aria-selected="true" href="#" data-screen="confession_content" aria-label="<?php echo __('Confessions','fim_parish_info'); ?>">
          <span class="title_tab"><?php echo __('Confessions','fim_parish_info'); ?></span>
        </a>
     <?php } ?>
     <?php if(!empty($customtitle) || !empty($customcontent)){ ?>
       <a class="tab" href="#" role="tab" aria-controls="custom_content" aria-selected="true" data-screen="custom_content" aria-label="<?php echo $customtitle ? $customtitle : __('Additional Info','fim_parish_info'); ?>">
         <span class="title_tab"><?php echo $customtitle ? $customtitle : __('Additional Info','fim_parish_info'); ?></span>
       </a>
    <?php } ?>
    </div><!--tab group-->
    <div class="contentwrap">
      <div id="mass_time_content" class="tabcontent active" aria-hidden="false">
        <h3 class="content-title"><?php echo __('Mass Times','fim_parish_info'); ?></h3>
          <?php echo $masstimes_output; ?>
      </div>
      <div id="confession_content" class="tabcontent" aria-hidden="true">
        <h3 class="content-title"><?php echo __('Confessions','fim_parish_info'); ?></h3>
          <?php echo wpautop($confessions); ?>
      </div>
      <div id="custom_content" class="tabcontent" aria-hidden="true">
        <h3 class="content-title"><?php echo $customtitle ? $customtitle : __('Additional Info','fim_parish_info'); ?></h3>

          <?php echo wpautop($customcontent); ?>
      </div>
    </div><!--contentwrap-->
  </div><!--popup_modal-->
  </div>

<?php

}

?>
