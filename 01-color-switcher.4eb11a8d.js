!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=null;function o(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}e.disabled=!0,t.addEventListener("click",(function(){document.body.style.backgroundColor=o(),n=setInterval((function(){document.body.style.backgroundColor=o()}),1e3),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",(function(){clearInterval(n),t.disabled=!1,e.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.4eb11a8d.js.map
