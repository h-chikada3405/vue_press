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
  ?>
        <section id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
          <h3>
            <a href="<?php the_permalink(); ?>">
              <?php the_title(); ?>
            </a>
          </h3>
          <?php if (has_post_thumbnail() && get_query_var('paged') <= 1): ?>
            <figure class="post_thumb">
              <a href="<?php the_permalink(); ?>">
                <?php the_post_thumbnail('large'); ?>
              </a>
            </figure>
          <?php endif; ?>
          <div class="wp-post_content">
            <?php the_excerpt(); ?>
          </div>
        </section>
  <?php
      endwhile;
    endif;
  ?>
<?php get_footer(); ?>
