<?php
/**
 * top_basic functions and definitions
 *
 * @package top_basic
 * @author TOP co,ltd.
 */
if (!defined('ABSPATH')) exit;

/**
 * テーマ初期化処理
 * @return {void}
 */
function init_top_basic(): void {
  /**
   * コンテンツ幅（画像ラージファイル横幅上書き）
   */
  $GLOBALS['content_width'] = apply_filters('top_basic_content_width', 960);

  /**
   * テーマ言語ファイルロード
   */
  load_theme_textdomain('top_basic', get_theme_file_uri('/languages'));

  /**
   * タイトルセパレータ変更
   */
  function custom_title_separator(): string {
    return '|';
  }
  add_filter('document_title_separator', 'custom_title_separator');

  /**
   * タイトルタグカスタマイズ有効
   */
  add_theme_support('title-tag');

  /**
   * カスタムロゴ有効
   */
  add_theme_support('custom-logo');

  /**
   * カスタムヘッダー有効
   */
  add_theme_support('custom-header');

  /**
   * RSSフィード出力
   */
  add_theme_support('automatic-feed-links');

  /**
   * エディタHTML5タグ許可
   */
  add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));

  /**
   * アイキャッチ画像を有効・設定
   */
  add_theme_support('post-thumbnails');
  set_post_thumbnail_size($GLOBALS['content_width'], $GLOBALS['content_width'], true);

  /**
   * ウィジェットカスタマイザー有効
   */
  add_theme_support('customize-selective-refresh-widgets');

  /**
   * グローバル・フッターナビゲーションセットアップ
   */
  register_nav_menus(
    array(
      'global_nav' => 'グローバルメニュー',
      'ft_nav' => 'フッターメニュー',
    )
  );
}
add_action('after_setup_theme', 'init_top_basic');

/**
 * embedスタイルをテーマのものに変更
 */
remove_action('embed_head', 'print_embed_styles');
function top_embed_style() {
  wp_enqueue_style('wp-embed-template-org', get_theme_file_uri('/css/design.css'));
}
add_filter('embed_head', 'top_embed_style');

/**
 * embedのサイトアイコン未設定なら非表示
 */
function top_embed_site_title($site_title) {
  $icon = '';

  if (get_site_icon_url(32)) {
    $icon = '<img src="' . esc_url(get_site_icon_url(32)) . '" srcset="' . esc_url(get_site_icon_url(64)) . ' 2x" width="32" height="32" alt="" class="wp-embed-site-icon"/>';
  }
  $site_title = '<div class="wp-embed-site-title"><a href="' . esc_url(home_url()) . '" target="_blank">' . $icon . '<span>' . esc_html(get_bloginfo('name')) . '</span></a></div>';
  return $site_title;
}
add_filter('embed_site_title_html', 'top_embed_site_title');

/**
 * テーマ切替え時セットアップ
 */
function top_basic_switch_theme() {
  update_option('thumbnail_size_w', 300);
  update_option('thumbnail_size_h', 300);
  update_option('medium_size_w', 600);
  update_option('medium_size_h', 600);
  update_option('large_size_w', $GLOBALS['content_width']);
  update_option('large_size_h', $GLOBALS['content_width']);
}
add_action('after_switch_theme', 'top_basic_switch_theme');

/**
 * 外部ファイル読み込み
 */
require get_parent_theme_file_path('/inc/admin_theme.php');	 // 管理画面テーマ設定
require get_parent_theme_file_path('/inc/api_endpoint.php'); // REST API 設定
require get_parent_theme_file_path('/inc/custom_post.php');	 // カスタム投稿設定
require get_parent_theme_file_path('/inc/read_files.php');   // ファイル読み込み設定
