/**
 * External dependencies
 */
import { castArray } from 'lodash';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useLayoutEffect, useReducer, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BlockEditorProvider from '../provider';
import AutoHeightBlockPreview from './auto';

/**
 * BlockPreview renders a preview of a block or array of blocks.
 *
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/block-preview/README.md
 *
 * @param {Object} preview options for how the preview should be shown
 * @param {Array|Object} preview.blocks A block instance (object) or an array of blocks to be previewed.
 * @param {number} preview.viewportWidth Width of the preview container in pixels. Controls at what size the blocks will be rendered inside the preview. Default: 700.
 *
 * @return {WPComponent} The component to be rendered.
 */
export function BlockPreview( { blocks, viewportWidth = 700 } ) {
	const settings = useSelect( ( select ) =>
		select( 'core/block-editor' ).getSettings()
	);
	const renderedBlocks = useMemo( () => castArray( blocks ), [ blocks ] );
	const [ recompute, triggerRecompute ] = useReducer(
		( state ) => state + 1,
		0
	);
	useLayoutEffect( triggerRecompute, [ blocks ] );
	if ( ! blocks || blocks.length === 0 ) {
		return null;
	}
	return (
		<BlockEditorProvider value={ renderedBlocks } settings={ settings }>
			<AutoHeightBlockPreview
				key={ recompute }
				viewportWidth={ viewportWidth }
			/>
		</BlockEditorProvider>
	);
}

export default BlockPreview;
