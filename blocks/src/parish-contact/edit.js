import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls  } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { ToggleControl, Panel, PanelBody, PanelRow} from '@wordpress/components';

import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {


  var show_address = attributes.show_address;
  var show_phone = attributes.show_phone;
  var show_map = attributes.show_map;
  var show_email = attributes.show_email;
  var hide_headings = attributes.hide_headings;

	return (
    <div { ...useBlockProps() }>

    <ServerSideRender
          block="fim-parish-info/parish-contact"
          attributes = { attributes }
    />

    <InspectorControls key="setting">
        <Panel>
            <PanelBody title="Contact Visibility">
                <PanelRow>
                <ToggleControl
                  label="Show Address"
                  checked = { show_address }
                  help={
                      show_address
                          ? 'Showing Address'
                          : ''
                  }
                  onChange={ (val) => { setAttributes( { show_address: val } ) } }
                />
                </PanelRow>

                <PanelRow>
                <ToggleControl
                  label="Show Phone"
                  checked = { show_phone }
                  help={
                      show_phone
                          ? 'Showing Phone Number'
                          : ''
                  }
                  onChange={ (val) => { setAttributes( { show_phone: val } ) } }
                />
                </PanelRow>

                <PanelRow>
                <ToggleControl
                  label="Show Email"
                  checked = { show_email }
                  help={
                      show_email
                          ? 'Showing Email'
                          : ''
                  }
                  onChange={ (val) => { setAttributes( { show_email: val } ) } }
                />
                </PanelRow>

                <PanelRow>
                <ToggleControl
                  label="Show Map"
                  checked = { show_map }
                  help={
                      show_map
                          ? 'Showing Map'
                          : ''
                  }
                  onChange={ (val) => { setAttributes( { show_map: val } ) } }
                />
                </PanelRow>
                <PanelRow>
                <ToggleControl
                  label="Hide Headings"
                  checked = { hide_headings }
                  help={
                      hide_headings
                          ? 'Headings Hidden'
                          : ''
                  }
                  onChange={ (val) => { setAttributes( { hide_headings: val } ) } }
                />
                </PanelRow>
            </PanelBody>
        </Panel>
        </InspectorControls>

        </div>
	);
}
