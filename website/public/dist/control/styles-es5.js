(function () {
  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"], {
    /***/
    3:
    /*!******************************!*\
      !*** multi ./src/styles.css ***!
      \******************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! /home/elkins/Documents/2021_INFOB318_STI-Feed/code/website/public/src/styles.css */
      "OmL/");
      /***/
    },

    /***/
    "JPst":
    /*!*****************************************************!*\
      !*** ./node_modules/css-loader/dist/runtime/api.js ***!
      \*****************************************************/

    /*! no static exports found */

    /***/
    function JPst(module, exports, __webpack_require__) {
      "use strict";
      /*
        MIT License http://www.opensource.org/licenses/mit-license.php
        Author Tobias Koppers @sokra
      */
      // css base code, injected by the css-loader
      // eslint-disable-next-line func-names

      module.exports = function (useSourceMap) {
        var list = []; // return the list of modules as css string

        list.toString = function toString() {
          return this.map(function (item) {
            var content = cssWithMappingToString(item, useSourceMap);

            if (item[2]) {
              return "@media ".concat(item[2], " {").concat(content, "}");
            }

            return content;
          }).join('');
        }; // import a list of modules into the list
        // eslint-disable-next-line func-names


        list.i = function (modules, mediaQuery, dedupe) {
          if (typeof modules === 'string') {
            // eslint-disable-next-line no-param-reassign
            modules = [[null, modules, '']];
          }

          var alreadyImportedModules = {};

          if (dedupe) {
            for (var i = 0; i < this.length; i++) {
              // eslint-disable-next-line prefer-destructuring
              var id = this[i][0];

              if (id != null) {
                alreadyImportedModules[id] = true;
              }
            }
          }

          for (var _i = 0; _i < modules.length; _i++) {
            var item = [].concat(modules[_i]);

            if (dedupe && alreadyImportedModules[item[0]]) {
              // eslint-disable-next-line no-continue
              continue;
            }

            if (mediaQuery) {
              if (!item[2]) {
                item[2] = mediaQuery;
              } else {
                item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
              }
            }

            list.push(item);
          }
        };

        return list;
      };

      function cssWithMappingToString(item, useSourceMap) {
        var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

        var cssMapping = item[3];

        if (!cssMapping) {
          return content;
        }

        if (useSourceMap && typeof btoa === 'function') {
          var sourceMapping = toComment(cssMapping);
          var sourceURLs = cssMapping.sources.map(function (source) {
            return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
          });
          return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
        }

        return [content].join('\n');
      } // Adapted from convert-source-map (MIT)


      function toComment(sourceMap) {
        // eslint-disable-next-line no-undef
        var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
        var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
        return "/*# ".concat(data, " */");
      }
      /***/

    },

    /***/
    "LboF":
    /*!****************************************************************************!*\
      !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
      \****************************************************************************/

    /*! no static exports found */

    /***/
    function LboF(module, exports, __webpack_require__) {
      "use strict";

      var isOldIE = function isOldIE() {
        var memo;
        return function memorize() {
          if (typeof memo === 'undefined') {
            // Test for IE <= 9 as proposed by Browserhacks
            // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
            // Tests for existence of standard globals is to allow style-loader
            // to operate correctly into non-standard environments
            // @see https://github.com/webpack-contrib/style-loader/issues/177
            memo = Boolean(window && document && document.all && !window.atob);
          }

          return memo;
        };
      }();

      var getTarget = function getTarget() {
        var memo = {};
        return function memorize(target) {
          if (typeof memo[target] === 'undefined') {
            var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

            if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
              try {
                // This will throw an exception if access to iframe is blocked
                // due to cross-origin restrictions
                styleTarget = styleTarget.contentDocument.head;
              } catch (e) {
                // istanbul ignore next
                styleTarget = null;
              }
            }

            memo[target] = styleTarget;
          }

          return memo[target];
        };
      }();

      var stylesInDom = [];

      function getIndexByIdentifier(identifier) {
        var result = -1;

        for (var i = 0; i < stylesInDom.length; i++) {
          if (stylesInDom[i].identifier === identifier) {
            result = i;
            break;
          }
        }

        return result;
      }

      function modulesToDom(list, options) {
        var idCountMap = {};
        var identifiers = [];

        for (var i = 0; i < list.length; i++) {
          var item = list[i];
          var id = options.base ? item[0] + options.base : item[0];
          var count = idCountMap[id] || 0;
          var identifier = "".concat(id, " ").concat(count);
          idCountMap[id] = count + 1;
          var index = getIndexByIdentifier(identifier);
          var obj = {
            css: item[1],
            media: item[2],
            sourceMap: item[3]
          };

          if (index !== -1) {
            stylesInDom[index].references++;
            stylesInDom[index].updater(obj);
          } else {
            stylesInDom.push({
              identifier: identifier,
              updater: addStyle(obj, options),
              references: 1
            });
          }

          identifiers.push(identifier);
        }

        return identifiers;
      }

      function insertStyleElement(options) {
        var style = document.createElement('style');
        var attributes = options.attributes || {};

        if (typeof attributes.nonce === 'undefined') {
          var nonce = true ? __webpack_require__.nc : undefined;

          if (nonce) {
            attributes.nonce = nonce;
          }
        }

        Object.keys(attributes).forEach(function (key) {
          style.setAttribute(key, attributes[key]);
        });

        if (typeof options.insert === 'function') {
          options.insert(style);
        } else {
          var target = getTarget(options.insert || 'head');

          if (!target) {
            throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
          }

          target.appendChild(style);
        }

        return style;
      }

      function removeStyleElement(style) {
        // istanbul ignore if
        if (style.parentNode === null) {
          return false;
        }

        style.parentNode.removeChild(style);
      }
      /* istanbul ignore next  */


      var replaceText = function replaceText() {
        var textStore = [];
        return function replace(index, replacement) {
          textStore[index] = replacement;
          return textStore.filter(Boolean).join('\n');
        };
      }();

      function applyToSingletonTag(style, index, remove, obj) {
        var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

        /* istanbul ignore if  */

        if (style.styleSheet) {
          style.styleSheet.cssText = replaceText(index, css);
        } else {
          var cssNode = document.createTextNode(css);
          var childNodes = style.childNodes;

          if (childNodes[index]) {
            style.removeChild(childNodes[index]);
          }

          if (childNodes.length) {
            style.insertBefore(cssNode, childNodes[index]);
          } else {
            style.appendChild(cssNode);
          }
        }
      }

      function applyToTag(style, options, obj) {
        var css = obj.css;
        var media = obj.media;
        var sourceMap = obj.sourceMap;

        if (media) {
          style.setAttribute('media', media);
        } else {
          style.removeAttribute('media');
        }

        if (sourceMap && btoa) {
          css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
        } // For old IE

        /* istanbul ignore if  */


        if (style.styleSheet) {
          style.styleSheet.cssText = css;
        } else {
          while (style.firstChild) {
            style.removeChild(style.firstChild);
          }

          style.appendChild(document.createTextNode(css));
        }
      }

      var singleton = null;
      var singletonCounter = 0;

      function addStyle(obj, options) {
        var style;
        var update;
        var remove;

        if (options.singleton) {
          var styleIndex = singletonCounter++;
          style = singleton || (singleton = insertStyleElement(options));
          update = applyToSingletonTag.bind(null, style, styleIndex, false);
          remove = applyToSingletonTag.bind(null, style, styleIndex, true);
        } else {
          style = insertStyleElement(options);
          update = applyToTag.bind(null, style, options);

          remove = function remove() {
            removeStyleElement(style);
          };
        }

        update(obj);
        return function updateStyle(newObj) {
          if (newObj) {
            if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
              return;
            }

            update(obj = newObj);
          } else {
            remove();
          }
        };
      }

      module.exports = function (list, options) {
        options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
        // tags it will allow on a page

        if (!options.singleton && typeof options.singleton !== 'boolean') {
          options.singleton = isOldIE();
        }

        list = list || [];
        var lastIdentifiers = modulesToDom(list, options);
        return function update(newList) {
          newList = newList || [];

          if (Object.prototype.toString.call(newList) !== '[object Array]') {
            return;
          }

          for (var i = 0; i < lastIdentifiers.length; i++) {
            var identifier = lastIdentifiers[i];
            var index = getIndexByIdentifier(identifier);
            stylesInDom[index].references--;
          }

          var newLastIdentifiers = modulesToDom(newList, options);

          for (var _i = 0; _i < lastIdentifiers.length; _i++) {
            var _identifier = lastIdentifiers[_i];

            var _index = getIndexByIdentifier(_identifier);

            if (stylesInDom[_index].references === 0) {
              stylesInDom[_index].updater();

              stylesInDom.splice(_index, 1);
            }
          }

          lastIdentifiers = newLastIdentifiers;
        };
      };
      /***/

    },

    /***/
    "OmL/":
    /*!************************!*\
      !*** ./src/styles.css ***!
      \************************/

    /*! no static exports found */

    /***/
    function OmL(module, exports, __webpack_require__) {
      var api = __webpack_require__(
      /*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */
      "LboF");

      var content = __webpack_require__(
      /*! !../node_modules/css-loader/dist/cjs.js??ref--12-1!../node_modules/postcss-loader/src??embedded!./styles.css */
      "W9N5");

      content = content.__esModule ? content["default"] : content;

      if (typeof content === 'string') {
        content = [[module.i, content, '']];
      }

      var options = {};
      options.insert = "head";
      options.singleton = false;
      var update = api(content, options);
      module.exports = content.locals || {};
      /***/
    },

    /***/
    "W9N5":
    /*!*********************************************************************************************************************!*\
      !*** ./node_modules/css-loader/dist/cjs.js??ref--12-1!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
      \*********************************************************************************************************************/

    /*! exports provided: default */

    /***/
    function W9N5(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ../node_modules/css-loader/dist/runtime/api.js */
      "JPst");
      /* harmony import */


      var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__); // Imports


      var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true); // Module


      ___CSS_LOADER_EXPORT___.push([module.i, "/* Global Styles */\n\n* {\n    font-family: 'Roboto', Arial, sans-serif;\n    color: #616161;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\nbody {\n    margin: 0;\n  }\n\n.container {\n    display: flex;\n    flex-direction: row;\n  }\n\nrouter-outlet + *  {\n    padding: 0 16px;\n  }\n\n/* Text */\n\nh1 {\n    font-size: 32px;\n  }\n\nh2 {\n    font-size: 20px;\n  }\n\nh1, h2 {\n    font-weight: lighter;\n  }\n\np {\n    font-size: 14px;\n  }\n\n/* Hyperlink */\n\na {\n    cursor: pointer;\n    color: #1976d2;\n    text-decoration: none;\n  }\n\na:hover {\n    opacity: 0.8;\n  }\n\n/* Input */\n\ninput {\n    font-size: 14px;\n    border-radius: 2px;\n    padding: 8px;\n    margin-bottom: 16px;\n    border: 1px solid #BDBDBD;\n  }\n\nlabel {\n    font-size: 12px;\n    font-weight: bold;\n    margin-bottom: 4px;\n    display: block;\n    text-transform: uppercase;\n  }\n\n/* Button */\n\n.button, button {\n    display: inline-flex;\n    align-items: center;\n    padding: 8px 16px;\n    border-radius: 2px;\n    font-size: 14px;\n    cursor: pointer;\n    border-radius: 5px 5px 5px;\n    color: white;\n    border: none;\n  }\n\n.publishButton{\n    background-color: green;\n  }\n\n.unpublishButton{\n    background-color: red;\n  }\n\n.logginButton{\n    background-color: cadetblue;\n  }\n\n.button:hover, button:hover {\n    opacity: 0.8;\n    font-weight: normal;\n  }\n\n.button:disabled, button:disabled {\n    opacity: 0.5;\n    cursor: auto;\n  }\n\n/* Fancy Button */\n\n.fancy-button {\n    color:white;\n  }\n\n.fancy-button i.material-icons {\n    color: #1976d2;\n    padding-right: 4px;\n  }\n\n/* Top Bar */\n\ntop-bar_component {\n    width: 100%;\n    min-height: 64px;\n    background-color: #1976d2;\n    color: white;\n    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n    padding-left: 24px;\n    padding-right: 24px;\n    top: 0;\n    left: auto;\n    right: 0;\n    position: fixed;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n  }\n\ntop-bar_component h1 {\n    color: white;\n    margin: 0;\n    line-height: 1.6;\n    letter-spacing: 0.0075em;\n    flex-grow: 1;\n    font-weight: 500;\n    font-size: 1.25rem;\n  }\n\n/* Checkout Cart, Shipping Prices */\n\n.cart-item, .shipping-item {\n    width: 100%;\n    min-width: 400px;\n    max-width: 450px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    padding: 16px 32px;\n    margin-bottom: 8px;\n    border-radius: 2px;\n    background-color: #EEEEEE;\n  }\n\nmain.root {\n    display: flex;\n    justify-content: center;\n    width: 100%;\n    margin-top: 64px;\n  }\n\n/*\n  Copyright Google LLC. All Rights Reserved.\n  Use of this source code is governed by an MIT-style license that\n  can be found in the LICENSE file at http://angular.io/license\n  */", "", {
        "version": 3,
        "sources": ["webpack://src/styles.css"],
        "names": [],
        "mappings": "AAAA,kBAAkB;;AAElB;IACI,wCAAwC;IACxC,cAAc;IACd,sBAAsB;IACtB,mCAAmC;IACnC,kCAAkC;EACpC;;AAEA;IACE,SAAS;EACX;;AAEA;IACE,aAAa;IACb,mBAAmB;EACrB;;AAEA;IACE,eAAe;EACjB;;AAEA,SAAS;;AAET;IACE,eAAe;EACjB;;AAEA;IACE,eAAe;EACjB;;AAEA;IACE,oBAAoB;EACtB;;AAEA;IACE,eAAe;EACjB;;AAEA,cAAc;;AAEd;IACE,eAAe;IACf,cAAc;IACd,qBAAqB;EACvB;;AAEA;IACE,YAAY;EACd;;AAEA,UAAU;;AAEV;IACE,eAAe;IACf,kBAAkB;IAClB,YAAY;IACZ,mBAAmB;IACnB,yBAAyB;EAC3B;;AAEA;IACE,eAAe;IACf,iBAAiB;IACjB,kBAAkB;IAClB,cAAc;IACd,yBAAyB;EAC3B;;AAEA,WAAW;;AACX;IACE,oBAAoB;IACpB,mBAAmB;IACnB,iBAAiB;IACjB,kBAAkB;IAClB,eAAe;IACf,eAAe;IACf,0BAA0B;IAC1B,YAAY;IACZ,YAAY;EACd;;AAEA;IACE,uBAAuB;EACzB;;AAEA;IACE,qBAAqB;EACvB;;AAEA;IACE,2BAA2B;EAC7B;;AAEA;IACE,YAAY;IACZ,mBAAmB;EACrB;;AAEA;IACE,YAAY;IACZ,YAAY;EACd;;AAEA,iBAAiB;;AAEjB;IACE,WAAW;EACb;;AAEA;IACE,cAAc;IACd,kBAAkB;EACpB;;AAEA,YAAY;;AAEZ;IACE,WAAW;IACX,gBAAgB;IAChB,yBAAyB;IACzB,YAAY;IACZ,0HAA0H;IAC1H,kBAAkB;IAClB,mBAAmB;IACnB,MAAM;IACN,UAAU;IACV,QAAQ;IACR,eAAe;IACf,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,mBAAmB;EACrB;;AAEA;IACE,YAAY;IACZ,SAAS;IACT,gBAAgB;IAChB,wBAAwB;IACxB,YAAY;IACZ,gBAAgB;IAChB,kBAAkB;EACpB;;AAEA,mCAAmC;;AAEnC;IACE,WAAW;IACX,gBAAgB;IAChB,gBAAgB;IAChB,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,kBAAkB;IAClB,kBAAkB;IAClB,kBAAkB;IAClB,yBAAyB;EAC3B;;AAEA;IACE,aAAa;IACb,uBAAuB;IACvB,WAAW;IACX,gBAAgB;EAClB;;AAEA;;;;GAIC",
        "sourcesContent": ["/* Global Styles */\n\n* {\n    font-family: 'Roboto', Arial, sans-serif;\n    color: #616161;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n  \n  body {\n    margin: 0;\n  }\n  \n  .container {\n    display: flex;\n    flex-direction: row;\n  }\n  \n  router-outlet + *  {\n    padding: 0 16px;\n  }\n  \n  /* Text */\n  \n  h1 {\n    font-size: 32px;\n  }\n  \n  h2 {\n    font-size: 20px;\n  }\n  \n  h1, h2 {\n    font-weight: lighter;\n  }\n  \n  p {\n    font-size: 14px;\n  }\n  \n  /* Hyperlink */\n  \n  a {\n    cursor: pointer;\n    color: #1976d2;\n    text-decoration: none;\n  }\n  \n  a:hover {\n    opacity: 0.8;\n  }\n  \n  /* Input */\n  \n  input {\n    font-size: 14px;\n    border-radius: 2px;\n    padding: 8px;\n    margin-bottom: 16px;\n    border: 1px solid #BDBDBD;\n  }\n  \n  label {\n    font-size: 12px;\n    font-weight: bold;\n    margin-bottom: 4px;\n    display: block;\n    text-transform: uppercase;\n  }\n  \n  /* Button */\n  .button, button {\n    display: inline-flex;\n    align-items: center;\n    padding: 8px 16px;\n    border-radius: 2px;\n    font-size: 14px;\n    cursor: pointer;\n    border-radius: 5px 5px 5px;\n    color: white;\n    border: none;\n  }\n  \n  .publishButton{\n    background-color: green;\n  }\n\n  .unpublishButton{\n    background-color: red;\n  }\n\n  .logginButton{\n    background-color: cadetblue;\n  }\n\n  .button:hover, button:hover {\n    opacity: 0.8;\n    font-weight: normal;\n  }\n  \n  .button:disabled, button:disabled {\n    opacity: 0.5;\n    cursor: auto;\n  }\n  \n  /* Fancy Button */\n  \n  .fancy-button {\n    color:white;\n  }\n  \n  .fancy-button i.material-icons {\n    color: #1976d2;\n    padding-right: 4px;\n  }\n  \n  /* Top Bar */\n  \n  top-bar_component {\n    width: 100%;\n    min-height: 64px;\n    background-color: #1976d2;\n    color: white;\n    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);\n    padding-left: 24px;\n    padding-right: 24px;\n    top: 0;\n    left: auto;\n    right: 0;\n    position: fixed;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n  }\n  \n  top-bar_component h1 {\n    color: white;\n    margin: 0;\n    line-height: 1.6;\n    letter-spacing: 0.0075em;\n    flex-grow: 1;\n    font-weight: 500;\n    font-size: 1.25rem;\n  }\n  \n  /* Checkout Cart, Shipping Prices */\n  \n  .cart-item, .shipping-item {\n    width: 100%;\n    min-width: 400px;\n    max-width: 450px;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    padding: 16px 32px;\n    margin-bottom: 8px;\n    border-radius: 2px;\n    background-color: #EEEEEE;\n  }\n  \n  main.root {\n    display: flex;\n    justify-content: center;\n    width: 100%;\n    margin-top: 64px;\n  }\n  \n  /*\n  Copyright Google LLC. All Rights Reserved.\n  Use of this source code is governed by an MIT-style license that\n  can be found in the LICENSE file at http://angular.io/license\n  */"],
        "sourceRoot": ""
      }]); // Exports

      /* harmony default export */


      __webpack_exports__["default"] = ___CSS_LOADER_EXPORT___;
      /***/
    }
  }, [[3, "runtime"]]]);
})();
//# sourceMappingURL=styles-es5.js.map