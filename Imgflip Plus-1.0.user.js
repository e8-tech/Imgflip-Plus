// ==UserScript==
// @name         Imgflip Plus
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  A quality of life extension for Imgflip.
// @author       Infernus7
// @match        https://imgflip.com/*
// @icon         https://art.pixilart.com/sr5z983b23f929aws3.png
// @grant        GM_addStyle
// @grant        window.onurlchange
// ==/UserScript==

(function() {
    'use strict';

    // 1. Bevels & Interactive Hover Effects
    GM_addStyle(`
        /* Smooth Corners for Boxes and Buttons */
        .but, .gen-btn, .img-box, .base-img-box, .comment-container, .c-reply {
            border-radius: 12px !important;
            transition: all 0.2s ease-in-out !important; /* Smooth transition */
        }

        /* Hover Effect for Buttons */
        .but:hover, .gen-btn:hover {
            filter: brightness(1.2); /* Brightens the button */
            box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important; /* Adds a soft shadow */
            transform: translateY(-1px); /* Slight "lift" effect */
            cursor: pointer;
        }

        /* Hover Effect for Comment Boxes */
        .comment-container:hover {
            background-color: rgba(0,0,0,0.02) !important;
        }
    `);

    // 2. Function to highlight negative scores (Downvotes)
    function highlightDownvotes() {
        const scores = document.querySelectorAll('.score, .v-score');

        scores.forEach(scoreBox => {
            const currentScore = parseInt(scoreBox.innerText);
            if (!isNaN(currentScore) && currentScore < 0) {
                scoreBox.style.setProperty('color', '#ff4d4d', 'important'); // Bright Red
                scoreBox.style.fontWeight = 'bold';
            }
        });
    }

    // Run on load
    highlightDownvotes();

    // Watch for new comments loading as you scroll
    const observer = new MutationObserver(highlightDownvotes);
    observer.observe(document.body, { childList: true, subtree: true });

})();