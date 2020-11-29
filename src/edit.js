/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, Button, Spinner, ResponsiveWrapper } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { Component } from 'react';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */
class ImageSelector extends Component {
	render() {

		const {
			setAttributes,
			attributes,
			lightImage
		} = this.props;

		const { lightImageId } = attributes;
		const ALLOWED_MEDIA_TYPES = [ 'image' ];

		const MyPanel = () => (
			<PanelBody title="My Block Settings" initialOpen={ true }>
				<strong>Light image: </strong>
				<MediaUploadCheck>
					<MediaUpload
						title={ __( 'Light image', 'dark-image-switcher' ) }
						className={ ! lightImageId ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview' }
						onSelect={ onImageSelect }
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						value={ lightImageId }
						render={ ( { open } ) => (
							<Button
								className={ 'editor-post-featured-image__toggle' }
								onClick={ open }>

								{ ! lightImageId && ( __( 'Set light image', 'dark-image-switcher' ) ) }
								{ !! lightImageId && ! lightImage && <Spinner /> }
								{ !! lightImageId && lightImage &&
									<ResponsiveWrapper
										naturalWidth={ lightImage.media_details.width }
										naturalHeight={ lightImage.media_details.height }
									>
										<img src={ lightImage.source_url } alt={ __( 'Background image', 'image-selector-example' ) } />
									</ResponsiveWrapper>
								}
							</Button>
						) }
					/>
				</MediaUploadCheck>
				{ !! lightImageId &&
					<MediaUploadCheck>
						<Button onClick={ onRemoveImage } isLink isDestructive>
							{ __( 'Remove background image', 'image-selector-example' ) }
						</Button>
					</MediaUploadCheck>
				}
				{ !! lightImageId && lightImage &&
					<MediaUploadCheck>
						<MediaUpload
							title={ __( 'Background image', 'image-selector-example' ) }
							onSelect={ onImageSelect }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							value={ lightImage }
							render={ ( { open } ) => (
								<Button onClick={ open } isDefault>
									{ __( 'Replace background image', 'image-selector-example' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
				}
			</PanelBody>

		);

		function onImageSelect( image ) {
			setAttributes({
				lightImageId: image.id
			})
		}

		const onRemoveImage = () => {
			setAttributes( {
				lightImageId: undefined,
			} );
		};

		return (
			<div>
				{
					<InspectorControls>
						<MyPanel />
					</InspectorControls>
				}
				test
			</div>
		);
	}
}

export default compose(
	withSelect( ( select, props ) => {
		const { getMedia } = select( 'core' );
		const { lightImageId } = props.attributes;

		return {
			lightImage: lightImageId ? getMedia( lightImageId ) : null,
		};
	} ),
)( ImageSelector )
