<?php
/*
Plugin Name: Dark image switcher
*/
function register_block() {

    // automatically load dependencies and version
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

    wp_register_script(
        'dark-image-switcher-esnext',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    register_block_type( 'dark-image-switcher/dark-image-switcher-esnext', array(
        'editor_script' => 'dark-image-switcher-esnext',
    ) );

}
add_action( 'init', 'register_block' );
