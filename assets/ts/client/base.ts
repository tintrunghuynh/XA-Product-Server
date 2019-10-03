// import 'src/assets/js/typer.min.js';
// import 'src/assets/js/jquery.ripples.min.js';
// import 'jquery';
// import 'lodash';
// declare var _: any;


// jQuery(function () {
//     {
//         if (
//             /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//                 navigator.userAgent
//             )
//         ) {
//             // some code..
//             $('html').addClass('mobile-device');
//             console.log('Mobile-device-browser');
//         }
//         // END   for browser
//     }

//     {
//         // START	Script for header

//         // END	Script for header
//     }
//     console.log('START loading typer & ripples');
//     //  START typer effect
//     $(".txt-typer")["typer"]({
//         strings: [
//             'More than Clothers',
//             'That\'s Art'
//         ],
//         typeSpeed: 100,
//         backspaceSped: 50,
//         backspaceDelay: 2000,
//         repeatDelay: 2500,
//         repeat: true,
//         autoStart: true,
//         startDeplay: 100,
//         useCursor: true,
//     });
//     //  END typer effect

//     //  START   water effect
//     // $("body")["ripples"]({
//     //     resolution: 256,
//     //     dropRadius: 30,
//     //     perturbance: 0.04
//     // });
//     //  END     water effect
//     console.log('FINISHED loading typer & ripples');

//     // START	Script for nav
//     {
//         function generate_mask(idPanelSelector, idMaskBgSelector) {
//             $(idPanelSelector).css('z-index', '2');
//             $(idMaskBgSelector).addClass('mask');
//             $(idPanelSelector).addClass('panel-nav-menu-active');
//             $(idPanelSelector).attr('state', 'active');

//         }

//         function remove_mask(idPanelSelector, idMaskBgSelector) {
//             $(idPanelSelector).css('z-index', '0');
//             $(idMaskBgSelector).removeClass('mask');
//             $(idPanelSelector).removeClass('panel-nav-menu-active');
//             $(idPanelSelector).attr('state', 'default');
//         }

//         function panel_nav_menu_changeToState(state) {
//             if (String(state).toLocaleLowerCase() == 'default') {
//                 // document.getElementById('hidden-url').click();
//                 remove_mask('#panel-nav-menu', '#mask-bg');
//             } else if (String(state).toLocaleLowerCase() == 'active') {
//                 generate_mask('#panel-nav-menu', '#mask-bg');
//             }
//         }

//         // START check click
//         $(document).click(function (e) {

//             // START     check click on nav-panel
//             if (e.target["id"] === 'btn-close-panel-nav-menu') {
//                 console.log('1');
//                 // click on close button
//                 panel_nav_menu_changeToState('default');
//                 // tslint:disable-next-line: max-line-length
//             } else if (document.getElementById('panel-nav-menu') !== null && document.getElementById('panel-nav-menu').contains(e.target) === false && $('#panel-nav-menu').attr('state') === 'active') {
//                 // Not click on #panel-nav-menu while #panel-nav-menu is opening
//                 // Closing the panel and change state of #btn-nav-menu into default
//                 console.log('2');
//                 panel_nav_menu_changeToState('default');
//             } else if (document.getElementById('btn-nav-menu') != null && document.getElementById('btn-nav-menu').contains(e.target)) {
//                 console.log('3');
//                 if ($('#panel-nav-menu').attr('state') == 'default') {
//                     // if state is default, change state, it meaning #nav-menu active and mask is streck
//                     panel_nav_menu_changeToState('active')
//                 } else if ($('#panel-nav-menu').attr('state') == 'active') {
//                     panel_nav_menu_changeToState('default');
//                 }
//                 console.log('4');
//             } else if (e.target["classList"].contains('sub-menu')) {
//                 // Click on tag a[class=sub-menu]
//                 panel_nav_menu_changeToState('default');
//             }
//             // END   check click on nav-panel
//         });
//         // END check click

//         // START	Sticky btn-nav-menu
//         $(document).scroll(function () {
//             var navMenu = document.getElementById('navSticky');
//             if (navMenu.getBoundingClientRect()["y"] == 0 && navMenu.classList.contains('sticking') == false) {
//                 navMenu.classList.add('sticking');
//             } else if (navMenu.getBoundingClientRect()["y"] != 0 && navMenu.classList.contains('sticking') == true) {
//                 navMenu.classList.remove('sticking');
//             }
//         });
//         // END	Sticky btn-nav-menu

//         /*
//             .txt-search will expand if mouse hover, focus OR has value
//             .txt-search will close if mouse not hover, focusout OR null empty
//         */
//         // Search-box
//         // search-box hover
//         $('#search-box').hover(function () {
//             $('.txt-search').focus();
//             $('#search-box').attr('state', 'active');
//             if ($('.txt-search').val() !== '' && $('.txt-search').val() !== undefined) {
//                 // .txt-search not null
//             } else {
//                 // .txt-search is null
//             }
//         },
//             // search-box not hover
//             function () {
//                 if ($('.txt-search').val() !== '' && $('.txt-search').val() !== undefined) {
//                     // .txt-search not null
//                     // .txt-search still expanded
//                     {
//                         $('#search-box').attr('state', 'active');
//                         $('.search-box .btn-delete').css({ cursor: 'pointer' });
//                     }
//                 }
//                 else {
//                     if ($('.txt-search').is('focus') === false) {
//                         $('#search-box').attr('state', 'default');
//                         $('.search-box .btn-delete').css({ cursor: 'pointer' });

//                     }
//                 }
//             })

//         // txt-search change, focusout side search-box
//         $('.search-box .txt-search').on('change paste input focusout', function () {
//             if ($('.txt-search').val() !== '' && $('.txt-search').val() !== undefined) {
//                 /*  .txt-search not null then
//                     display btn-delete  */
//                 $('.search-box .fa-times').css('visibility', 'visible');
//                 $('.search-box .btn-delete').css({ cursor: 'pointer' });
//             } else {
//                 /*  .txt-search null then
//                     remove btn-delete  */
//                 $('.search-box .btn-delete').css({ cursor: 'default' });
//                 $('.search-box .fa-times').css('visibility', 'hidden');
//                 if (!$('.txt-search').is(':focus') && !$('#search-box').is(':hover')) {
//                     $('#search-box').attr('state', 'default');
//                 }
//             }

//         });

//         $('.search-box .btn-delete').on('click', function () {
//             $('.search-box .fa-times').css({ visibility: 'hidden' });
//             $('.search-box .btn-delete').css({ cursor: 'default' });
//             $('.search-box .txt-search').val('').focus();
//         })
//         // End Search-box
//     }
//     // END	Script for nav
// });
