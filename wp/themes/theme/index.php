<?php
/**
 * index template
 *
 * @package top_basic
 * @author TOP co,ltd.
 */
?>
<?php get_header(); ?>
  <?php
    if (have_posts()):
      while (have_posts()): the_post();
        get_template_part('/template/post', 'archive');
      endwhile;
    endif;
    custom_pagination();
    get_sidebar();
  ?>
<?php get_footer(); ?>
