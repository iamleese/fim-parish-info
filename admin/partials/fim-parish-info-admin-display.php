<?php

/**
 * Settings Page
 */


 if (!current_user_can('manage_options')) {
     return;
 }

 $default_tab = null;
 $page = str_replace('-','_', $this->plugin_name);
  $tab = isset($_GET['tab']) ? $_GET['tab'] : $default_tab;

?>

<div class="wrap">
    <h2><?php echo esc_html( get_admin_page_title() ); ?></h2>
    <?php settings_errors();?>
    <nav class="nav-tab-wrapper">
      <a href="?page=<?php echo $page; ?>" class="nav-tab <?php if($tab==null):?>nav-tab-active<?php endif; ?>">Contact Info</a>
      <a href="?page=<?php echo $page; ?>&tab=masstimes" class="nav-tab <?php if($tab=='masstimes'):?>nav-tab-active<?php endif; ?>">Mass Times</a>
      <a href="?page=<?php echo $page; ?>&tab=confessions" class="nav-tab <?php if($tab=='confessions'):?>nav-tab-active<?php endif; ?>">Confessions</a>
      <a href="?page=<?php echo $page; ?>&tab=custom" class="nav-tab <?php if($tab=='custom'):?>nav-tab-active<?php endif; ?>">Custom</a>

    </nav>

    <div class="tab-content">
        <form method="POST" action="options.php" >

        <?php

          switch($tab) :

            case 'masstimes':
                settings_fields($this->plugin_name.'-masstimes');
                do_settings_fields( $this->plugin_name.'-masstimes', $this->plugin_name.'_masstimes_section');
                do_settings_sections( $this->plugin_name.'-masstimes');
                submit_button();

                break;

            case 'confessions':
                settings_fields($this->plugin_name.'-confessions');
                do_settings_fields( $this->plugin_name.'_confessions', $this->plugin_name.'_confessions');
                do_settings_sections( $this->plugin_name.'-confessions');
                submit_button();

                break;

            case 'custom':
                settings_fields($this->plugin_name.'-custom');
                do_settings_fields( $this->plugin_name.'_custom', $this->plugin_name.'_custom');
                do_settings_sections( $this->plugin_name.'-custom');
                submit_button();

                break;


            default:
                settings_fields($this->plugin_name.'-contact');
                do_settings_fields( $this->plugin_name.'-contact', $this->plugin_name.'_contact_section');
                do_settings_sections( $this->plugin_name.'-contact');
                submit_button();
                ?>
                <?php
                break;

        endswitch;



        ?>
        </form>

    </div>



</div>
