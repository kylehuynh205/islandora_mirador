/*jslint browser: true, esversion: 6 */
/*global Mirador, Drupal, once*/
/**
 * @file
 * Displays Mirador viewer.
 */
(function (Drupal, once) {
    'use strict';

    /**
     * Initialize the Mirador Viewer.
     */
    Drupal.behaviors.Mirador = {
        attach: function (context, settings) {
            Drupal.IslandoraMirador = Drupal.IslandoraMirador || {}
            Drupal.IslandoraMirador.instances = Drupal.IslandoraMirador.instances || {}
            Object.entries(settings.mirador.viewers).forEach(entry => {
              const [base, values] = entry;
              once('mirador-viewer', base, context).forEach(() =>
                // save the mirador instance so other modules can interact
                // with the store/actions at e.g. Drupal.IslandoraMirador.instances["#mirador-xyz"].store
                Drupal.IslandoraMirador.instances[base] = Mirador.viewer(values, window.miradorPlugins || {})
              );
            });
        },
        detach: function (context, settings) {
            Object.entries(settings.mirador.viewers).forEach(entry => {
              const [base, ] = entry;
              once.remove('mirador-viewer', base, context);
              delete Drupal.IslandoraMirador.instances[base];
            });
        }
    };

})(Drupal, once);
