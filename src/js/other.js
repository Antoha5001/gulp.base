"use strict";
(function () {

    window.addEventListener('DOMContentLoaded', init);

    function myLongTitleNameFunction() {

        console.log('myLongTitleNameFunction');
    }

    function init() {

        console.log('other');

    }
    myLongTitleNameFunction();
})();