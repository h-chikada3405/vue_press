<?php
/**
 * REST API のエンドポイントを作成
 *
 * @package top_basic
 * @author TOP co,ltd.
 */

/**
 * global-styles のエンドポイントを作成
 * @return void
 */
function register_global_styles_endpoint(): void {
  register_rest_route('wp/v2', '/global-styles', array(
    'methods' => 'GET',
    'callback' => 'get_global_styles',
  ));
}
add_action('rest_api_init', 'register_global_styles_endpoint');

/**
 * global-styles を取得
 * @return array
 */
function get_global_styles(): WP_REST_Response {
  ob_start();
  wp_head();
  $head_content = ob_get_clean();
  echo '<pre>';
  print_r( $head_content );
  echo '</pre>';
  preg_match('/<style id=\'global-styles-inline-css\' type=\'text\/css\'>(.*?)<\/style>/s', $head_content, $matches);

  if (isset($matches[1])) {
    $global_styles = $matches[1];
    return new WP_REST_Response($global_styles, 200);
  } else {
    return new WP_REST_Response('Global styles not found', 404);
  }
}

/**
 * option ページのエンドポイントを作成
 * @return void
 */
function register_option_page_endpoint(): void {
  register_rest_route('wp/v2', '/options', array(
    'methods' => 'GET',
    'callback' => 'get_option_page_data',
    'permission_callback' => '__return_true'
  ));
}
add_action('rest_api_init', 'register_option_page_endpoint');

/**
 * option データを取得
 * @return array
 */
function get_option_page_data(): array {
  $nagoya_info = get_field('nagoya_info', 'options');
  $tokyo_info = get_field('tokyo_info', 'options');

  $option_data = array(
    'companyName' => get_field('company_name', 'options'),
    'officesInfo' => array(),
  );

  if ($nagoya_info) {
    $option_data['officesInfo']['nagoya'] = array();
    foreach ($nagoya_info as $info) {
      $option_data['officesInfo']['nagoya'][] = array(
        'officeName'     => $info['office_name'],
        'officeTel'      => $info['office_tel'],
        'officeZip'      => $info['office_zip'],
        'officeAddress'  => $info['office_address'],
      );
    }
  }

  if ($tokyo_info) {
    $option_data['officesInfo']['tokyo'] = array();
    foreach ($tokyo_info as $info) {
      $option_data['officesInfo']['tokyo'][] = array(
        'officeName'     => $info['office_name'],
        'officeTel'      => $info['office_tel'],
        'officeZip'      => $info['office_zip'],
        'officeAddress'  => $info['office_address'],
      );
    }
  }

  return $option_data;
}
