import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { ToggleControl, SelectControl, Panel, PanelBody, PanelRow } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

import './editor.scss';

/**
 * @return {WPElement} Element to render.
 */
export default function Edit() {
  

	return (
		<p { ...useBlockProps() }>
			{ __( 'Blocks – hello from the editor!', 'blocks' ) }
		</p>
	);
}
