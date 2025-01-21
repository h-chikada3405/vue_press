<?php
/**
 * REST API のエンドポイントを作成
 *
 * @package top_basic
 * @author TOP co,ltd.
 */

/**
 * option ページのエンドポイントを作成
 */
function register_option_page_endpoint(): void {
  register_rest_route('wp/v2', '/options', array(
    'methods' => 'GET',
    'callback' => 'get_option_page_data',
    'permission_callback' => '__return_true'
  ));
}
add_action('rest_api_init', 'register_option_page_endpoint');

function get_option_page_data(): array {
  $option_data = array(
    'field1' => 'aa',
    'field2' => 'bb',
  );
  return $option_data;
}
